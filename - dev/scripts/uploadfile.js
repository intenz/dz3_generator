$(function () {
    'use strict';

    // Initialize the jQuery File Upload widget:
    $('#fileuploadFirst').fileupload({

        url: 'server/php/',

        add: function(e,data){
            data.submit();

        },

        done: function(e,data){
            var img = $('.img__main-uploaded'),
                uploadImg=data.result.files[0];

            img.attr('src',uploadImg.url);
            //img.appendTo('.img__main-uploaded');

        }

    });

    $('#fileuploadSecond').fileupload({

        url: 'server/php/',

        add: function(e,data){
            data.submit();

        },

        done: function(e,data){
            var img = $('.img__watermark-uploaded'),
                uploadImg=data.result.files[0];

            img.attr('src',uploadImg.url);

        }

    });

});