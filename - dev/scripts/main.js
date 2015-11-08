'use strict';

var main = (function (){

    var init = function (){
        eListener();
    };

    var eListener = function (){
        $('.table__link').on('click', _positioning);
        $(document).ready(_defaultPosition);
        $('.controls__input').change(_inputPosition);
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

        var $this = $(this),
            inputX = $('#input-X'),
            inputY = $('#input-Y'),
            watermark = $('.img__wrapp').find('.img__watermark-uploaded'),
            transformValueX = inputX.val() + 'px',
            transformValueY = inputY.val() + 'px';


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
                $( "#amount" ).val( ui.value );
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

$(function() { 
    $(".opacity__button-input-load").click(function() {
        html2canvas($(".container__img"), {
            onrendered: function(canvas) {
                document.body.appendChild(canvas);
                Canvas2Image.saveAsPNG(canvas); 
                document.body.removeChild(canvas);
            }
        });
    });
}); 
