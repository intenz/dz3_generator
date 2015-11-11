/*Попытка своей реализации...файл необходимо добавить в js директорию, также необходимо переписать data атрибуты инпутов*/
$(function () {
    'use strict';

    // Initialize the jQuery File Upload widget:
    $('#fileuploadFirst').fileupload({
        dataType: 'json',
        add: function(e,data){
            data.formData = {
            img: data.files[0]
            }; //отправляем то что нам надо          
            data.submit(); // отправляем данные на сервер

        },

        done: function(e,data){
            var img = $('.img__main-uploaded')
                mainImgName = data.result.imgName, //Имя картинки, полученное из up.php
            img.attr('src',"/uploadimages/" + mainImgName);

        }

    });

});