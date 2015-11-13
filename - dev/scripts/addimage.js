var myModule = (function(){

//Инициализирует наш модуль
  var init = function(){  
    _setUpListeners();
    //то, что должно произойти сразу
    if ($('#fileuploadSecond').attr('disabled')) {$('#filenameSecond').css('background-color','#dcd2c7');}
    };

//Прослушивает события
  var _setUpListeners=function(){
    $('#fileuploadFirst').on('change', _changefileUploadFirst); //добавление файла в первый input
    $('#fileuploadSecond').on('change', _changefileUploadSecond); //добавление файла во второй input
    };

//Изменяет файл аплоад
  var _changefileUploadFirst = function() {
    var input = $(this); //инпут type="file"
        filename = input.val(); //имя загруженного элемента
        console.log(filename);
        filename = getNameFromPath(filename); //Передаем функции значение input

        // Получаем название файла из пути
          function getNameFromPath () {
              return filename.replace(/\\/g, '/').replace(/.*\//, ''); //Получаем название файла из пути
          }

        $('#filenameFirst').val(filename);
    if (filename) {$('#fileuploadSecond').removeAttr('disabled'); $('#filenameSecond').css('background-color','#f1f1f5');}//Удаляем атрибут disabled у второго инпута
  };

  var _changefileUploadSecond = function() {
    
    var input = $(this), //инпут type="file"
        filename = input.val(); //имя загруженного элемента
        filename = getNameFromPath(filename); //Передаем функции значение input

        // Получаем название файла из пути
          function getNameFromPath () {
              return filename.replace(/\\/g, '/').replace(/.*\//, ''); //Получаем название файла из пути
          }

        $('#filenameSecond').val(filename);
  };

//Возвращаем объект(публичные методы)
  return {
    init:init,
  };
})();
myModule.init();