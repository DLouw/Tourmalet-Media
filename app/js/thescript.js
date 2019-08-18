(function ($) {
    "use strict"; // Start of use strict

    // Closes the sidebar menu
    $(".menu-toggle").click(function (e) {
        e.preventDefault();
        $("#sidebar-wrapper").toggleClass("active");
        $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
        $(this).toggleClass("active");
    });

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
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
    $('#sidebar-wrapper .js-scroll-trigger').click(function () {
        $("#sidebar-wrapper").removeClass("active");
        $(".menu-toggle").removeClass("active");
        $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
    });

    //  // Scroll to top button appear
    //  $(document).scroll(function() {
    //    var scrollDistance = $(this).scrollTop();
    //    if (scrollDistance > 100) {
    //      $('.scroll-to-top').fadeIn();
    //    } else {
    //      $('.scroll-to-top').fadeOut();
    //    }
    //  });

})(jQuery); // End of use strict

// Scrllmagic initialization
var controller = new ScrollMagic.Controller();

var introOpen = false;
var expandActive = false;
var designOpen = false;

$(document).ready(function () {


    //One Page Scroll Config and Init
    $("#main").onepage_scroll({
        sectionContainer: ".op-section", // sectionContainer accepts any kind of selector in case you don't want to use section
        easing: "ease-out", // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
        // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
        animationTime: 500, // AnimationTime let you define how long each section takes to animate
        pagination: false, // You can either show or hide the pagination. Toggle true for show, false for hide.
        updateURL: false, // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
        beforeMove: function (index) {}, // This option accepts a callback function. The function will be called before the page moves.
        afterMove: function (index) {}, // This option accepts a callback function. The function will be called after the page moves.
        loop: false, // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
        keyboard: true, // You can activate the keyboard controls
        responsiveFallback: false, // You can fallback to normal page scroll by defining the width of the browser in which
        // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
        // the browser's width is less than 600, the fallback will kick in.
        direction: "vertical" // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".  
    });


    // Design section
    $(".carousel").carousel('pause');
    tlDesignContent = new TimelineMax({
        paused: true
    });
    tlDesignContent.to(".design-cover", 0.4, {
            opacity: 0,
            display: "none"
        })
        .from("#design-content .carousel, .design-cover", 1, {
            scale: 0.9,
            ease: Power2.easeOut
        }, "+=0.2");

    $("#btn-expand").click(function () {
        tlDesignContent.play();
        expandActive = true;
    });

    // Brand text
    tlBrandText = new TimelineMax();
    tlBrandText.from("#brand-text .tw1", 1, {
            opacity: 0,
            y: "100",
            ease: Power2.easeOut
        }, 0.1)
        .to("#brand-text .tw2", 1, {
            opacity: 0.8,
            width: 50,
            ease: Power2.easeOut
        }, "+=-1")
        .staggerFrom("#brand-text .tw3", 1, {
            opacity: 0,
            ease: Power2.easeIn,
            delay: "label1"
        }, "0.3")
        .to("#brand-text .tw2", 1, {
            opacity: 0.5,
            width: 130,
            ease: Power2.easeOut
        }, "+=-1")
        .to("#brand-text .tw4", 1, {
            color: "#C2396A",
            ease: Power2.easeOut
        }, "+=-1");


    var scBrandText = new ScrollMagic.Scene({
            triggerElement: "#brand-text",
            triggerHook: "onOnter",
            offset: "0"
        })
        .setTween(tlBrandText)
        .addTo(controller);

    //Brands content
    tlBrandContent2 = new TimelineMax({
        paused: true
    });

    tlBrandContent2.to("#container-all", 0.5, {
            scaleX: 2,
            scaleY: 2,
            opacity: 0,
            display: "none",
            ease: Power2.easeOut
        }, 0.05)
        .to("#container-one", 0.1, {
            display: "flex"
        })
        //.from("#container2", 0.5, {scaleX:2, scaleY:2, opacity: 0, ease:Power2.easeOut, onComplete: function(){
        .staggerFrom("#container-one .elems", 0.4, {
            x: "100px",
            opacity: 0,
            ease: Power2.easeOut,
            onComplete: function () {
                designOpen = true;
            }
        }, 0.1);

    $(".brand-icon").click(function () {

        var desc = $(this).data("desc");
        var src = $(this).attr("src");

        $("#brand-image").attr("src", src);
        $("#brand-paragraph").text(desc);

        tlBrandContent2.play();

    });

    //Design icons close
    $("#btnCloseDesign").click(function () {
        tlBrandContent2.reverse();
        designOpen = false;

    });

    // Design section
    tlDesignText = new TimelineMax();
    //Remembering to add radio buttons again
    tlDesignText.from("#design-text .tw1", 1, {
            opacity: 0,
            y: "100",
            ease: Power2.easeOut
        }, 0.1)
        .to(".tw2", 1, {
            opacity: 0.8,
            width: 50,
            ease: Power2.easeOut
        }, "+=-1")
        .staggerFrom("#design-text .tw3", 1, {
            opacity: 0,
            ease: Power2.easeIn,
            delay: "label1"
        }, "0.3")
        .to("#design-text .tw2", 1, {
            opacity: 0.5,
            width: 160,
            ease: Power2.easeOut
        }, "+=-1")
        .to("#design-text .tw4", 1, {
            color: "#C2396A",
            ease: Power2.easeOut
        }, "+=-1");

    var scDesignText = new ScrollMagic.Scene({
            triggerElement: "#design-text",
            triggerHook: "onOnter",
            offset: "0"
        })
        .setTween(tlDesignText)
        .addTo(controller);



    // Web Text
    tlWebText = new TimelineMax();

    tlWebText.from("#web-text .tw1", 1, {
            opacity: 0,
            y: "100",
            ease: Power2.easeOut
        }, 0.1)
        .to(".tw2", 1, {
            opacity: 0.8,
            width: 50,
            ease: Power2.easeOut
        }, "+=-1")
        .staggerFrom("#web-text .tw3", 1, {
            opacity: 0,
            ease: Power2.easeIn,
            delay: "label1"
        }, "0.3")
        .to("#web-text .tw2", 1, {
            opacity: 0.5,
            width: 180,
            ease: Power2.easeOut
        }, "+=-1")
        .to("#web-text .tw4", 1, {
            color: "#C2396A",
            ease: Power2.easeOut
        }, "+=-1");

    var scWebText = new ScrollMagic.Scene({
            triggerElement: "#web-text",
            triggerHook: "onOnter",
            offset: "0"
        })
        .setTween(tlWebText)
        .addTo(controller);

    //Web Content
    tlWebContent = new TimelineMax();

    tlWebContent.from("#web-content .carousel", 1, {
        scale: 0.9,
        ease: Power2.easeOut
    }, "+=0.2");

    var scWebContent = new ScrollMagic.Scene({
            triggerElement: "#web-content",
            triggerHook: "onOnter",
            offset: "0"
        })
        .setTween(tlWebContent)
        .addTo(controller);


    var tlBrandContent = new TimelineMax();

    tlBrandContent.staggerFrom("#brand-content .tw1", 1, {
            y: 50,
            opacity: 0,
            ease: Power2.easeOut
        }, 0.2)
        .to("#brand-content .tw1", 0.5, {
            opacity: 1,
            ease: Power0.easeOut
        }, "+=0.2");

    var scBrandContent = new ScrollMagic.Scene({
            triggerElement: "#brand-content"
        })
        .setTween(tlBrandContent) // trigger a TweenMax.to tween
        .addTo(controller);

    // Opening page animation
    $(".btn-lang").click(function () {
        //translatePage($(this).data("sel"));

        var tlLang = new TimelineMax();

        tlLang.to(".load-line", 1, {
                width: "0px"
            })
            .to(".lang-select", 0.1, {
                opacity: 0
            })
            .to(".load-line", 0.5, {
                width: "0px"
            }, "+= -0.1")
            .to("#splash", 0.5, {
                opacity: 0,
                onComplete: function () {
                    $("#splash").hide();
                    $("body").removeClass("no-scroll");
                    console.log("called");
                }
            });

    });

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

//Function to navigate on the page with the onepage plugin enabled
function onepageTrigger(trigger) {

    $(trigger).click();
}


function translatePage(lang) {
    //(localStorage.getItem('language') == null) ? setLanguage('en') : false;
    $.ajax({
        url: '/language/' + lang + '.json',
        dataType: 'json',
        dataType: 'json',
        success: function (langlookup) {
            $("[data-lang]").each(function () {
                item = $(this);
                item.text(langlookup[item.attr("data-lang")]);
            });
        }
    });
}

function splash(param) {
    var time = param;

    setTimeout(function () {

        console.log("splashing");

        var tlSplash = new TimelineMax({
            paused: true
        });

        tlSplash.to(".load-line", 1, {
                width: "170px"
            })
            .to("#splash .logo", 0.5, {
                opacity: 0
            })
            .to(".lang-select", 1, {
                opacity: 1
            }, "+=0.2")
            .to("#landing", 2, {
                opacity: 1,
                ease: Power2.easeOut
            });

        tlSplash.play();

    }, time);
}
