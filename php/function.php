<?php

/**
 * Возвращает json
 * @param mix $data
 */
function send_json($data)
{
    header('Content-type: application/json; charset=utf-8');
    die(json_encode($data));
}

function send_with_error($data, $error)
{
    $data['error'] = $error;
    send_json($data);//Отправляем ошибку на клиент
}

/**
 * Создает папку если её нет
 * @param string $path
 * @param int $mode - http://php.net/manual/ru/function.chmod.php
 */
function create_dir_if_not_exists($path, $mode = 0755)
{
    if( ! file_exists($path))
    {
        mkdir($path, $mode);
    }
}

/**
 * Проверяет является ли файл - картинкой
 * @param string $path
 * @return bool
 */
function is_image($path)
{
    $exts = array('jpeg', 'jpg', 'png', 'gif');
    return in_array(get_ext($path), $exts);
}

/**
 * Получить расширение
 * @param string $path
 * @return string
 */
function get_ext($path)
{
    return strtolower(pathinfo($path, PATHINFO_EXTENSION));//Получаем расширение файла
}

/**
 * Получить название файла
 * @param string $path
 * @param string $prefix
 * @return string
 */
function generate_name($file, $path, $prefix = '')
{
    $name = $prefix . md5(uniqid()) .'-'. time() .'.'. get_ext($file);

    // Если есть файл с таким именем генерируем снова
    while (file_exists($path . $name))//Если файл с таким именем уже существует
    {
        $name = generate_name($name, $path, $prefix);//Добавляет новый уникальный uniqid и префикс
    }

    return $name;
}