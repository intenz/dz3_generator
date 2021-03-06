var loadImages = (function () {

    function init() {
        _modules();
    }

    //подключение модулей
    function _modules() {
        _loadMainImage();
        if ($('#fileuploadSecond').attr('disabled')) {$('#filenameSecond').css('background-color','#dcd2c7');}
    }

    // загрузка основной кртинки
    function _loadMainImage() {

        var
            container = $(".container__img");

        $('#fileuploadFirst').fileupload({
            dataType: 'json',
            add: function (e, data) {

                imgName = data.files[0].name;

                if (!(imgName.match(/\.(jpeg|jpg|png|gif)$/i))) {
                  alert("Попытались загрузить не картинку? Загрузите картинку!"); // показываем предупреждение что не картинка
                  $('#filenameFirst').val('');
                  $('#fileuploadSecond').attr("disabled",true);
                  $('#filenameSecond').css('background-color','#dcd2c7');
                  return;
                } else{
                $('#filenameFirst').val(imgName);
                data.formData = {
                    img: data.files[0]
                }; //отправляем то что нам надо          
                data.submit();}// отправляем данные на сервер

            },
            done: function (e, data) {
                    if ( ! data.result.error) {
                        _createMainImg(data, container);
                    } else {
                        alert(data.result.error);
                    }
            },

        });
    }

    // создание главного изображения
    function _createMainImg(data, container) {
        var
            containerWidth = container.innerWidth(),
            containerHeigth = container.innerHeight(),
            mainImgName = data.result.name,
            mainImgWidth = data.result.width,
            mainImgHeight = data.result.height,
            mainImgURL = data.result.url,
            ratioWidth = mainImgWidth / containerWidth,
            ratioHeight = mainImgHeight / containerHeigth;

            var
                width = mainImgWidth,
                height = mainImgHeight,
                dataRatio = 1;

            if (ratioWidth > 1) { //Если ширина картинки превышает ширину блока

                width = mainImgWidth / ratioWidth; //Фактически присваиваем картинке ширину блока
                height = mainImgHeight / ratioWidth; //Уменьшаем высоту блока пропорционально уменьшенной ширине
                dataRatio = mainImgWidth / width; //Во сколько раз картинка изначально шире блока

                if (height > containerHeigth) {//Если высота картинки все же превышает высоту блока

                    dataRatio = height / containerHeigth;//Узнаем, во сколько раз картинка выше блока
                    width = width / dataRatio;//Уменьшаем ширину в это количество раз
                    height = height / dataRatio;//Уменьшаем высоту в это количество раз, подгоняя ее под высоту блока
                    dataRatio = mainImgWidth / width;//Во сколько раз изначальная ширина картинки превышает конечную
                }

            } else if (ratioHeight > 1) {//Eсли только лишь высота картинки превышает высоту блока, то есть ширина изначально не шире блока

                height = mainImgHeight / ratioHeight;//Подгоняем высоту картинки к высоте блока
                width = mainImgWidth / ratioHeight;//Уменьшаем в это же количество раз пропорционально ширину блока
                dataRatio = mainImgWidth / width;//Во сколько раз уменьшилась ширина картинки по сравнению с первоначальным значением
            }

            //var
                //mainImg = data.result.files[0];
            $('.img__main-uploaded').attr({'src':data.result.url,
                                        'data-srcHeight': mainImgHeight,
                                        'data-srcWidth': mainImgWidth,
                                        'data-ratio': dataRatio,
                                        'data-newWidth': width,
                                        'data-newHeight': height})
                                    .css({
                                        "width": width,
                                        "height": height});
            //Чистка атрибутов ранее загруженного вотемарка                           
            $('.img__watermark-uploaded').attr({'src':'',
                                        'data-srcHeight':'',
                                        'data-srcWidth': '',
                                        'data-ratio': '',
                                        'data-newWidth': '',
                                        'data-newHeight': ''})
                                    .css({
                                        "width": 0,
                                        "height": 0});        


        _loadWaterMark(container,dataRatio,mainImgHeight,mainImgWidth); // активация загрузки водянного знака

    }

    // загрузка водянного знака
    function _loadWaterMark(container,dataRatio,mainImgHeight,mainImgWidth) {
        var mainImg = $(".img__main-uploaded");

        $('#fileuploadSecond').removeAttr("disabled");
        $('#filenameSecond').css('background-color','#f1f1f5');
        
        $('#fileuploadSecond').fileupload({
            dataType: 'json',
            add: function (e, data) {
                var
                    imgName = data.files[0].name;

                if (!(imgName.match(/\.(jpeg|jpg|png|gif)$/i))) {
                  alert("Попытались загрузить не картинку? Загрузите картинку!"); // показываем предупреждение что не картинка
                  $('#filenameSecond').val('');                  
                  return;
                } 
                else{
                  $('#filenameSecond').val(imgName);
                  data.formData = {
                    img: data.files[0]
                  }; //отправляем то что нам надо          
                data.submit();} // отправляем данные на сервер методом submit
            },
            done: function (e, data) {
                if ( ! data.result.error) {
                    _createWaterMark(data, container,dataRatio,mainImgHeight,mainImgWidth);
                } else {
                    alert(data.result.error);
                }
            },
        });

    }

    // создание водянного знака
    function _createWaterMark(data, container, dataRatio,mainImgHeight,mainImgWidth) {
        var
            //mainImgWrapper = $(".main-img-wrapper"),//Класс обертки основного изображения
            mainImg = $(".img__main-uploaded"),//Класс основного изображения
            containerWidth = container.innerWidth(),//Ширина блока
            containerHeigth = container.innerHeight(),//Высота блока
            imgName = data.result.name,
            imgWidth = data.result.width,
            imgHeight = data.result.height;

        if (imgWidth > mainImgWidth || imgHeight > mainImgHeight) {
            alert("Вотемарк больше исходной картинки, загрузите картинку поменьше");
            return;
        }

        $('.img__watermark-uploaded').attr({'src':data.result.url,
                                        'data-srcHeight': imgHeight,
                                        'data-srcWidth': imgWidth,
                                        'data-ratio': dataRatio,//mainImg.data("ratio"),
                                        'data-newWidth': imgWidth / dataRatio, //mainImg.data("ratio"),
                                        'data-newHeight': imgHeight / dataRatio })//mainImg.data("ratio")})
                                    .css({
                                        "width": imgWidth / dataRatio, //mainImg.data("ratio"),
                                        "height": imgHeight / dataRatio }); //mainImg.data("ratio")});
    }

    return {
        init: init
    };

})();

// Вызов модуля
loadImages.init();