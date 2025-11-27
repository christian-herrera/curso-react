<?php


require_once __DIR__ . '/../../config.php';

class Debug {
    public static function addLine(string $line) {
        if (!DEBUG_ENABLE) return;
        file_put_contents(DEBUG_PATH, $line, FILE_APPEND | LOCK_EX);
    }


    public static function log(string $message) {
        self::addLine("[" . date("Y-m-d H:i:s") . "][DEBUG] " . $message . PHP_EOL);
    }


    public static function error(string $message) {
        self::addLine("[" . date("Y-m-d H:i:s") . "][ERROR] " . $message . PHP_EOL);
    }
}
