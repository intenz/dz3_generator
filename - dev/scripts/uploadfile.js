$(function () {
    'use strict';

    // Initialize the jQuery File Upload widget:
    $('#fileuploadFirst').fileupload({

        url: 'server/php/',
        dataType: 'json',
        add: function(e,data){
            data.submit();

        },

        done: function(e,data){
            /*$.each(data.result.files, function (index, file) {
                var img = $('.img__main-uploaded'),
                img.attr('src',file.url);
            });*/
            
            var img = $('.img__main-uploaded'),
                uploadImg=data.result.files[0];
            img.attr('src',uploadImg.url);

            //img.appendTo('.img__main-uploaded');

        }

    });

    $('#fileuploadSecond').fileupload({

        url: 'server/php/',
        dataType: 'json',
        add: function(e,data){
            data.submit();

        },

        done: function(e,data){
            var img = $('.img__watermark-uploaded'),
                uploadImg=data.result.files[0];
            //img.attr('src', data.result.files[0]['url']);
            img.attr('src',uploadImg.url);

        }

    });

});