<?php
require_once __DIR__ . '/function.php'; //Подключаем function.php лишь однажды

// URL для загрузки картинок
define('UPLOAD_URL', '/uploads/');
// PATH для загрузки картинок
define('UPLOAD_PATH', dirname(__DIR__) . UPLOAD_URL);//Добавляем к имени текущей директории значение переменной UPLOAD_URL
// Максимальный размер картинки (1024 * 1024 * 2)
define('MAX_IMG_SIZE', 2097152);//Картинка максимум 2mb

$answer = array(
    'name'   => '',
    'url'   => '',
    'type'   => '',
    'size'   => 0,
    'width'  => 0,
    'height' => 0,
    'error'  => null
);

// Запрос должен быть POST
if ($_SERVER['REQUEST_METHOD'] == "POST")
{
    $img = empty($_FILES['img']) ? null : $_FILES['img'];//Существуют ли файлы

    if ($img)//Если не null, то есть файлы существуют
    {
        $img_name = $img['name'];

        // Создаем папку если её нет
        create_dir_if_not_exists(UPLOAD_PATH, 0755);//папка uploads

        $path = UPLOAD_PATH . $img['name'];//полный путь к текущей картинке

        // Если не картинка отправляем ошибку
        if ( ! is_image($path))
        {
            send_with_error($answer, 'Это не картинка');//answer есть массив, описанный выше..а "Это не картинка" есть текст ошибки
        }

        // Если размер больше допустимого - отправляем ошибку
        if (MAX_IMG_SIZE < $img['size'])
        {
            send_with_error($answer, 'Размер слишком большой');
        }

        // Если произошла ошибка - отправляем её
        if ($file['error'] != UPLOAD_ERR_OK) //Если не равно UPLOAD_ERR_OK (результат отсутствия ошибок)
        {
            send_with_error($answer, 'Произошла ошибка');
        }

        // Генерируем новое имя файла и новый путь, чтобы не затереть имеющийся с таким же названием
        $new_name = generate_name($img['name'], UPLOAD_PATH);//Создает новое имя для уже имеющейся картинки
        $new_path = UPLOAD_PATH . $new_name;//Прописываем полный путь к картинке с новым именем

        if (move_uploaded_file($img['tmp_name'], $new_path)) //Перемещаем наш файл с временным именем tmp_name в директорию $new_path
        {
            $img_data = getimagesize($new_path);

            $answer['name'] = $new_name;
            $answer['url'] = UPLOAD_URL . $new_name;
            $answer['type'] = $img['type'];
            $answer['size'] = $img['size'];
            $answer['width'] = $img_data[0];
            $answer['height'] = $img_data[1];

            send_json($answer);
        }

        send_with_error($answer, 'Возникла ошибка при загрузке файла на сервер');
    }

    send_with_error($answer, 'Не загрузили файл');
}

send_with_error($answer, 'У вас нет доступа на данную страницу');