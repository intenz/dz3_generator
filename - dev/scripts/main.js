'use strict';

var main = (function (){

    var init = function (){
        eListener();
    };

    var eListener = function (){
        $('.table__link').on('click', _positioning);
        $(document).ready(_position);
        $(document).ready(_dragWatermark);
        $(document).ready(_social);
        $(document).ready(_opacity);
        $(document).ready(_changeLang);
    };

    var _positioning = function (e) {
        e.preventDefault();
        var $this = $(this),
            data = $this.data('position'),
            imgWrap = $('.img__wrapp'),
            watermark = imgWrap.find('.img__watermark-uploaded'),
            mainImage = imgWrap.find('.img__main-uploaded'),
            cell = $this.closest('.table__cell'),
            otherCells = $('.positioning__table').find('.table__cell'),
            styleReset = watermark.css({
                'left': '',
                'top': ''
            }),
            inputX = $('#input-X'),
            inputY = $('#input-Y'),
            zero = 0,
            leftCenter = mainImage.width()/2 - watermark.width()/2,
            LeftMax = mainImage.width() - watermark.width(),
            topCenter = mainImage.height()/2 - watermark.height()/2,
            topMax = mainImage.height() - watermark.height(),
            left = function (value) {
                watermark.css('left', value + 'px');
            },
            top = function(value) {
                watermark.css('top', value + 'px');
            };
            
        if(watermark.length) {

            switch (data) {
                case 'position-1':
                    styleReset,
                    otherCells.removeClass('active'),
                    cell.addClass('active'),
                    left(zero);
                    top(zero);
                    inputX.val(zero);
                    inputY.val(zero);
                    break;
                case 'position-2':
                    styleReset,
                    otherCells.removeClass('active'),
                    cell.addClass('active'),
                    left(leftCenter);
                    top(zero);
                    inputX.val(leftCenter);
                    inputY.val(zero);
                    break;
                case 'position-3':
                    styleReset,
                    otherCells.removeClass('active'),
                    cell.addClass('active'),
                    left(LeftMax);
                    top(zero);
                    inputX.val(LeftMax);
                    inputY.val(zero);
                    break;
                case 'position-4':
                    styleReset,
                    otherCells.removeClass('active'),
                    cell.addClass('active'),
                    left(zero);
                    top(topCenter);
                    inputX.val(zero);
                    inputY.val(topCenter);
                    break;
                case 'position-5':
                    styleReset,
                    otherCells.removeClass('active'),
                    cell.addClass('active'),
                    left(leftCenter);
                    top(topCenter);
                    inputX.val(leftCenter);
                    inputY.val(topCenter);
                    break;
                case 'position-6':
                    styleReset,
                    otherCells.removeClass('active'),
                    cell.addClass('active'),
                    left(LeftMax);
                    top(topCenter);
                    inputX.val(LeftMax);
                    inputY.val(topCenter);
                    break;
                case 'position-7':
                    styleReset,
                    otherCells.removeClass('active'),
                    cell.addClass('active'),
                    left(zero);
                    top(topMax);
                    inputX.val(zero);
                    inputY.val(topMax);
                    break;
                case 'position-8':
                    styleReset,
                    otherCells.removeClass('active'),
                    cell.addClass('active'),
                    left(leftCenter);
                    top(topMax);
                    inputX.val(leftCenter);
                    inputY.val(topMax);
                    break;
                case 'position-9':
                    styleReset,
                    otherCells.removeClass('active'),
                    cell.addClass('active'),
                    left(LeftMax);
                    top(topMax);
                    inputX.val(LeftMax);
                    inputY.val(topMax);
                    break;
            };
        };
    };

    var _position = function () {
        var imgWrap = $('.img__wrapp'),
            watermark = imgWrap.find('.img__watermark-uploaded');

        watermark.on('load', function() {
            
            var watermark = imgWrap.find('.img__watermark-uploaded'),
                mainImage = imgWrap.find('.img__main-uploaded'),
                leftCenter = mainImage.width()/2 - watermark.width()/2,
                topCenter = mainImage.height()/2 - watermark.height()/2, 
                inputX = $('#input-X'),
                inputY = $('#input-Y'),
                left = function (value) {
                watermark.css('left', value + 'px');
                },
                top = function(value) {
                    watermark.css('top', value + 'px');
                },
                defaultPosition = function () {
                    left(leftCenter);
                    top(topCenter);
                    inputX.val(leftCenter);
                    inputY.val(topCenter);
                    $('.table__cell:eq(4)').addClass('active');
                },
                LeftMax = mainImage.width() - watermark.width(),
                topMax = mainImage.height() - watermark.height(),
                inputX = $('#input-X').spinner({
                    min: 0,
                    max: LeftMax
                }),
                inputY = $('#input-Y').spinner({
                    min: 0,
                    max: topMax
                });

            defaultPosition();

            $('.opacity__button-input-res').click(function() {
                defaultPosition();
                $('.controls__input').removeAttr('aria-valuenow');
                $('#slider').slider('value', 100);
                $("#draggable").css({
                    opacity: 1
                });
            });

            inputX.on('spin', function(event, ui) {
                var currentVal = ui.value;

                watermark.css({
                    'left': currentVal + 'px'
                });   
            });

            inputY.on('spin', function(event, ui) {
                var currentVal = ui.value;

                watermark.css({
                    'top': currentVal + 'px'
                });
            });
        });
    };

    var _dragWatermark = function(){
        var inputX = $('#input-X'),
            inputY = $('#input-Y'),
            imgWrap = $('.img__wrapp'),
            watermark = imgWrap.find('.img__watermark-uploaded'),
            position = watermark.position();

        if(watermark.length){
            $('#draggable').draggable({
                cursor: "move",
                containment: '.img__main',
                drag: function(event, ui) {
                    inputX.val(ui.position.left);
                    inputY.val(ui.position.top);
                }
            });
        };
    };

    var _social = function (){

        $('.sidebar-social__like').hover(
            function(){
              $('.sidebar-social__list').stop(true, true).toggle(600);
            },
            function(){
                return false;
            });    
    };

    var _opacity = function () {

        $( "#slider" ).slider({
            orientation: "horizontal",
            range: "min",
            min: 0,
            max: 100,
            value: 100,
            slide: function( event, ui ) {
                var opacity_val = (ui.value)/100;

                $("#draggable").css({
                    opacity: opacity_val
                })
            }
        });

        $("#amount").val( $("#slider").slider("value"));

        $(".opacity__button-input-load").click(function() {
            html2canvas($(".img__wrapp"), {
                onrendered: function(canvas) {
                    document.body.appendChild(canvas);
                    Canvas2Image.saveAsPNG(canvas); 
                    document.body.removeChild(canvas);
                }
            });
        });
    };

    var _changeLang = function () {
        var cookies = {
            getCookie: function(name) {
                if (!name) return false;
                return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(name).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
            },
            setCookie: function(name, value, days) {
                var expires;

                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                    expires = "; expires=" + date.toGMTString();
                } else {
                    expires = "";
                }
                document.cookie = name + "=" + value + expires + "; path=/";
            }
        },
        currentLang = cookies.getCookie('lang'),
        langSelectors = {
            en: '.lang-en',
            ru: '.lang-ru'
        };

        if (currentLang == 'en') {
            $(langSelectors.en).show();
            $(langSelectors.ru).hide();
        } else {
            $(langSelectors.en).hide();
            $(langSelectors.ru).show();
        }

        $('.sidebar-lang__eng a').on('click', function() {
            cookies.setCookie('lang', 'en', 1);
            $(langSelectors.en).show();
            $(langSelectors.ru).hide();
            $('.sidebar-lang__rus').removeClass('active-lang');
            $('.sidebar-lang__eng').addClass('active-lang');
        });

        $('.sidebar-lang__rus a').on('click', function() {
            cookies.setCookie('lang', 'ru', 1);
            $(langSelectors.en).hide();
            $(langSelectors.ru).show();
            $('.sidebar-lang__eng').removeClass('active-lang');
            $('.sidebar-lang__rus').addClass('active-lang');
        });

        $('.sidebar-lang__rus').addClass('active-lang'); // default
    };

    return {
        init: init
    };

})();

main.init();