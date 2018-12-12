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
import postRobot from "post-robot";
import Url from "url-parse";

let robot = false;

export default class PsychicWindow extends Component {
  constructor(props) {
    super(props);

    this.iframe = React.createRef();
    this.loading = React.createRef();

    if (robot.cancel) {
      robot.cancel();
    }

    this.url = new Url(this.props.url);

    this.updateIframe = () => {
      postRobot
        .send(
          this.iframe,
          "iframeDomElementLoaded",
          {
            css: this.props.windowCSS
          },
          { domain: this.url.origin }
        )
        .then(event => {
          this.loading.style.display = "none";
          this.iframe.style.height = `${event.data.height}px`;
        });
    };
  }

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    this.iframe.onload = () => this.updateIframe();
  }

  render() {
    return (
      <section>
        <iframe
          ref={r => (this.iframe = r)}
          src={this.props.url}
          title={this.props.url}
          style={{
            border: "none",
            width: "100%",
            height: 0,
            overflowY: "hidden"
          }}
        />
        <div className="loading" ref={r => (this.loading = r)}>
          {this.props.children}
        </div>
      </section>
    );
  }
}
