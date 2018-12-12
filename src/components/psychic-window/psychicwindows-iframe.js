postRobot.on("iframeDomElementLoaded", function(event) {
  var css = event.data.css;

  var head = document.head || document.getElementsByTagName("head")[0],
    style = document.createElement("style");

  style.type = "text/css";
  style.appendChild(document.createTextNode(css));
  head.appendChild(style);
  return {
    height: document.body.scrollHeight
  };
});

postRobot.send(window.parent, "pageViewed");
