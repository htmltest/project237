$(document).ready(function() {

    if ($('.main').length > 0) {
        $('footer').addClass('with-main');
    }

    $('.gallery').each(function() {
        var curGallery = $(this);
        curGallery.on('init', function(event, slick) {
            var curSlide = curGallery.find('.slick-current');
            var curPhotoHeight = curSlide.find('.gallery-item-photo').outerHeight();
            curGallery.find('.slick-dots').css({'top': curPhotoHeight});
            curGallery.find('.slick-prev').css({'top': curPhotoHeight / 2});
            curGallery.find('.slick-next').css({'top': curPhotoHeight / 2});
        });
        var options = {
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<button type="button" class="slick-prev"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-prev"></use></svg></button>',
            nextArrow: '<button type="button" class="slick-next"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-next"></use></svg></button>',
            adaptiveHeight: true,
            dots: true,
            responsive: [
                {
                    breakpoint: 1199,
                    settings: {
                        fade: false,
                        dots: false
                    }
                }
            ]
        };
        curGallery.slick(
            options
        ).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            var curSlide = curGallery.find('.slick-slide:not(.slick-cloned)').eq(nextSlide);
            var curPhotoHeight = curSlide.find('.gallery-item-photo').outerHeight();
            curGallery.find('.slick-dots').css({'top': curPhotoHeight});
            curGallery.find('.slick-prev').css({'top': curPhotoHeight / 2});
            curGallery.find('.slick-next').css({'top': curPhotoHeight / 2});
        });
    });

    $('.nav-add-link').click(function(e) {
        var curWidth = $(window).width();
        if (curWidth < 375) {
            curWidth = 375;
        }

        var curScroll = $(window).scrollTop();
        $('.wrapper').css({'top': -curScroll});
        $('.wrapper').data('curScroll', curScroll);

        $('html').addClass('nav-add-open');
        $('meta[name="viewport"]').attr('content', 'width=' + curWidth);

        e.preventDefault();
    });

    $('.nav-add-close a').click(function(e) {
        $('html').removeClass('nav-add-open');
        $('meta[name="viewport"]').attr('content', 'width=device-width');

        $('.wrapper').css({'top': 0});
        $(window).scrollTop($('.wrapper').data('curScroll'));

        e.preventDefault();
    });

    $('.nav .nav-add-item-title').each(function() {
        var curItem = $(this);
        var curGroup = curItem.parent();
        if (curGroup.find('.nav-add-item-list').length == 1) {
            curItem.append('<span class="nav-add-item-title-mobile-link"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#nav-add-item-title-mobile-link"></use></svg></span>');
        }
    });

    $('body').on('click', '.nav-add-item-title-mobile-link', function() {
        var curGroup = $(this).parent().parent();
        if (curGroup.hasClass('open')) {
            curGroup.removeClass('open');
        } else {
            curGroup.addClass('open');
        }

    });

    $('.nav .nav-add-item-list > ul > li').each(function() {
        var curGroup = $(this);
        if (curGroup.find('ul').length == 1) {
            curGroup.append('<span class="nav-add-item-mobile-link"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#footer-submenu"></use></svg></span>');
        }
    });

    $('body').on('click', '.nav-add-item-mobile-link', function() {
        var curGroup = $(this).parent();
        curGroup.toggleClass('open');

    });

    $('.nav-add-list-sitemap .nav-add-item-title').each(function() {
        var curItem = $(this);
        var curGroup = curItem.parent();
        if (curGroup.find('.nav-add-item-list').length == 1) {
            curItem.append('<span class="nav-add-sitemap-item-title-mobile-link"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#nav-add-item-title-mobile-link"></use></svg></span>');
        }
    });

    $('body').on('click', '.nav-add-sitemap-item-title-mobile-link', function() {
        var curGroup = $(this).parent().parent();
        curGroup.toggleClass('open');
    });

    $('.footer-menu-block-title').click(function() {
        $(this).parent().toggleClass('open');
    });

    $('.footer-menu-block-content > ul > li').each(function() {
        var curGroup = $(this);
        if (curGroup.find('ul').length == 1) {
            curGroup.append('<span class="footer-menu-sub-mobile-link"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#footer-submenu"></use></svg></span>');
        }
    });

    $('body').on('click', '.footer-menu-sub-mobile-link', function() {
        var curGroup = $(this).parent();
        curGroup.toggleClass('open');
    });

    $('.page-menu').each(function() {
        $('.page-menu-inner').append('<ul></ul>');
        $('.page-section-item').each(function() {
            var curItem = $(this);
            $('.page-menu-inner ul').append('<li><a href="#' + curItem.attr('id') + '">' + curItem.data('title') + '</a></li>');
        });
    });

    $('body').on('click', '.page-menu ul li a', function(e) {
        var curBlock = $($(this).attr('href'));
        if (curBlock.length > 0) {
            if (curBlock.parents().filter('.product-info-content').length == 1 && !curBlock.parents().filter('.product-info-content').hasClass('active')) {
                var curIndex = curBlock.parents().filter('.product-info-container').find('.product-info-content').index(curBlock.parents().filter('.product-info-content'));
                curBlock.parents().filter('.product-info').find('.product-info-menu li').eq(curIndex).find('a').trigger('click');
            }
            var curTop = curBlock.offset().top;
            if (curBlock.find('> h2').length > 0) {
                curTop = curBlock.find('> h2').eq(0).offset().top;
            }
            if (curBlock.parents().filter('.product-info').find('.product-info-menu').length > 0) {
                curTop = curBlock.parents().filter('.product-info').find('.product-info-menu').offset().top;
            }

            var headerHeight = 60;
            var menuHeight = 43;
            var diff = 20;

            $('html, body').animate({'scrollTop': curTop - headerHeight - menuHeight - diff});
        }
        e.preventDefault();
    });

    $('.main-events-list').slick({
        infinite: true,
        variableWidth: true,
        prevArrow: '<button type="button" class="slick-prev"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-prev"></use></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-next"></use></svg></button>',
        autoplay: true,
        autoplaySpeed: 15000,
        dots: true,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true
                }
            }
        ]
    });
    $('.main-events-list').on('setPosition', function(event, slick) {
        if ($('.main-events-item.active').length > 0) {
            $('.main-events-list').slick('slickSetOption', 'autoplaySpeed', 9999999);
        }

    });

    $('.main-events-list').on('beforeChange', function(event, slick, currentSlide) {
        if ($(window).width() < 1200) {
            $('.main-events-item.active').removeClass('active');
            $('.main-events-form').html('').hide();
        }
    });

    $('body').on('click', '.main-events-item-inner', function(e) {
        var curLink = $(this);
        if (typeof ($(this).attr('data-href')) != 'undefined') {
            $('.main-events-list').slick('slickSetOption', 'autoplaySpeed', 9999999);
            if ($('.main-events-form').length > 0) {
                var curItem = curLink.parent();
                if (curItem.hasClass('active')) {
                    $('.main-events-form').html('').hide();
                    curItem.removeClass('active')
                } else {
                    $('.main-events-item.active').removeClass('active');
                    $('.main-events-form').html('<div class="loading"></div>').show();
                    curItem.addClass('active')
                    $.ajax({
                        type: 'POST',
                        url: curLink.attr('data-href'),
                        dataType: 'html',
                        cache: false
                    }).done(function(html) {
                        $('.main-events-form').html('<div class="container">' + html + '</div>');
                        initForm($('.main-events-form form'));
                        updatePrecalc($('.main-events-form form'));
                        $('#order-programm-select').each(function() {
                            var curValue = $(this).val();
                            $('.order-programm-detail').hide();
                            var curProgramm = $('.order-programm-detail[data-id="' + curValue + '"]');
                            curProgramm.show();
                        });
                        initVZR();
                    });
                }
                e.preventDefault();
            }
        }
    });

    $('.main-up').click(function(e) {
        $('html, body').animate({'scrollTop': 0});
        e.preventDefault();
    });

    $('.cookies-message-close').click(function(e) {
        $('.cookies-message').fadeOut(500);
        e.preventDefault();
    });

    $('.psb-message-close').click(function(e) {
        $('.psb-message').fadeOut(500);
        e.preventDefault();
    });

    $('.block-bg-docs-title span').click(function() {
        $(this).parents().filter('.block-bg-docs').toggleClass('open').find('.block-bg-docs-content').slideToggle();
    });

    $('body').on('click', '.window-link', function(e) {
        var curLink = $(this);
        if (!curLink.hasClass('window-add')) {
            windowOpen(curLink.attr('href'));
        } else {
            curLinkWindowAdd = curLink;
            windowOpen(curLink.attr('href'), true);
        }
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    });

    $('body').on('click', '.window-close, .window-close-btn', function(e) {
        windowClose();
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).hasClass('window')) {
            windowClose();
        }
    });

    $(window).resize(function() {
        windowPosition();
    });

    $('.contacts-menu a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            $('.contacts-menu li.active').removeClass();
            curLi.addClass('active');
            var curIndex = $('.contacts-menu li').index(curLi);
            $('.contacts-tab.active').removeClass('active');
            $('.contacts-tab').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('body').on('click', '.vacancy-title', function(e) {
        var curItem = $(this).parent().filter('.vacancy');
        curItem.toggleClass('open');
        curItem.find('.vacancy-content').slideToggle();
        e.preventDefault();
    });

    $('body').on('click', '.vacancy-content-hide', function(e) {
        var curItem = $(this).parents().filter('.vacancy');
        curItem.toggleClass('open');
        curItem.find('.vacancy-content').slideToggle();
        e.preventDefault();
    });

    $('.main-insurance-event-mobile-btn-more-link a').click(function(e) {
        $(this).parent().toggleClass('open');
        e.preventDefault();
    });

    $('.polis-price-list').each(function() {
        var countItems = $(this).find('.polis-price-item').length;
        $(this).addClass('polis-price-list-' + countItems);
    });

    $('.to-link').each(function() {
        var curItem = $(this);
        curItem.replaceWith('<a href="' + curItem.attr('data-href') + '" target="_blank">' + curItem.html() + '</a>');
    });

    $('.form-input .desktop-menu-icon').each(function() {
        $(this).parent().addClass('form-input-with-hint');
    });

    $('.form-select .desktop-menu-icon').each(function() {
        $(this).parent().addClass('form-select-with-hint');
    });

    $('body').on('mouseover', '.desktop-menu-icon', function() {
        var curHint = $(this);
        curHint.removeClass('to-left to-right');
        if (curHint.find('.desktop-menu-icon-text').offset().left + curHint.find('.desktop-menu-icon-text').outerWidth() > $(window).width()) {
            curHint.addClass('to-left');
        }
        if (curHint.find('.desktop-menu-icon-text').offset().left < 0) {
            curHint.addClass('to-right');
        }
    });

    $('body').on('click', '.text-with-hint-link', function(e) {
        var curBlock = $(this).parent();
        if (curBlock.hasClass('open')) {
            curBlock.removeClass('open');
        } else {
            $('.text-with-hint.open').removeClass('open');
            curBlock.removeClass('to-right');
            curBlock.addClass('open');
            var curPopup = curBlock.find('.text-with-hint-popup');
            if (curPopup.offset().left + curPopup.outerWidth() > $(window).width()) {
                curBlock.addClass('to-right');
            }
        }
        e.preventDefault();
    });

    $('body').on('click', '.text-with-hint-popup-close', function(e) {
        $('.text-with-hint.open').removeClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.text-with-hint').length == 0) {
            $('.text-with-hint.open').removeClass('open');
        }
    });

    $('.product-info-menu ul li a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            $('.product-info-menu ul li.active').removeClass('active');
            curLi.addClass('active');
            var curIndex = $('.product-info-menu ul li').index(curLi);
            $('.product-info-content.active').removeClass('active');
            $('.product-info-content').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('body').on('click', '.news-header-select-current', function() {
        var curSelect = $(this).parent();
        if (curSelect.hasClass('open')) {
            curSelect.removeClass('open');
        } else {
            curSelect.addClass('open');
        }
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.news-header-select').length == 0) {
            $('.news-header-select').removeClass('open');
        }
    });

    $('body').on('change', '.news-header-select-list input', function() {
        $('.news-header-select-current span').html($('.news-header-select-list input:checked').parent().find('span').html());
        $('.news-header-select').removeClass('open');
    });

    $('.wrapper table').each(function() {
        var curTable = $(this);
        curTable.wrap('<div class="table-scroll"></div>');
    });

    $('.main-slider-list').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-prev"></use></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-next"></use></svg></button>',
        autoplay: true,
        autoplaySpeed: 15000,
        dots: false,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    arrows: false,
                    dots: true,
                    adaptiveHeight: true
                }
            }
        ]
    }).on('init', function(event, slick) {
        $('.main-slider-ctrl li').eq(0).addClass('active');
    }).on('setPosition', function(event, slick) {
        var currentSlide = $('.main-slider-list').slick('slickCurrentSlide');
        $('.main-slider-ctrl li.active').removeClass('active');
        $('.main-slider-ctrl li').eq(currentSlide).addClass('active');
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        $('.main-slider-ctrl li.active').removeClass('active');
        $('.main-slider-ctrl li').eq(nextSlide).addClass('active');
    });

    $('.main-slider-ctrl li a').click(function(e) {
        var curIndex = $('.main-slider-ctrl li').index($(this).parent());
        $('.main-slider-list').slick('slickGoTo', curIndex);
        e.preventDefault();
    });

    $('.main-partners-list').slick({
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 5,
        prevArrow: '<button type="button" class="slick-prev"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-prev"></use></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-next"></use></svg></button>',
        dots: true,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            }
        ]
    });

    var incidentDrag = false;
    var incidentStartX = 0;
    var incidentStopX = 0;
    var incidentPosition = 2;

    !function(e,n,t){function o(e,n){return typeof e===n}function s(){var e,n,t,s,a,i,r;for(var l in c)if(c.hasOwnProperty(l)){if(e=[],n=c[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(s=o(n.fn,"function")?n.fn():n.fn,a=0;a<e.length;a++)i=e[a],r=i.split("."),1===r.length?Modernizr[r[0]]=s:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=s),f.push((s?"":"no-")+r.join("-"))}}function a(e){var n=u.className,t=Modernizr._config.classPrefix||"";if(p&&(n=n.baseVal),Modernizr._config.enableJSClass){var o=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(o,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),p?u.className.baseVal=n:u.className=n)}function i(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):p?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function r(){var e=n.body;return e||(e=i(p?"svg":"body"),e.fake=!0),e}function l(e,t,o,s){var a,l,f,c,d="modernizr",p=i("div"),h=r();if(parseInt(o,10))for(;o--;)f=i("div"),f.id=s?s[o]:d+(o+1),p.appendChild(f);return a=i("style"),a.type="text/css",a.id="s"+d,(h.fake?h:p).appendChild(a),h.appendChild(p),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(n.createTextNode(e)),p.id=d,h.fake&&(h.style.background="",h.style.overflow="hidden",c=u.style.overflow,u.style.overflow="hidden",u.appendChild(h)),l=t(p,e),h.fake?(h.parentNode.removeChild(h),u.style.overflow=c,u.offsetHeight):p.parentNode.removeChild(p),!!l}var f=[],c=[],d={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){c.push({name:e,fn:n,options:t})},addAsyncTest:function(e){c.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=d,Modernizr=new Modernizr;var u=n.documentElement,p="svg"===u.nodeName.toLowerCase(),h=d._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];d._prefixes=h;var m=d.testStyles=l;Modernizr.addTest("touchevents",function(){var t;if("ontouchstart"in e||e.DocumentTouch&&n instanceof DocumentTouch)t=!0;else{var o=["@media (",h.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");m(o,function(e){t=9===e.offsetTop})}return t}),s(),a(f),delete d.addTest,delete d.addAsyncTest;for(var v=0;v<Modernizr._q.length;v++)Modernizr._q[v]();e.Modernizr=Modernizr}(window,document);

    if (Modernizr.touchevents) {
        $('.product-incident').on('touchstart', function(e) {
            if ($(window).width() < 768) {
                incidentDrag = true;
                incidentStartX = e.originalEvent.touches[0].pageX;
            }
        });

        $('.product-incident').on('touchmove', function(e) {
            if (incidentDrag) {
                incidentStopX = e.originalEvent.touches[0].pageX;
            }
            e.preventDefault();
        });

        $(document).on('touchend', function(e) {
            if (incidentDrag) {
                var diffX = incidentStopX - incidentStartX;
                if (diffX > 50) {
                    incidentPosition++;
                    if (incidentPosition > 4) {
                        incidentPosition = 4;
                    }
                }
                if (diffX < -50) {
                    incidentPosition--;
                    if (incidentPosition < 0) {
                        incidentPosition = 0;
                    }
                }
                switch(incidentPosition) {
                    case 0:
                        $('.product-incident').removeClass('position-0 position-1 position-2 position-3 position-4').addClass('position-0');
                        break;
                    case 1:
                        $('.product-incident').removeClass('position-0 position-1 position-2 position-3 position-4').addClass('position-1');
                        break;
                    case 2:
                        $('.product-incident').removeClass('position-0 position-1 position-2 position-3 position-4').addClass('position-2');
                        break;
                    case 3:
                        $('.product-incident').removeClass('position-0 position-1 position-2 position-3 position-4').addClass('position-3');
                        break;
                    case 4:
                        $('.product-incident').removeClass('position-0 position-1 position-2 position-3 position-4').addClass('position-4');
                        break;
                }
            }
            incidentDrag = false;
        });
    } else {
        $('.product-incident').on('mousedown', function(e) {
            if ($(window).width() < 768) {
                incidentDrag = true;
                incidentStartX = e.pageX;
            }
        });

        $('.product-incident').on('mousemove', function(e) {
            if (incidentDrag) {
                incidentStopX = e.pageX;
            }
        });

        $(document).on('mouseup', function(e) {
            if (incidentDrag) {
                var diffX = incidentStopX - incidentStartX;
                if (diffX > 50) {
                    incidentPosition++;
                    if (incidentPosition > 4) {
                        incidentPosition = 4;
                    }
                }
                if (diffX < -50) {
                    incidentPosition--;
                    if (incidentPosition < 0) {
                        incidentPosition = 0;
                    }
                }
                switch(incidentPosition) {
                    case 0:
                        $('.product-incident').removeClass('position-0 position-1 position-2 position-3 position-4').addClass('position-0');
                        break;
                    case 1:
                        $('.product-incident').removeClass('position-0 position-1 position-2 position-3 position-4').addClass('position-1');
                        break;
                    case 2:
                        $('.product-incident').removeClass('position-0 position-1 position-2 position-3 position-4').addClass('position-2');
                        break;
                    case 3:
                        $('.product-incident').removeClass('position-0 position-1 position-2 position-3 position-4').addClass('position-3');
                        break;
                    case 4:
                        $('.product-incident').removeClass('position-0 position-1 position-2 position-3 position-4').addClass('position-4');
                        break;
                }
            }
            incidentDrag = false;
        });
    }

});

$(window).on('load resize scroll', function() {
    var curScroll = $(window).scrollTop();
    var curHeight = $(window).height();
    $('.vzr-form-window-mobile').each(function() {
        if ((curScroll + curHeight > $('.order-form').offset().top) && (curScroll + curHeight < $('.order-form').offset().top + $('.order-form').height())) {
            $('.vzr-form-window-mobile').addClass('visible');
        } else {
            $('.vzr-form-window-mobile').removeClass('visible');
        }
    });

    $('.order-form-results-inner').each(function() {
        if (($('.order-form-results-inner').height() < $(window).height() + 80) && ($('.order-form-results-inner').height() < $('.order-form-fields').height()) && (curScroll + $('.header-top').outerHeight() + 20 >= $('.order-form-results').offset().top + 55)) {
            $('.order-form-results').addClass('fixed');
            $('.order-form-results-inner').css({'left': $('.order-form-results').offset().left, 'top': 80});
            var curDiff = ($('.order-form-results-inner').offset().top + $('.order-form-results-inner').height() - curScroll) - ($('.order-form-ctrl').offset().top - curScroll);
            if (curDiff > 0) {
                $('.order-form-results').removeClass('fixed');
                $('.order-form-results-inner').css({'left': 'auto', 'top': $('.order-form-ctrl').offset().top - $('.order-form-results').offset().top - 55 - $('.order-form-results-inner').height()});
            }
        } else {
            $('.order-form-results').removeClass('fixed');
            $('.order-form-results-inner').css({'left': 'auto', 'top': 0});
        }
    });

});

function windowOpen(linkWindow, addWindow, dataWindow, callbackWindow) {
    if (addWindow === undefined) {
        addWindow = false;
    }
    if (!addWindow) {
        var curPadding = $('.wrapper').width();
        $('html').addClass('window-open');
        curPadding = $('.wrapper').width() - curPadding;
        $('body').css({'margin-right': curPadding + 'px'});

        if ($('.window').length == 0) {
            $('body').append('<div class="window"><div class="window-loading"></div></div>')
        }
    } else {
        $('body').append('<div class="window"><div class="window-loading"></div></div>')
    }

    $.ajax({
        type: 'POST',
        url: linkWindow,
        dataType: 'html',
        processData: false,
        contentType: false,
        data: dataWindow,
        cache: false
    }).done(function(html) {
        $('.window:last').html('<div class="window-container window-container-load"><div class="window-content">' + html + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a></div></div>')

        if ($('.window:last .window-container img').length > 0) {
            $('.window:last .window-container img').each(function() {
                $(this).attr('src', $(this).attr('src'));
            });
            $('.window:last .window-container').data('curImg', 0);
            $('.window:last .window-container img').one('load', function() {
                var curImg = $('.window:last .window-container').data('curImg');
                curImg++;
                $('.window:last .window-container').data('curImg', curImg);
                if ($('.window:last .window-container img').length == curImg) {
                    $('.window:last .window-container').removeClass('window-container-load');
                    windowPosition();
                }
            });
        } else {
            $('.window:last .window-container').removeClass('window-container-load');
            windowPosition();
        }

        if (typeof (callbackWindow) != 'undefined') {
            callbackWindow.call();
        }

        $('.window:last form').each(function() {
            initForm($(this));
        });
    });
}

function windowPosition() {
    if ($('.window').length > 0) {
        $('.window:last .window-container').css({'left': '50%', 'margin-left': -$('.window:last .window-container').width() / 2});

        $('.window:last .window-container').css({'top': '50%', 'margin-top': -$('.window:last .window-container').height() / 2, 'padding-bottom': 0});
        if ($('.window:last .window-container').height() > $('.window:last').height() - 60) {
            $('.window:last .window-container').css({'top': '30px', 'margin-top': 0, 'padding-bottom': 30});
        }
    }
}

function windowClose() {
    if ($('.window').length > 0) {
        $('.window:last').remove();
        if ($('.window').length == 0) {
            $('html').removeClass('window-open');
            $('body').css({'margin-right': 0});
        }
    }
}

var pageMenuTimer = null;

$(window).on('load resize scroll', function() {
    var windowScroll = $(window).scrollTop();
    $('body').append('<div id="body-test-height" style="position:fixed; left:0; top:0; right:0; bottom:0; z-index:-1"></div>');
    var windowHeight = $('#body-test-height').height();
    $('#body-test-height').remove();

    if ($('.main-up').length == 1) {
        if (windowScroll > windowHeight) {
            $('.main-up').addClass('visible');
        } else {
            $('.main-up').removeClass('visible');
        }
        if (windowScroll + windowHeight > $('footer').offset().top) {
            $('.main-up').css({'margin-bottom': (windowScroll + windowHeight) - $('footer').offset().top});
        } else {
            $('.main-up').css({'margin-bottom': 0});
        }
    }

    $('.contacts-new').each(function() {
        $('.contacts-new').css({'height': (windowHeight - $('header').outerHeight()) + 'px'});
    });
});

$(window).on('load', function() {
    if (window.location.hash != '') {
        window.setTimeout(function() {
            $('.page-menu ul li a[href="' + window.location.hash + '"]').trigger('click');
        }, 500);
    }

    $('.psb-message').each(function() {
        window.setTimeout(function() {
            $('.psb-message').fadeIn(500);
            window.setTimeout(function() {
                if ($('.psb-message').length == 1) {
                    $('.psb-message-close').trigger('click');
                }
            }, 9000);
        }, 3000);
    });
});

$(document).ready(function() {

    $('.contacts-new').each(function() {
        $('body').addClass('page-contacts-new');

        var newHTML = '';
        for (var i = 0; i < contactsData.length; i++) {
            var curItem = contactsData[i];
            newHTML +=  '<div class="contacts-new-left-list-item">' +
                            '<div class="contacts-new-left-list-item-title">' + curItem.title + '</div>' +
                            '<div class="contacts-new-left-list-item-offices">';
            for (var j = 0; j < curItem.offices.length; j++) {
                var curOffice = curItem.offices[j];
                newHTML +=      '<div class="contacts-new-left-list-item-office">' +
                                    '<div class="contacts-new-left-list-item-office-address">' + curOffice.address + '</div>' +
                                    '<div class="contacts-new-left-list-item-office-link"><a href="#" data-item="' + i + '" data-office="' + j + '">' + contactsTexts.detail + '</a></div>' +
                                '</div>';
            }
            newHTML +=      '</div>' +
                        '</div>';
        }
        $('.contacts-new-left-list-inner').html(newHTML);
    });

    $('body').on('click', '.contacts-new-left-list-item-office-link a', function(e) {
        var curItem = contactsData[Number($(this).attr('data-item'))];
        var curOffice = curItem.offices[Number($(this).attr('data-office'))];

        $('.contacts-new-right-title').html(curItem.title);
        $('.contacts-new-right-address').html(curOffice.address);
        $('.contacts-new-right-yandex a').attr('href', 'https://yandex.ru/maps/?rtext=~' + curOffice.coords);
        var newHTML = '';
        if (typeof(curOffice.phones) != 'undefined') {
            newHTML +=  '<div class="contacts-new-right-info-item">' +
                            '<div class="contacts-new-right-info-item-title">' + contactsTexts.phones + '</div>' +
                            '<div class="contacts-new-right-info-item-value">' + curOffice.phones + '</div>' +
                        '</div>';
        }
        if (typeof(curOffice.email) != 'undefined') {
            newHTML +=  '<div class="contacts-new-right-info-item">' +
                            '<div class="contacts-new-right-info-item-title">' + contactsTexts.email + '</div>' +
                            '<div class="contacts-new-right-info-item-value">' + curOffice.email + '</div>' +
                        '</div>';
        }
        if (typeof(curOffice.schedule) != 'undefined') {
            newHTML +=  '<div class="contacts-new-right-info-item">' +
                            '<div class="contacts-new-right-info-item-title">' + contactsTexts.schedule + '</div>' +
                            '<div class="contacts-new-right-info-item-value">' + curOffice.schedule + '</div>' +
                        '</div>';
        }
        if (typeof(curOffice.director) != 'undefined') {
            newHTML +=  '<div class="contacts-new-right-info-item">' +
                            '<div class="contacts-new-right-info-item-title">' + contactsTexts.director + '</div>' +
                            '<div class="contacts-new-right-info-item-value">' + curOffice.director + '</div>' +
                        '</div>';
        }
        $('.contacts-new-right-info').html(newHTML);

        var curIndex = $('.contacts-new-left-list-item-office').index($(this).parent().parent());
        for (var i = 0; i < myPlacemarks.length; i++) {
            var curPlacemark = myPlacemarks[i];
            if (i == curIndex) {
                curPlacemark.options.set('iconImageHref', contactsMapIcon.active);
            } else {
                curPlacemark.options.set('iconImageHref', contactsMapIcon.default);
            }
        }
        myMap.panTo(curOffice.coords);

        $('.contacts-new').addClass('detail-open');
        e.preventDefault();
    });

    $('body').on('click', '.contacts-new-right-close', function(e) {
        $('.contacts-new').removeClass('detail-open');
        e.preventDefault();
    });

    $('.contacts-new-left-mobile-menu a').click(function(e) {
        if (!$('.contacts-new-left').hasClass('open')) {
            $('.contacts-new-left').addClass('open');
        } else {
            if ($('.contacts-new').hasClass('detail-open')) {
                $('.contacts-new').removeClass('detail-open')
            } else {
                $('.contacts-new-left').removeClass('open');
            }
        }
        e.preventDefault();
    });

    $('.contacts-new-left-mobile-close a').click(function(e) {
        $('.contacts-new-left').removeClass('open');
        e.preventDefault();
    });

    $('.contacts-new-left-mobile-view a').click(function(e) {
        $('.contacts-new-left').removeClass('open');
        e.preventDefault();
    });

    $('.contacts-new-right-mobile-close a').click(function(e) {
        $('.contacts-new').removeClass('detail-open');
        e.preventDefault();
    });

    $('.contacts-new-left-btn-search a').click(function(e) {
        if (typeof(ymaps) != 'undefined') {
            ymaps.geolocation.get({
                provider: 'auto',
                mapStateAutoApply: true
            }).then(function (result) {
                myMap.geoObjects.add(result.geoObjects);
            });
        }
        e.preventDefault();
    });

    $('.contacts-new-right-mobile-view a').click(function(e) {
        $('.contacts-new-left').removeClass('open');
        $('.contacts-new').removeClass('detail-open');
        e.preventDefault();
    });

});

function updateContactsMap() {
    myCollections = new ymaps.GeoObjectCollection();

    for (var i = 0; i < contactsData.length; i++) {
        var curItem = contactsData[i];
        for (var j = 0; j < curItem.offices.length; j++) {
            var curOffice = curItem.offices[j];
            var myPlacemark = new ymaps.Placemark(curOffice.coords, {
                hintContent: curItem.title,
                item: i,
                office: j
            }, {
                iconLayout: 'default#image',
                iconImageHref: contactsMapIcon.default,
                iconImageSize: [contactsMapIcon.width, contactsMapIcon.height],
                iconImageOffset: [contactsMapIcon.offsetX, contactsMapIcon.offsetY]
            });

            myPlacemark.events.add('click', function(e) {
                var curPlacemark = e.get('target');

                $('.contacts-new-left-list-item').eq(Number(curPlacemark.properties.get('item'))).find('.contacts-new-left-list-item-office').eq(Number(curPlacemark.properties.get('office'))).find('.contacts-new-left-list-item-office-link a').trigger('click');
            });

            myPlacemarks.push(myPlacemark);
            myMap.geoObjects.add(myPlacemark);
        }
    }
}

$(window).on('load resize', function() {

    $('.order-form-tablet').each(function() {
        if ($(window).width() > 767 && $(window).width() < 1200) {
            var headerHeight = $('.order-form-tablet .order-form-fields h3').height();
            $('.order-form-tablet .order-form-results').css({'margin-top': headerHeight});
        } else {
            $('.order-form-tablet .order-form-results').css({'margin-top': 0});
        }
    });

});

$(document).ready(function() {

    $('.main-alert-close').click(function(e) {
        $('.main-alert').slideUp(function() {
            $('.main-alert').remove();
        });
        e.preventDefault();
    });

    $('.instructions-sections').each(function() {
        var newHTML =   '<ol>';

        $('.instructions-section').each(function() {
            newHTML +=      '<li><a href="#">' + $(this).find('.instructions-section-header').html() + '</a></li>';
        });

        newHTML +=      '</ol>';
        $('.instructions-header-menu-inner').html(newHTML);

        $(window).trigger('resize');
    });

    $('body').on('click', '.instructions-header-menu-inner ol li a', function(e) {
        var curIndex = $('.instructions-header-menu-inner ol li a').index($(this));
        var curBlock = $('.instructions-section').eq(curIndex);
        if (curBlock.length == 1) {
            $('html, body').animate({'scrollTop': curBlock.offset().top - 40});
        }
        e.preventDefault();
    });

    $('.instructions-header-menu-more a').click(function(e) {
        $('.instructions-header-menu').toggleClass('open');
        e.preventDefault();
    });

    $('.instructions-section-top-link').click(function(e) {
        $('html, body').animate({'scrollTop': 0});
        e.preventDefault();
    });

    $('.product-incident-menu-item').click(function() {
        var curItem = $(this);
        if (!curItem.hasClass('active')) {
            $('.product-incident-menu-item.active').removeClass('active');
            curItem.addClass('active');
            var curID = curItem.attr('data-id');
            $('.product-incident-content.active').removeClass('active');
            $('.product-incident-content[data-id="' + curID + '"]').addClass('active');
        }
    });

    $('.product-others-list').slick({
        infinite: false,
        slidesToShow: 2,
        slidesToScroll: 2,
        prevArrow: '<button type="button" class="slick-prev"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-prev"></use></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-next"></use></svg></button>',
        dots: true,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    adaptiveHeight: true
                }
            }
        ]
    });

    $('.product-what-item-title').click(function() {
        $(this).parent().toggleClass('open');
    });

});


$(window).on('load resize', function() {

    $('.instructions-header-menu').each(function() {
        $('.instructions-header-menu').removeClass('with-more open');
        if ($('.instructions-header-menu').height() < $('.instructions-header-menu-inner').height()) {
            $('.instructions-header-menu').addClass('with-more');
        }
    });

});