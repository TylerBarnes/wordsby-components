// https://www.npmjs.com/package/post-robot/v/2.0.33
// https://github.com/krakenjs/post-robot
// https://medium.com/@ebakhtarov/handling-of-iframes-in-react-f038be46ac24
// PsychicWindow is for displaying the contents of a controlled iframe in a static site dynamically. For easy form display, WP password protected areas, etc without spending a bunch of time connecting it all via the rest api.

// The iframe uses post-robot to send a message to this component to tell it that it has loaded.
// This component will send CSS to the iframe that will be displayed
// The iframe will apply the CSS and send back it's height for the component to display the iframe in the proper dimensions
// Display some default loading markup as children passed to the component.

// For the future:
// Some kind of animation control, fading in, etc
// That could be some bars for form placeholders or a spinner or whatever.
// Allow for a function to run in response to a finish reponse. The finish response can contain additional info like a success message or a redirect or just the command to redirect to a link from a redirect prop.
// This component will take an url, a success function, a failure function, a loaded function, css, children, a redirectonfinish prop, a next PsychicWindow ref to start a hidden PsychicWindow in place of this one, and the option to run in a fullscreen modal after the iframe has loaded.

import React, { Component } from "react";
import Url from "url-parse";

let robot = false;
let postRobot;
if (typeof window !== `undefined`) {
  postRobot = require("post-robot");
} else {
  postRobot = false;
}

export default class PsychicWindow extends Component {
  constructor(props) {
    super(props);

    this.listener = false;
    this.iframe = React.createRef();
    this.loading = React.createRef();
    this.wait = this.props.wait ? this.props.wait : 0;
    this.scrollUpOffset = this.props.scrollUpOffset
      ? this.props.scrollUpOffset
      : 0;

    this.state = {
      navigated: false
    };

    if (!!postRobot && robot.cancel) {
      robot.cancel();
    }

    this.url = new Url(this.props.url);

    this.updateIframe = () => {
      if (!postRobot || typeof window === "undefined") return;

      if (!!this.state.navigated && this.props.scrollUp) {
        const scrollTopDistance =
          this.iframe.getBoundingClientRect().top +
          document.documentElement.scrollTop +
          this.scrollUpOffset;

        window.scrollTo(0, scrollTopDistance);
      }

      postRobot
        .send(
          this.iframe,
          "iframeDomElementLoaded",
          {
            css: this.props.windowCSS
          },
          { domain: this.url.origin }
        )
        .then(({ data: { url } }) => {
          const args = { url, iframe: this.iframe };

          if (this.props.onNavigate && this.state.navigated) {
            this.props.onNavigate(args);
          } else if (this.props.onLoad && !this.state.navigated) {
            this.props.onLoad(args);
          }

          this.setState({ navigated: true });
        });
    };
  }

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    this.iframe.onload = () => this.updateIframe();

    if (!this.listener && !!postRobot) {
      this.listener = postRobot.on(
        `iframeHeightChanged${this.url.pathname}`,
        ({ data: { height } }) => {
          setTimeout(() => {
            this.loading.style.opacity = 0;
            setTimeout(() => {
              this.iframe.style.display = "unset";
              this.loading.style.display = "none";
              this.iframe.style.height = `${height}px`;
              this.iframe.style.opacity = 1;
            }, 300);
          }, this.wait);
        }
      );
    }
  }

  componentWillUnmount() {
    if (!!this.listener && !!postRobot) {
      this.listener.cancel();
    }
  }

  render() {
    if (typeof window === `undefined`) return this.props.children;

    return (
      <>
        <iframe
          scrolling="no"
          ref={r => (this.iframe = r)}
          src={this.props.url}
          title={this.props.url}
          style={{
            border: "none",
            width: "100%",
            height: 0,
            overflowY: "hidden",
            opacity: 0,
            transition: "opacity .25s ease-in"
          }}
        />
        <div
          className="loading"
          ref={r => (this.loading = r)}
          style={{
            transition: "opacity .1s ease",
            opacity: 1
          }}
        >
          {this.props.children}
        </div>
      </>
    );
  }
}
