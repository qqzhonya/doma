$(function() {

  // Header project dropdown

  $('.header-project-title').click(function() {
    $(this).toggleClass('active');

    $('.header-project-dropdown').slideToggle();
  });

  // Header project dropdown - end 

  // Main head slider

  $('.main-head-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrow: true,
    infinite: true,
    speed: 2000
  });

  // Main head slider - end

  // Main page advantages

  $('.main-advantages-more').click(function() {
    $(this).toggleClass('active');

    if($(this).hasClass('active')) {
      $(this).text('Свернуть все преимущества');

      $('.main-advantages-elem:nth-child(n+6)').addClass('active');
    } else {
      $(this).text('Показать все преимущества');

      $('.main-advantages-elem:nth-child(n+6)').removeClass('active');
    }
  });

  // Main page advantages - end
  
  // Main page popular tab

  $('ul.main-popular-tab-nav').on('click', 'li:not(.active)', function() {
    $(this)
      .addClass('active').siblings().removeClass('active')
      .closest('div.main-popular-tab').find('div.main-popular-tab-elem').removeClass('active').eq($(this).index()).addClass('active');
  
    $('.product-slider').slick('refresh')
  });

  // Main page popular tab - end 

  // Product slider

  $('.product-slider').slick({
    slidesToShow: 3,
    slidesToScroll: 3,
    dots: true,
    arrow: true,
    infinite: false,
    speed: 1350.
  });

  // Product slider - end

  // Action slider

  $('.main-action-wrap').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrow: true,
    infinite: true,
    speed: 2000
  });

  // Action slider - end 
  
  // Filter range slider

  var handle = $('.catalog-filter-area-slider-handle');
  var handleL = $('.catalog-filter-area-slider-handle-l');
  var handleR = $('.catalog-filter-area-slider-handle-r');

  $('.catalog-filter-area-slider').slider({
    range: true,
    min: 0,
    max: 1000,
    values: [ 0, 1000 ],
    create: function() {
      handleL.text($(this).slider("values", 0));
      handleR.text($(this).slider("values", 1));
    },
    slide: function( event, ui ) {
      handleL.text(ui.values[ 0 ]);
      handleR.text(ui.values[ 1 ])
    }
  });

  // Filter range slider - end

  // Show\Hide room

  $('.catalog-filter-hide-btn').click(function() {
    var parent = $(this).parent();

    $(this).toggleClass('active');

    if($(this).hasClass('active')) {
      $(this).text('Скрыть');
      parent.addClass('show');
    } else {
      $(this).text('Показать');
      parent.removeClass('show');
    }
  });

  // Show\hide room - end
});