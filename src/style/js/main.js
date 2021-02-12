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

  // Main head slider link wrap

  $(".main-head-slider-more-btn").click(function(e) {
    e.stopPropagation();
    $(this).toggleClass('active');

    let linkWrap = $(".main-head-slider-link-dropdown");

    if($(this).hasClass('active')) {
      $(this).hide()
      linkWrap.show();
    } else {
      $(this).show()
      linkWrap.hide();
    }
  });

  $('.main-head-slider-btn, .main-head-slider-link-dropdown').click(function(e) {
    e.stopPropagation();
  })

  $(window).click(function() {
    $('.main-head-slider-more-btn').removeClass('active').show();
    $('.main-head-slider-link-dropdown').hide();
  })

  $('.main-head-slider-link-dropdown-close').click(function() {
    $('.main-head-slider-more-btn').removeClass('active').show();
    $('.main-head-slider-link-dropdown').hide();
  })

  // Main head slider link wrap - end

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

  // Main page popular tab url

  function changeUrl(btn) {
    var tabData = btn.data('url');
    var popularBtn = $('.main-popular-all');
    
    popularBtn.attr('href', tabData);
  }

  $(window).on('load', function() {
    changeUrl($('.main-popular-tab-nav-elem.active'));
  });

  $('.main-popular-tab-nav-elem').click(function() {
    changeUrl($(this));
  });

  // Main page popular tab url - end 

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

  var $range = $(".catalog-filter-area-slider"),
      $inputMin = $('.catalog-filter-area-min'),
      $inputMax = $('.catalog-filter-area-max'),
      instance, 
      min = $range.data('min-val'),
      max = $range.data('max-val'),
      from = 0,
      to = 0;

  $range.ionRangeSlider({
    skin: "big",
    type: "double",
    min: min,
    max: max,
    from: $range.data('min-val'),
    to: $range.data('max-val'),
    hide_min_max: true,
    hide_from_to: true,
    onStart: updateInputs,
    onChange: updateInputs
  });

  instance = $range.data("ionRangeSlider");

  function updateInputs (data) {
    from = data.from;
    to = data.to;

    $('.irs-handle.from').html(from);
    $('.irs-handle.to').html(to);
    $inputMin.prop("value", from);
    $inputMax.prop("value", to);
  };

  // Filter range slider - end

  // Filter area buttons

  function getVal(btn) {
    let parent = btn.parent().parent()
    let inputMin = parent.find('.catalog-filter-input-min');
    let inputMax = parent.find('.catalog-filter-input-max');
    let btnMin = btn.data('min');
    let btnMax = btn.data('max');

    inputMin.val(btnMin);
    inputMax.val(btnMax);
  }

  $('.catalog-filter-price-btn').click(function() {
    $(this).addClass('active').siblings().removeClass('active');
    getVal($(this));
  });

  $('.catalog-filter-area-btn').click(function() {
    $(this).addClass('active').siblings().removeClass('active');
    getVal($(this));

    var inputAreaMinVal = $('.catalog-filter-area-min').val();
    var inputAreaMaxVal = $('.catalog-filter-area-max').val();
    
    console.log(inputAreaMinVal, inputAreaMaxVal);

    $range.data("ionRangeSlider").update({
      from: inputAreaMinVal,
      to: inputAreaMaxVal
    });

    $('.irs-handle.from').html(inputAreaMinVal);
    $('.irs-handle.to').html(inputAreaMaxVal);

  });

  // Filter area buttons end

  // Show\Hide btn val

  function showBtnVal(button) {
    button.each(function() {
      let btnParent = $(this).parent();
      let btnVal = $(this).find('.catalog-filter-hide-btn-val');
      let filterItem = btnParent.find('.catalog-filter-item');

      let filterItemVal = filterItem.filter(function() {
          return $(this).css('display') === 'none';
        }).length;

      btnVal.html(filterItemVal);
    });
  }
  
  showBtnVal($('.catalog-filter-hide-btn'));

  // Show\HIde btn val - end 

  // Show\Hide room

  $('.catalog-filter-hide-btn').click(function() {
    let parent = $(this).parent();

    let btnText = $(this).find('.catalog-filter-hide-btn-text');
    let btnVal = $(this).find('.catalog-filter-hide-btn-val');

    $(this).toggleClass('active');

    if($(this).hasClass('active')) {
      btnText.text('Скрыть ');
      btnVal.hide();
      parent.addClass('show');
    } else {
      btnText.text('Показать еще ');
      parent.removeClass('show');
      btnVal.show();
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