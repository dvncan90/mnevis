(function() {

  // Create the object for the entrance plugin
  entrance = {};

  // Set up defaults
  entrance.duration = "2500";
  entrance.distance = "2500";
  entrance.heightOffset = 0;

  entrance.isElemInView = function(elem) {
    var rect = elem.getBoundingClientRect();

    // Return true if any of the following conditions are met:
    return (
      // The top is in view: the top is more than 0 and less than the window height (the top of the element is in view)
      ((rect.top + entrance.heightOffset) >= 0 && (rect.top + entrance.heightOffset) <= window.innerHeight) ||
      // The bottom is in view: bottom position is greater than 0 and greater than the window height
      ((rect.bottom + entrance.heightOffset) >= 0 && (rect.bottom + entrance.heightOffset) <= window.innerHeight) ||
      // The top is above the viewport and the bottom is below the viewport
      ((rect.top + entrance.heightOffset) < 0 && (rect.bottom + entrance.heightOffset) > window.innerHeight)
    );
  }

  entrance.setInitialStyles = function(elem) {
    // Required style on the body to stop horizontal scrollbars
    document.body.style.overflowX = "hidden";

    var anim = elem.getAttribute("data-entrance");
    var delay = elem.getAttribute("data-entrance-delay");

    elem.style.transition = "all " + (entrance.duration / 1000) + "s ease";

    // Add a delay if required
    if (delay) {
      elem.style.transitionDelay = (delay / 1000) + 's';
    }

    // Set up transition types
    if (anim == "fade") {
      elem.style.opacity = "0";
    }

    if (anim == "from-left") {
      elem.style.opacity = "0";
      elem.style.transform = "translate(-" + entrance.distance + "px, 0)";
    }

    if (anim == "from-right") {
      elem.style.opacity = "0";
      elem.style.transform = "translate(" + entrance.distance + "px, 0)";
    }

    if (anim == "from-top") {
      elem.style.opacity = "0";
      elem.style.transform = "translate(0, -" + entrance.distance + "px)";
    }

    if (anim == "from-bottom") {
      elem.style.opacity = "0";
      elem.style.transform = "translate(0, " + entrance.distance + "px)";
    }
  }

  entrance.enter = function(elem) {
    elem.style.visibility = "visible";
    elem.style.opacity = "1";
    elem.style.transform = "translate(0, 0)";
  }

  entrance.viewportChange = function() {
    Array.prototype.map.call(entrance.elements, function(item) {

      if (entrance.isElemInView(item)) {
        entrance.enter(item);
      }

    });
  }

  entrance.init = function() {
    // Store the elements to be animated
    entrance.elements = document.querySelectorAll('[data-entrance]');

    // Set up the initial styles on each element
    Array.prototype.map.call(entrance.elements, function(item) {
      entrance.setInitialStyles(item);
    });
  }

  // Initialize the plugin when the DOM is loaded
  addEventListener('DOMContentLoaded', entrance.init, false);

  // Add event listeners for scroll and resize events
  addEventListener('scroll', entrance.viewportChange, false);
  addEventListener('resize', entrance.viewportChange, false);

})();
