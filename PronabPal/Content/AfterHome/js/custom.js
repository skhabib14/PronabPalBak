/*********** home page slide ************/
$('#slider').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
	dots:false,
	autoplay:true,
	autoplayTimeout: 3000,
	animateOut: 'fadeOut',
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
});
/********** sticky header ***********/
jQuery
	$(window).scroll(function(){
	var sticky = $('.head-main'),
	scroll = $(window).scrollTop();

	if (scroll >= 150) sticky.addClass('fixed');
	else sticky.removeClass('fixed');
});
/********* bottom to top scroll *******/
$(document).ready(function(){
    $(window).scroll(function () {
		if ($(this).scrollTop() > 50) {
			$('#back-to-top').fadeIn();
		} else {
			$('#back-to-top').fadeOut();
		}
	});
	// scroll body to 0px on click
	$('#back-to-top').click(function () {
		$('#back-to-top').tooltip('hide');
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});
	
	$('#back-to-top').tooltip('show');
});
/************ current spot *************/
$('#current-spot').owlCarousel({
    loop:false,
    margin:10,
    nav:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
})
$('#spot-all').owlCarousel({
    loop:false,
    margin:10,
    nav:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
})
