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

      $('.main-advantages-elem').addClass('active');
    } else {
      $(this).text('Показать все преимущества');

      $('.main-advantages-elem').removeClass('active');
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
    speed: 1350,
    responsive: [
      {
        breakpoint: 940,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 530,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ],
  });

  // Product slider - end

  // Action slider

  $('.main-action-wrap').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrow: true,
    infinite: true,
    speed: 2000,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 716,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
    ],
  });

  // Action slider - end 
  
  // Filter range slider

  var handleL = $('.catalog-filter-area-slider-handle-l');
  var handleR = $('.catalog-filter-area-slider-handle-r');
  var valMin  = $('.catalog-filter-area-min');
  var valMax  = $('.catalog-filter-area-max');

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
      handleR.text(ui.values[ 1 ]);
      valMin.val(ui.values[0]);
      valMax.val(ui.values[1]);
    }
  });

  valMin.val($('.catalog-filter-area-slider').slider( "values", 0 ));
  valMax.val($('.catalog-filter-area-slider').slider( "values", 1 ));

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

  // Map 

  function initMap() {
		var myMap = new ymaps.Map("contact-map", {
					center: [60.070834, 30.277870],
					zoom: 16
				}, {
					searchControlProvider: 'yandex#search'
				});
    
    MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
      '<div class="popover top">' +
      '<div class="arrow"></div>' +
      '<div class="popover-inner">' +
      '$[[options.contentLayout observeSize minWidth=235 maxWidth=385 minHeight=100 maxHeight=350]]' +
      '</div>' +
      '</div>', {
        
      build: function () {
        this.constructor.superclass.build.call(this);

        this._$element = $('.popover', this.getParentElement());

        this.applyElementOffset();

        this._$element.find('.popover-close')
          .on('click', $.proxy(this.onCloseClick, this));
      },

      clear: function () {
        this._$element.find('.popover-close')
          .off('click');

        this.constructor.superclass.clear.call(this);
      },

      onSublayoutSizeChange: function () {
        MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

        if(!this._isElement(this._$element)) {
          return;
        }

        this.applyElementOffset();

        this.events.fire('shapechange');
      },

      applyElementOffset: function () {
        this._$element.css({
          left: -(this._$element[0].offsetWidth / 2),
          top: -(this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight)
        });
      },

      onCloseClick: function (e) {
        e.preventDefault();

        this.events.fire('userclose');
      },

      _isElement: function (element) {
        return element && element[0] && element.find('.arrow')[0];
      }
    }),

    MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
      '<h3 class="popover-title">$[properties.balloonHeader]</h3>' +
      '<div class="popover-content"><div class="popover-content-wrap">$[properties.balloonContent]</div></div>'
    ),

		myMap.geoObjects
			.add(new ymaps.Placemark([60.071788, 30.284404], {
        balloonContent:
          '<a class="popover-close" href="#">&times;</a>' + 
          '<span class="popover-elem time">Пн – Вс <b>09:00-18:00</b></span>' + 
          '<a class="popover-elem phone" href="tel:+78127777777">+7 (812) 777-77-77</a><br/>' +
          '<span class="popover-elem place">Санкт-Петербург,Выборгское ш. 212</span>',
        hintContent: 'г. Санкт-Петербург, Выборгское шоссе 212'
			}, {
				// Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: 'style/img/icon/map-pin.png',
        // Размеры метки.
        iconImageSize: [38, 60],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-15, -55],
        balloonShadow: false,
        balloonLayout: MyBalloonLayout,
        balloonContentLayout: MyBalloonContentLayout,
        balloonPanelMaxMapArea: 0,
        // И дополнительно смещаем балун, для открытия над иконкой.
        balloonOffset: [-40, -100]
      }));
    
    myMap.controls.remove('geolocationControl');
    myMap.controls.remove('searchControl');
    myMap.controls.remove('trafficControl');
    myMap.controls.remove('typeSelector');
    myMap.controls.remove('fullscreenControl');
    myMap.controls.remove('rulerControl');
    myMap.behaviors.disable(['scrollZoom']);

    function onResizeMap() {
      if ($(window).width() > '761') { 
        //Set New center
        myMap.setCenter([60.070834, 30.277870]);
      } else {
        myMap.setCenter([60.071788, 30.284404]);
      }
    } onResizeMap();

    window.onresize = function () {
        onResizeMap();
    };
	}
  
  if($('#contact-map').length) {
    ymaps.ready(initMap);
  }

  // Map - end

  // Form file 

  $(".form-file-input").on("change", function () {
    var name = $(this)[0].files[0].name;
    if(name.length > 15) {
      $(this).parent().find(".form-file-name ").text(name.substring(0, 5) + '...' + name.slice(name.length - 6));
    } else {
      $(this).parent().find(".form-file-name").text(name);
    }
    
    $('.main-page_order-file-preview-delete').show();
  });

  // Form file - end

  // Product prev slider

  $('.product-prev-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow: true,
    infinite: false,
  });

  $('.product-prev-slider-nav-item').on('click', function () {
    $(this).addClass('active').siblings().removeClass('active');

		$('.product-prev-slider').slick( 'slickGoTo', jQuery($(this)).data('slick-index'));
	} );

  // Product prev slider - end

  // Product complect nav

  $('ul.product-complect-nav').on('click', 'li:not(.active)', function() {
    $(this)
      .addClass('active').siblings().removeClass('active')
      .closest('div.product-complect').find('div.product-complect-elem').removeClass('active').eq($(this).index()).addClass('active');
  });

  // Product complect nav - end

  // Mobile menu open
  
  $('.header-menu-btn').click(function() {
    $(this).toggleClass('active');

    $('.mobile-menu').fadeOut();

    if($(this).hasClass('active')) {
      $('.mobile-menu').fadeIn();
    }
  });

  // Mobile menu open - end

  // Mobile menu dropdown

  $('.mobile-menu-list-elem.toggle').click(function() {
    var parent = $(this).parent()

    parent.toggleClass('active').siblings().removeClass('active');
    
    $('.mobile-menu-dropdown').slideUp();

    if(parent.hasClass('active')) {
      parent.find('.mobile-menu-dropdown').slideDown();
    }
  });

  // Mobile menu dropdown - end

  // Mobile open filter 

  $('.catalog-filter-btn').click(function() {
    $(this).toggleClass('active');

    $('.catalog-filter').slideUp();

    if($(this).hasClass('active')) {
      $('.catalog-filter').slideDown();
    }
  });

  // Mobile open filter - end

  // Foundation catalog show\hide description

  $('.foundation-catalog-elem-show-all').click(function() {
    $(this).toggleClass('active');

    if($(this).hasClass('active')) {
      $(this).text('Свернуть описание');
      $(this).parent().find('.foundation-catalog-elem-text').addClass('active');
    } else {
      $(this).text('Развернуть описание');
      $(this).parent().find('.foundation-catalog-elem-text').removeClass('active')
    }
  });

  // Foundation catalog show\hide description - end 

  // Foundation diff slider 

  $('.foundation-diff-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow: true,
    dots: true,
    infinite: false,
  });

  // Foundation diff slider - end

  // Foundation work slider 

  $('.foundation-work-slider').slick({
    slidesToShow: 3,
    slidesToScroll: 3,
    arrow: true,
    infinite: false,
    responsive: [
      {
        breakpoint: 761,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
    ],
  });

  // Foundation work slider - end

  // Foundation other slider 

  $('.foundation-other-slider').slick({
    slidesToShow: 4,
    slidesToScroll: 4,
    arrow: true,
    infinite: false,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 761,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
    ],
  })

  // Foundation other slider - end

  // Foundation build mob slider

  $('.foundation-build-slider').slick({
    slidesToShow: 2,
    slidesToScroll: 2,
    arrow: true,
    dots: true,
    infinite: false,
    responsive: [
      {
        breakpoint: 590,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
    ],
  })

  $(window).resize(function() {
    if($(this).width() <= 761) {
      $('.foundation-build-slider').slick('refresh');
    }
  })

  // Foundation build mob slider - end

  // Open modal

  $('.modal-btn').click(function(e) {
    e.stopPropagation();

    var btnVal = $(this).data("modal-btn");
    var showModal = $('.modal').filter('[data-modal = "' + btnVal +'"]');
      
    $('body').addClass('modal-active');
    $('.main-wrap').addClass('modal-active');

    showModal.fadeIn();

    console.log(btnVal);
  });

  $('')

  $('.modal-close').click(function() {
		$('.modal').fadeOut();
    $('html, body').removeClass('modal-active');
  });

  $(window).click(function() {
    $('.modal').fadeOut();
    $('html, body').removeClass('modal-active');
  })

  $('.modal-body').click(function(e) {
    e.stopPropagation();
  });

  // Open modal - end
});