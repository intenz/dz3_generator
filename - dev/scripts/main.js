'use strict';

var main = (function (){

    var init = function (){
        eListener();
    };

    var eListener = function (){
        $('.table__link').on('click', _positioning);
        $(document).ready(_defaultPosition);
        $(document).ready(_inputPosition);
    };

    var _positioning = function (e) {
        e.preventDefault();

        var $this = $(this),
            data = $this.data('position'),
            watermark = $('.img__wrapp').find('.img__watermark-uploaded'),
            cell = $this.closest('.table__cell'),
            otherCells = $('.positioning__table').find('.table__cell'),
            styleReset = watermark.css({
                'top': '',
                'left': '',
                'right': '',
                'bottom': '',
                'text-align': '',
                'transform': '',
                'margin': ''
            });
            
        if(watermark.length) {

            switch (data) {
                case 'position-1':
                    styleReset,
                    otherCells.removeClass('active'),
                    cell.addClass('active'),
                    watermark.css({
                        'left': '0',
                        'top': '0'
                    });
                    break;
                case 'position-2':
                    styleReset,
                    otherCells.removeClass('active'),
                    cell.addClass('active'),
                    watermark.css({
                        'top': '0',
                        'left': '0',
                        'right': '0',
                        'margin': 'auto'
                    });
                    break;
                case 'position-3':
                    styleReset,
                    otherCells.removeClass('active'),
                    cell.addClass('active'),
                    watermark.css({
                        'right': '0',
                        'top': '0'
                    });
                    break;
                case 'position-4':
                    styleReset,
                    otherCells.removeClass('active'),
                    cell.addClass('active'),
                    watermark.css({
                        'top': '50%',
                        'left': '0',
                        'bottom': '0',
                        'transform': 'translateY(-50%)'
                    });
                    break;
                case 'position-5':
                    styleReset,
                    otherCells.removeClass('active'),
                    cell.addClass('active'),
                    watermark.css({
                        'top': '0',
                        'left': '0',
                        'right': '0',
                        'bottom': '0',
                        'margin': 'auto'
                    });
                    break;
                case 'position-6':
                    styleReset,
                    otherCells.removeClass('active'),
                    cell.addClass('active'),
                    watermark.css({
                        'top': '50%',
                        'right': '0',
                        'bottom': '0',
                        'transform': 'translateY(-50%)'
                    });
                    break;
                case 'position-7':
                    styleReset,
                    otherCells.removeClass('active'),
                    cell.addClass('active'),
                    watermark.css({
                        'left': '0',
                        'bottom': '0'
                    });
                    break;
                case 'position-8':
                    styleReset,
                    otherCells.removeClass('active'),
                    cell.addClass('active'),
                    watermark.css({
                        'bottom': '0',
                        'left': '0',
                        'right': '0',
                        'margin': 'auto'
                    });
                    break;
                case 'position-9':
                    styleReset,
                    otherCells.removeClass('active'),
                    cell.addClass('active'),
                    watermark.css({
                        'right': '0',
                        'bottom': '0'
                    });
                    break;
            }
        }
    };

    var _defaultPosition = function () {

        if('.img__main-uploaded'.length & '.img__watermark-uploaded'.length) {
            var watermark = $('.img__wrapp').find('.img__watermark-uploaded'), 
                defaultState = watermark.css({
                        'top': '0',
                        'left': '0',
                        'right': '0',
                        'bottom': '0',
                        'margin': 'auto'
                });

            $('.table__cell:eq(4)').addClass('active');
            defaultState;
        };
    };

    var _inputPosition = function () {

        var inputX = $('#input-X').spinner(),
            inputY = $('#input-Y').spinner(),
            watermark = $('.img__wrapp').find('.img__watermark-uploaded');

        if(watermark.length){
            inputX.on('spin', function(event, ui) {
                var currentVal = ui.value;

                watermark.css({
                    'left': currentVal + 'px'
                });
            });

            inputY.on('spin', function(event, ui) {
                var currentVal = ui.value;

                watermark.css({
                    'bottom': currentVal + 'px'
                });
            });
        }
    };

    return {
        init: init
    };

})();

main.init();


$(document).ready(function(){
    $(function() {
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
        $( "#amount" ).val( $( "#slider" ).slider( "value" ) );
    });

});


$(document).ready(function(){

    $('.sidebar-social__like').hover(
        function(){
          $('.sidebar-social__list').toggle(600);
        },
        function(){
            return false;
        });
});
$(document).ready(function(){

    $('#draggable').draggable({
        cursor: "move"

    });
});

$(function() { 
    $(".opacity__button-input-load").click(function() {
        html2canvas($(".img__wrapp"), {
            onrendered: function(canvas) {
                document.body.appendChild(canvas);
                Canvas2Image.saveAsPNG(canvas); 
                document.body.removeChild(canvas);
            }
        });
    });
}); 

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
};

$(document).ready(function() {
    var currentLang = cookies.getCookie('lang');
    var langSelectors = {
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
});

$(document).ready(function() {
    $('.opacity__button-input-res').click(function() {
        $('.img__watermark-uploaded').css({
                        'top': '0',
                        'left': '0',
                        'right': '0',
                        'bottom': '0',
                        'margin': 'auto'
                });
        $('.table__cell').removeClass('active');
        $('[data-position="position-5"]').parent().addClass('active');
        $('.controls__input').removeAttr('aria-valuenow');
        $('#slider').slider('value', 100);
        $("#draggable").css({
            opacity: 1
        });
        $('.controls__input').setAttribute('value', ' ');

        console.log('yohoho');
    });
});