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
  })

  // Product slider - end

  // Animation for done projects 

  // $(window).scroll(startCounter);

  // function startCounter() {
  //   var hT = $('.main-info-done').offset().top,
  //       hH = $('.main-info-done').outerHeight(),
  //       wH = $(window).height();
    
  //   console.log('hi')

  //   if($(window).scrollTop() > hT+hH-wH) {
  //     $(window).off("scroll", startCounter);

  //     $('.main-info-done-val').each(function () {
  //       var $this = $(this);
  //       jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
  //         duration: 5000,
  //         easing: 'swing',
  //         step: function () {
  //           $this.text(Math.ceil(this.Counter));
  //         }
  //       });
  //     });
  //   }
  // };
  
  // Animation for done projects - end
});