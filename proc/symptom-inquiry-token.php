<?php
/**
 * 증상 사진 미니폼용 CSRF 토큰 발급
 * GET /proc/symptom-inquiry-token.php
 */
include_once dirname(__FILE__) . '/../common.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

if (!defined('_GNUBOARD_')) {
    echo json_encode(array('ok' => false, 'token' => '', 'message' => '접근이 올바르지 않습니다.'), JSON_UNESCAPED_UNICODE);
    exit;
}

$token = get_session('onoff_inquiry_token');
if ($token === '' || $token === null) {
    $token = bin2hex(random_bytes(16));
    set_session('onoff_inquiry_token', $token);
}

echo json_encode(array(
    'ok'    => true,
    'token' => $token,
), JSON_UNESCAPED_UNICODE);
