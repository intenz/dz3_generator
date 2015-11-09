/*
 * jQuery File Upload Plugin JS Example
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* global $, window */

$(function () {
    'use strict';

    // Initialize the jQuery File Upload widget:
    $('#fileupload').fileupload({
        url: 'uploadserver/php/'
        add: function(e,data){

            console.log('add');
            data.submit();

        },
        done: function(e,data){
            var img = $('<img></img>'),
                uploadImg=data.result.files[0]; //Поместим элемент массива, который находится о объекте data, возвращаемого сервером
            $('.upload-title').text(uploadImg.name);
            img.attr('src',uploadImg.url);
            img.appendTo('.upload-img');

        progressall: function (e, data) {
            function progress(){
                var progress = parseInt(data.loaded/data.toltal * 100, 10);
                $('#progress .bar').css(
                'width',
                progress + '%'
             );
            }
            setTimeout(progress,2000);
        }
    });

});
