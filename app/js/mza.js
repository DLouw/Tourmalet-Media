(function($) {
  "use strict"; // Start of use strict

  // Closes the sidebar menu
  $(".menu-toggle").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
    $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
    $(this).toggleClass("active");
  });

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 2000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('#sidebar-wrapper .js-scroll-trigger').click(function() {
    $("#sidebar-wrapper").removeClass("active");
    $(".menu-toggle").removeClass("active");
    $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
  });

  // Scroll to top button appear
  $(document).scroll(function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

})(jQuery); // End of use strict

var controller = new ScrollMagic.Controller();

$(document).ready(function() {
    
    var expandActive = false;
    $(".carousel").carousel('pause');

    
    //Click to open a preview
    $(".btn-expand").click(function(){ 
        
        var button = $(this);
        var cover = button.closest(".cover");
        var section = button.closest("section");
        
        // init scrollmagic controller
        
        
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
//    $(".design-icon").click(function(){ 
//       $("#design").goTo(function(){
//           $("#design .double-page-parent").addClass("show-right-half");                
//        });
//       
//    });
    
    // Scrollmagic scenes
//    var webtween = TweenMax.staggerTo(".flip-container .flipper", 2, {rotationY:"180_cw", delay:0.5, ease:Elastic.easeOut, force3D:true}, 0.15);
//    
//    var webscene = new ScrollMagic.Scene({triggerElement: "#web"})
//                    .setTween(webtween) // trigger a TweenMax.to tween
//                    .addTo(controller);
    
    var landtween = TweenMax.to("#landing .logo", 1, {y:"-100%", ease:Power1.easeIn});
    
    var landscene = new ScrollMagic.Scene({triggerElement: "#landing", triggerHook: "onLeave", duration:"10%"})
                    .setTween(landtween) // trigger a TweenMax.to tween
                    .addTo(controller);
    
    var designtween1 = TweenMax.from(".row1", 1, {y:100, opacity: 0, ease:Power2.easeOut});
    
    var designscene1 = new ScrollMagic.Scene({triggerElement: "#design"})
                    .setTween(designtween1) // trigger a TweenMax.to tween
                    .addIndicators()
                    .addTo(controller);
    
    var designtween2 = TweenMax.from(".row2", 1, {y:100, opacity: 0, ease:Power2.easeOut});
    
    var designscene2 = new ScrollMagic.Scene({triggerElement: "#design", offset: 100})
                    .setTween(designtween2) // trigger a TweenMax.to tween
                    .addIndicators()
                    .addTo(controller);
    
    var showcasetween = TweenMax.from("#btnViewProject", 1, {opacity: 0, ease:Power2.easeOut});
    
    var showcasescene = new ScrollMagic.Scene({triggerElement: "#showcase", offset: 300})
                    .setTween(showcasetween) // trigger a TweenMax.to tween
                    .addIndicators()
                    .addTo(controller);
    
    var contacttween = TweenMax.from("#contact-link", 1, {opacity: 0, ease:Power2.easeOut});
    
    var contactscene = new ScrollMagic.Scene({triggerElement: "#contact"})
                    .setTween(contacttween) // trigger a TweenMax.to tween
                    .addIndicators()
                    .addTo(controller)
    
    var showcase2tween = TweenMax.from("#showcase", 2, {opacity: 0.5, ease:Power2.easeOut});
    
    var showcase2scene = new ScrollMagic.Scene({triggerElement: "#showcase", offset: 100})
                    .setTween(showcase2tween) // trigger a TweenMax.to tween
                    .addIndicators()
                    .addTo(controller)
    
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

function translatePage(lang) {
    //(localStorage.getItem('language') == null) ? setLanguage('en') : false;
    $.ajax({ 
    url:  '/language/' +  lang + '.json', 
    dataType: 'json',
    dataType: 'json', 
    success: function(langlookup){ 
            $("[data-lang]").each(function(){
                item = $(this);
                item.text(langlookup[item.attr("data-lang")]); 
            });
        } 
    });
}