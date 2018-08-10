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

var introOpen = false;
var expandActive = false;
var designOpen = false;

$(document).ready(function() {
    
    console.log("document ready");
    //Images loaded plugin
    $('#landing').imagesLoaded( { background: true }, function() {
        console.log("done loading");
        //$("#loading").addClass("hide");
        TweenMax.to("#landing", 2, {opacity: 1, ease:Power2.easeOut});
        //When done loading, wait for the loading bar to finish animation
//        $("#loading").on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', 
//                   function() {
//            console.log("transition ended punk");
//            $("#loading").hide();
//            TweenMax.to("#logo", 0.5, {opacity:1, ease:Power2.easeIn});
//        });

    });
    
    $(".carousel").carousel('pause');

    
    //Click to open a preview
    $("#btn-expand").click(function(){ 
        
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

    

    
    tlIntroOpen = new TimelineMax({paused:true});
    
    tlIntroOpen.to(".tw2", 1, { width:"0px", opacity:0})
            .staggerTo(".intro-1", 0.4, {opacity: 0, x:100}, 0.05)
            .to("#div1", 0, { display:"none"})
            .to("#div2", 0, {display:"block"}, "+=0.2")
            .staggerFrom(".intro-2", 0.4, {opacity: 0, y:10}, 0.1)
            .from(".intro-3", 0.6, {opacity:0.3, onComplete: function(){
                                             introOpen = true;   
                                             console.log("introOpen TRUE");
                                            }});
    
      $("#btn-intro").click(function(){
            
    tlIntroOpen.play();
        
    });
    
//    tlIntroContinue = new TimelineMax({paused: true});
//    
//    tlIntroContinue.to(".tw2",1,{width: 0})
    
//      $("#btn-continue").click(function(){
//            
//        
//        tlIntroOpen.eventCallback("onReverseComplete", function(){
//            $("#design").goTo();
//        });
//        
//        tlIntroOpen.reverse();
//        
//    
//        
//    });
    
    
    
    
    tl2 = new TimelineMax();
    
    tl2.to("#design #container1", 0.5, {scaleX:2, scaleY:2, opacity: 0, display: "none", ease:Power2.easeOut}, 0.05)
              .to("#container2", 0.1, {display:"flex"})
              //.from("#container2", 0.5, {scaleX:2, scaleY:2, opacity: 0, ease:Power2.easeOut, onComplete: function(){
                .staggerFrom("#container2 .elems", 0.4, {x:"100px", opacity: 0, ease:Power2.easeOut, onComplete: function(){
                  designOpen = true;
              }}, 0.1);
    
 
    //Design icons click
    $(".design-icon").click(function(){ 
        
            var desc = $(this).data("desc");
            var src = $(this).attr("src");
        
            $("#brand-image").attr("src", src);
            $("#brand-paragraph").text(desc);
       
            tl2.play();
        
    });
    
//     var tweenDesignLeave = TweenMax.staggerTo(".row1", 1, {y:"-100", opacity: 0, ease:Power2.easeOut}, 0.1);
//    
//     var sceneDesignLeave = new ScrollMagic.Scene({triggerElement: "#design", triggerHook:"onLeave",offset: "-300"})
//                    .setTween(tweenDesignLeave) // trigger a TweenMax.to tween
//                    .addTo(controller);
    
    
    // Scrollmagic scenes
//    var webtween = TweenMax.staggerTo(".flip-container .flipper", 2, {rotationY:"180_cw", delay:0.5, ease:Elastic.easeOut, force3D:true}, 0.15);
//    
//    var webscene = new ScrollMagic.Scene({triggerElement: "#web"})
//                    .setTween(webtween) // trigger a TweenMax.to tween
//                    .addTo(controller);
    
//    var landtween = TweenMax.to("#landing .logo", 1, {y:"-200%", opacity:0, ease:Power3.easeIn});
//    
//    var landscene = new ScrollMagic.Scene({triggerElement: "#landing", triggerHook: "onLeave", offset: 100})
//                    .setTween(landtween) // trigger a TweenMax.to tween
//                    .addTo(controller);
    
    //var introtween1 = TweenMax.staggerFrom(".intro-1", 1, {opacity: 0, y: 200, ease:Power2.easeOut}, 0.1);
    
    var tlIntro = new TimelineMax({delay: 0.5});
    
    tlIntro.staggerFrom(".intro-1", 1, {opacity: 0, y: 200, ease:Power2.easeOut}, 0.2)
            .from(".tw2", 1, { width:"0px", opacity:0})
            .to(".tw2", 3, { borderColor:"black"});
    
    var introscene1 = new ScrollMagic.Scene({triggerElement: "#intro", offset: 100})
                    .setTween(tlIntro) // trigger a TweenMax.to tween
                    .addTo(controller);
    
    var designtween1 = TweenMax.staggerFrom(".row1", 1, {y:100, opacity: 0, ease:Power2.easeOut}, 0.1);
    
    var designscene1 = new ScrollMagic.Scene({triggerElement: "#design"})
                    .setTween(designtween1) // trigger a TweenMax.to tween
                    .addTo(controller);
    
//    var designtween2 = TweenMax.from(".row2", 1, {y:100, opacity: 0, ease:Power2.easeOut});
//    
//    var designscene2 = new ScrollMagic.Scene({triggerElement: "#design", offset: 100})
//                    .setTween(designtween2) // trigger a TweenMax.to tween
//                    .addTo(controller);
    
    var showcasetween = TweenMax.from("#btn-expand", 1, {opacity: 0, ease:Power2.easeOut});
    
    var showcasescene = new ScrollMagic.Scene({triggerElement: "#showcase", offset: 300})
                    .setTween(showcasetween) // trigger a TweenMax.to tween
                    .addTo(controller);
    
    var contacttween = TweenMax.from("#contact-link", 1, {opacity: 0, ease:Power2.easeOut});
    
    var contactscene = new ScrollMagic.Scene({triggerElement: "#contact"})
                    .setTween(contacttween) // trigger a TweenMax.to tween
                    .addTo(controller)
    
    var showcase2tween = TweenMax.from("#showcase", 2, {opacity: 0.5, ease:Power2.easeOut});
    
    var showcase2scene = new ScrollMagic.Scene({triggerElement: "#showcase", offset: 100})
                    .setTween(showcase2tween) // trigger a TweenMax.to tween
                    .addTo(controller)
    
    $(".btn-lang").click(function(){
        translatePage($(this).data("sel"));
//       $("#splash").animate({opacity: 0}, 500, function(){
//           $(this).hide();
//           $("body").removeClass("no-scroll");
//       }); 
        
    var tlLang = new TimelineMax();
        
    tlLang.to(".load-line", 1, {width:"0px"})
        .to(".lang-select",0.1, {opacity: 0})
        .to(".load-line", 0.5, {width:"0px"},"+= -0.1")
        .to("#splash", 0.5, {opacity:0, onComplete: function(){
            $("#splash").hide;
            $("body").removeClass("no-scroll");
        }});
        
    });
    
});

$("#btnCloseDesign").click(function(){
    tl2.reverse();
    designOpen = false;
});

    //Window scroll functions
    $(window).scroll(function(){
        
        if (introOpen){
            tlIntroOpen.reverse();
            //$("#design").goTo();
            introOpen = false;
        };
        
        if (designOpen){
            console.log("design was open while scrolling");
            tl2.reverse();
            designOpen = false;
        };
        
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

function splash(param) {
    var time = param;
    

    
    setTimeout(function(){
        
        console.log("splashing");
        
    var tlSplash = new TimelineMax({paused:true});
    
    tlSplash.to(".load-line", 1, {width:"170px"})
            .to("#splash .logo", 0.5, {opacity:0} )
            .to(".lang-select",1, {opacity: 1}, "+=0.2");
        
    tlSplash.play();
    
    
        
    }, time);
}