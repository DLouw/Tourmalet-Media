//(function($) {
//  "use strict"; // Start of use strict
//
//  // Closes the sidebar menu
//  $(".menu-toggle").click(function(e) {
//    e.preventDefault();
//    $("#sidebar-wrapper").toggleClass("active");
//    $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
//    $(this).toggleClass("active");
//  });
//
//  // Smooth scrolling using jQuery easing
//  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
//    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
//      var target = $(this.hash);
//      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
//      if (target.length) {
//        $('html, body').animate({
//          scrollTop: target.offset().top
//        }, 1000, "easeInOutExpo");
//        return false;
//      }
//    }
//  });
//
//  // Closes responsive menu when a scroll trigger link is clicked
//  $('#sidebar-wrapper .js-scroll-trigger').click(function() {
//    $("#sidebar-wrapper").removeClass("active");
//    $(".menu-toggle").removeClass("active");
//    $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
//  });
//
//  // Scroll to top button appear
//  $(document).scroll(function() {
//    var scrollDistance = $(this).scrollTop();
//    if (scrollDistance > 100) {
//      $('.scroll-to-top').fadeIn();
//    } else {
//      $('.scroll-to-top').fadeOut();
//    }
//  });

//})(jQuery); // End of use strict

$(document).ready(function() {
    
    var expandActive = false;
    $(".carousel").carousel('pause');

    
    //Click to open a preview
    $(".btn-expand").click(function(){ 
        
        var button = $(this);
        var cover = button.closest(".cover");
        var section = button.closest("section");
        
        // init scrollmagic controller
        var controller = new ScrollMagic.Controller();
        
        section.goTo(function(){
                TweenMax.to(cover, 0.4, {opacity: 0, onComplete:function(){
                cover.hide();
                section.addClass("expanded");
                expandActive = true;
            }});
        });
       
    });
    
    
    //Window scroll functions
    $(window).scroll(function(){
        
        //Close an open preview
        if (expandActive){
                var that = $("section.expanded");
                that.find(".cover").show();
                that.removeClass("expanded");
                that.find(".carousel").carousel(0);
                that.find(".carousel").one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
                    TweenMax.to(that.find(".cover"), 0.2, {opacity: 1, onComplete:function(){
                        expandActive = false;
                    }});
                });
        };
        
    });
    


    //Design icons click
    $(".design-icon").click(function(){ 
       $("#design").goTo(function(){
           $("#design .double-page-parent").addClass("show-right-half");                
        });
       
    });
    
    // Scrollmagic scenes
//    var webtween = TweenMax.staggerTo(".flip-container .flipper", 2, {rotationY:"180_cw", delay:0.5, ease:Elastic.easeOut, force3D:true}, 0.15);
//    
//    var webscene = new ScrollMagic.Scene({triggerElement: "#web"})
//                    .setTween(webtween) // trigger a TweenMax.to tween
//                    .addTo(controller);
    
});




//Additional functions

//Scroll to a certain element
$.fn.goTo = function (animCB) {
    return this.each(function () {
        $('html, body').animate({
            scrollTop: $(this).offset().top
        }, 500).promise().then(animCB);
    });
}    


//flip a flip container
function flip(){
    $(".flip-container").toggleClass("flip");
}

