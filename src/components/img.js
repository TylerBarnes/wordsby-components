import React, { Component } from "react";
import Img from "gatsby-image";

class Wimg extends Component {
  constructor(props) {
    super(props);

    this.img = React.createRef();
    this.imageLoaded = this.imageLoaded.bind(this);

    this.state = {
      imgAspect: false
    };
  }

  imageLoaded() {
    const width = this.img.naturalWidth;
    const height = this.img.naturalHeight;

    this.setState({ imgAspect: `${(height / width) * 100}%` });
  }
  render() {
    const { field, ...props } = this.props;

    if (!field) {
      return null;
    }

    const { localFile: file } = field;

    const useStringUrl = typeof field === "string";
    const useNestedStringUrl = !!field.url && typeof field.url === "string";

    if (useStringUrl || useNestedStringUrl) {
      const stringUrl = useStringUrl ? field : field.url;
      return (
        <div
          className="gatsby-image-wrapper"
          style={{ position: "relative", overflow: "hidden" }}
        >
          <div
            style={{
              width: "100%",
              paddingBottom: this.state.imgAspect
            }}
          />
          <img
            ref={n => (this.img = n)}
            onLoad={this.imageLoaded}
            style={{
              position: "absolute",
              top: "0px",
              left: "0px",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center center",
              opacity: 1,
              transition: "opacity 0.5s ease 0s"
            }}
            src={stringUrl}
            {...props}
          />
        </div>
      );
    } else if (!!file && file.childImageSharp) {
      if (file.childImageSharp.fluid) {
        return <Img fluid={file.childImageSharp.fluid} {...props} />;
      } else if (file.childImageSharp.fixed) {
        return <Img fixed={file.childImageSharp.fixed} {...props} />;
      }
    } else {
      console.warn(
        `Wordsby Image requires a src url or a field containing a valid childImageSharp query`
      );
      return null;
    }
  }
}

export default Wimg;
