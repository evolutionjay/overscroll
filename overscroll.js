// JavaScript Document

(function(){
  // Declare variables
  let touch_x, touch_y, obj_x, obj_y, speed_x=0, speed_y=0, scrollanim;


  let lastTime = 0;
  let vendors = ['ms', 'moz', 'webkit', 'o'];
  for(let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                 || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback, element) {
      let currTime = new Date().getTime();
      let timeToCall = Math.max(0, 16 - (currTime - lastTime));
      let id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
        timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
	}

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
	}		

        
  document.addEventListener('touchstart', function(e) {
    cancelAnimationFrame(scrollanim);
    // Get Touch target
    obj_x = e.target
    obj_y = e.target
    // Get the target parent that is scrollable
    while ((window.getComputedStyle(obj_x)['overflow-x'] != "auto" && window.getComputedStyle(obj_x)['overflow-x'] != "scroll") || obj_x.parentNode == null) {
      obj_x = obj_x.parentNode
    }
    while ((window.getComputedStyle(obj_y)['overflow-y'] != "auto" && window.getComputedStyle(obj_y)['overflow-y'] != "auto") || obj_y.parentNode == null) {
      obj_y = obj_y.parentNode
    }
    // Get if no scrollable parents are present set null
    if (obj_x.parentNode == null) obj_x = null;
    if (obj_y.parentNode == null) obj_y = null;
    
    // Get the touch starting point
    let touch = e.touches[0];
    touch_x = touch.pageX;
    touch_y = touch.pageY;
  }, false);
  
  document.addEventListener('touchmove', function(e) {
    // Clear animation
    cancelAnimationFrame(scrollanim);
    
    // Prevent window scrolling
    e.preventDefault();
    
    // Scroll according to movement
    let touch = e.touches[0];
    obj_x.scrollLeft = obj_x.scrollLeft - (touch.pageX - touch_x)
    obj_y.scrollTop = obj_y.scrollTop - (touch.pageY - touch_y)
    
    // Set speed speed
    speed_x = (touch.pageX - touch_x)
    speed_y = (touch.pageY - touch_y)
    
    // Set new positon
    touch_x = touch.pageX;
    touch_y = touch.pageY;
  }, false);
  
  // Add a final animation as in iOS
  document.addEventListener('touchend', function(e) {
    // Clear previous animations
    cancelAnimationFrame(scrollanim);
    
    // Animate
    
    scrollanim = function() {
      obj_x.scrollLeft = obj_x.scrollLeft - speed_x
      obj_y.scrollTop = obj_y.scrollTop - speed_y
      // Decelerate
      speed_x = speed_x * 0.9;
      speed_y = speed_y * 0.9;

      // Stop animation at the end
      if (speed_x < 1 && speed_x > -1 && speed_y < 1 && speed_y > -1) {
        cancelAnimationFrame(scrollanim)
      } 
    }
    requestAnimationFrame(scrollanim)
  }, false);
})();
