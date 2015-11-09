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

// $(function () {
//     'use strict';

//     // Для первого инпута
//     $('#fileuploadFirst').fileupload({
//         url: 'uploadserver/php/'
//         add: function(e,data){

//             console.log('add');
//             data.submit();

//         }
//         done: function(e, data){
//             var img = $('<img></img>'),
//                 uploadImg=data.result.files[0]; //Поместим элемент массива, который находится о объекте data, возвращаемого сервером
//             $('.upload-title').text(uploadImg.name);
//             img.attr('src',uploadImg.url);
//             img.appendTo('.img__main-uploaded');
//     });

// });
//     // Для второго инпута
//         $('#fileuploadSecond').fileupload({
//         url: 'uploadserver/php/'
//         add: function(e,data){

//             console.log('add');
//             data.submit();

//         }
//         done: function(e,data){
//             var img = $('<img></img>'),
//                 uploadImg=data.result.files[0]; //Поместим элемент массива, который находится о объекте data, возвращаемого сервером
//             $('.upload-title').text(uploadImg.name);
//             img.attr('src',uploadImg.url);
//             img.appendTo('.img__watermark-uploaded');

//     });

// });
// }
