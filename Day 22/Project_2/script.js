$(document).ready(function(){
    // Price Range Slider using jQuery UI
    $("#priceSlider").slider({
        min: 100,
        max: 2000,
        value: 500,
        slide: function(event, ui) {
            $("#priceValue").text(ui.value);
        }
    });
    
    // Initialize Slick Carousel for Image Carousel
    $(".carousel").slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 2000
    });
});

