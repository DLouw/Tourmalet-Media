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

    
    
    $("#btnViewProject").click(function(){ 
       $("#showcase").goTo(function(){
           $("#showcase .double-page-parent").addClass("show-right-half");                
        });
       
    });
    
    $(window).scroll(function(){
        $("#showcase .double-page-parent").removeClass("show-right-half");
        $("#design .double-page-parent").removeClass("show-right-half");
    });
    
    //Flip containers
    var intervalID = setInterval(flip, 7000);

    //Design Icons
    $(".design-icon").click(function(){ 
       $("#design").goTo(function(){
           $("#design .double-page-parent").addClass("show-right-half");                
        });
       
    });
    
});


/////Scrollto
$.fn.goTo = function (animCB) {
    return this.each(function () {
        $('html, body').animate({
            scrollTop: $(this).offset().top
        }, 500).promise().then(animCB);
    });
}    

function flip(){
    $(".flip-container").toggleClass("flip");
}

