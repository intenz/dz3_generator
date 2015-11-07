var myModule = (function(){

//Инициализирует наш модуль
	var init = function(){
		_setUpListeners();
		//то, что должно произойти сразу
		};

//Прослушивает события
	var _setUpListeners=function(){
		$('#fileuploadFirst').on('change', _changefileUploadFirst); //добавление файла в первый input
		$('#fileuploadSecond').on('change', _changefileUploadSecond); //добавление файла во второй input
		};

//Изменяет файл аплоад
  var _changefileUploadFirst = function() {
    var input = $(this), //инпут type="file"
        filename = input.val(); //имя загруженного элемента
        filename = getNameFromPath(filename); //Передаем функции значение input

        // Получаем название файла из пути
          function getNameFromPath () {
              return filename.replace(/\\/g, '/').replace(/.*\//, ''); //Получаем название файла из пути
          }

      	$('#filenameFirst').val(filename);
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