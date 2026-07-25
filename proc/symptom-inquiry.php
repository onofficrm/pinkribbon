<?php
/**
 * 증상 사진 미니폼 접수
 * POST multipart: phone, area, symptom, photo?, onoff_inquiry_token, website_url(honeypot)
 */
define('ONOFF_INQUIRY_SUBMIT', true);

include_once dirname(__FILE__) . '/../common.php';

if (!defined('_GNUBOARD_')) {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(array('success' => false, 'message' => '접근이 올바르지 않습니다.'));
    exit;
}

if (is_file(G5_PATH . '/_site.config.php')) {
    include_once G5_PATH . '/_site.config.php';
}

function symptom_json($success, $message)
{
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(array(
        'success' => (bool) $success,
        'message' => (string) $message,
    ), JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    symptom_json(false, '잘못된 요청입니다.');
}

if (!empty($_POST['website_url'])) {
    symptom_json(false, '접수할 수 없습니다.');
}

$ua = isset($_SERVER['HTTP_USER_AGENT']) ? trim($_SERVER['HTTP_USER_AGENT']) : '';
if ($ua === '') {
    symptom_json(false, '접수할 수 없습니다.');
}

$token = isset($_POST['onoff_inquiry_token']) ? trim($_POST['onoff_inquiry_token']) : '';
$session_token = get_session('onoff_inquiry_token');
if ($token === '' || $session_token === '' || !hash_equals((string) $session_token, $token)) {
    symptom_json(false, '보안 토큰이 만료되었습니다. 새로고침 후 다시 시도해 주세요.');
}

$ip = isset($_SERVER['REMOTE_ADDR']) ? trim($_SERVER['REMOTE_ADDR']) : '';
$now = defined('G5_SERVER_TIME') ? (int) G5_SERVER_TIME : time();
$rate_key = 'symptom_inquiry_ip_' . md5($ip);
$last = (int) get_session($rate_key);
if ($ip !== '' && $last > 0 && ($now - $last) < 45) {
    symptom_json(false, '잠시 후 다시 시도해 주세요.');
}

$phone = isset($_POST['phone']) ? trim(strip_tags($_POST['phone'])) : '';
$area = isset($_POST['area']) ? trim(strip_tags($_POST['area'])) : '';
$symptom = isset($_POST['symptom']) ? trim(strip_tags($_POST['symptom'])) : '';
$name = isset($_POST['name']) ? trim(strip_tags($_POST['name'])) : '미니폼 문의';

$digits = preg_replace('/[^0-9]/', '', $phone);
if ($digits === '' || strlen($digits) < 9 || strlen($digits) > 15) {
    symptom_json(false, '연락처를 확인해 주세요.');
}
if ($area === '') {
    $area = '강동구';
}
if ($symptom === '') {
    $symptom = '하수구/배수 막힘 상담';
}

$bo_table = function_exists('g5site_cfg') ? g5site_cfg('inquiry_bo_table', 'inquiry') : 'inquiry';
$bo_table = preg_replace('/[^a-z0-9_]/i', '', $bo_table);
if ($bo_table === '') {
    $bo_table = 'inquiry';
}

$board = sql_fetch(" select * from {$g5['board_table']} where bo_table = '" . sql_real_escape_string($bo_table) . "' ");
if (empty($board['bo_table'])) {
    symptom_json(false, '문의 게시판이 준비되지 않았습니다. 전화로 연락 주세요.');
}

$write_table = $g5['write_prefix'] . $bo_table;
$photo_note = '';
$saved_photo = '';

if (!empty($_FILES['photo']['name']) && is_uploaded_file($_FILES['photo']['tmp_name'])) {
    $err = (int) $_FILES['photo']['error'];
    if ($err === UPLOAD_ERR_OK) {
        $size = (int) $_FILES['photo']['size'];
        if ($size > 0 && $size <= 5 * 1024 * 1024) {
            $finfo = @getimagesize($_FILES['photo']['tmp_name']);
            $allowed = array(IMAGETYPE_JPEG, IMAGETYPE_PNG, IMAGETYPE_WEBP, IMAGETYPE_GIF);
            if ($finfo && in_array((int) $finfo[2], $allowed, true)) {
                $ext_map = array(
                    IMAGETYPE_JPEG => 'jpg',
                    IMAGETYPE_PNG  => 'png',
                    IMAGETYPE_WEBP => 'webp',
                    IMAGETYPE_GIF  => 'gif',
                );
                $ext = $ext_map[(int) $finfo[2]];
                $dir = G5_DATA_PATH . '/file/' . $bo_table;
                if (!is_dir($dir)) {
                    @mkdir($dir, G5_DIR_PERMISSION, true);
                }
                if (is_dir($dir) && is_writable($dir)) {
                    $filename = 'symptom_' . date('YmdHis') . '_' . substr(md5(uniqid('', true)), 0, 8) . '.' . $ext;
                    $dest = $dir . '/' . $filename;
                    if (@move_uploaded_file($_FILES['photo']['tmp_name'], $dest)) {
                        @chmod($dest, G5_FILE_PERMISSION);
                        $saved_photo = $filename;
                        $photo_note = G5_DATA_URL . '/file/' . $bo_table . '/' . $filename;
                    }
                }
            } else {
                symptom_json(false, '사진은 JPG/PNG/WEBP만 올려 주세요.');
            }
        } else {
            symptom_json(false, '사진은 5MB 이하로 올려 주세요.');
        }
    }
}

$wr_subject_raw = '[증상사진] ' . $area . ' / ' . $phone;
if (function_exists('cut_str')) {
    $wr_subject_raw = cut_str($wr_subject_raw, 255);
}

$wr_content = "■ 증상 사진 미니폼 접수\n\n";
$wr_content .= "연락처: {$phone}\n";
$wr_content .= "지역: {$area}\n";
$wr_content .= "증상: {$symptom}\n";
if ($photo_note !== '') {
    $wr_content .= "사진: {$photo_note}\n";
} else {
    $wr_content .= "사진: 미첨부\n";
}
$wr_content .= "접수시각: " . G5_TIME_YMDHIS . "\n";

$wr_subject = sql_real_escape_string($wr_subject_raw);
$wr_content_sql = sql_real_escape_string($wr_content);
$wr_name = sql_real_escape_string($name);
$wr_1 = sql_real_escape_string($phone);
$wr_3 = sql_real_escape_string($area);
$wr_4 = sql_real_escape_string($symptom);
$wr_ip = sql_real_escape_string($ip);
$wr_option = !empty($board['bo_use_secret']) ? 'secret' : '';

$sql = " insert into {$write_table}
            set wr_num = (SELECT IFNULL(MIN(wr_num) - 1, -1) FROM {$write_table} as sq),
                 wr_reply = '',
                 wr_comment = 0,
                 ca_name = '',
                 wr_option = '{$wr_option}',
                 wr_subject = '{$wr_subject}',
                 wr_content = '{$wr_content_sql}',
                 wr_seo_title = '',
                 wr_link1 = '',
                 wr_link2 = '',
                 wr_link1_hit = 0,
                 wr_link2_hit = 0,
                 wr_hit = 0,
                 wr_good = 0,
                 wr_nogood = 0,
                 mb_id = '',
                 wr_password = '',
                 wr_name = '{$wr_name}',
                 wr_email = '',
                 wr_homepage = '',
                 wr_datetime = '" . G5_TIME_YMDHIS . "',
                 wr_last = '" . G5_TIME_YMDHIS . "',
                 wr_ip = '{$wr_ip}',
                 wr_1 = '{$wr_1}',
                 wr_2 = '',
                 wr_3 = '{$wr_3}',
                 wr_4 = '{$wr_4}',
                 wr_5 = '{$wr_ip}',
                 wr_6 = '신규',
                 wr_7 = 'symptom-mini',
                 wr_8 = '',
                 wr_9 = '',
                 wr_10 = '' ";

$result = sql_query($sql, false);
if (!$result) {
    symptom_json(false, '접수 중 오류가 발생했습니다. 전화로 연락 주세요.');
}

$wr_id = sql_insert_id();
if ($wr_id && $saved_photo !== '' && function_exists('sql_query')) {
    $bf_source = sql_real_escape_string(isset($_FILES['photo']['name']) ? $_FILES['photo']['name'] : $saved_photo);
    $bf_file = sql_real_escape_string($saved_photo);
    $bf_filesize = isset($_FILES['photo']['size']) ? (int) $_FILES['photo']['size'] : 0;
    $bf_width = 0;
    $bf_height = 0;
    if (!empty($finfo[0])) {
        $bf_width = (int) $finfo[0];
        $bf_height = (int) $finfo[1];
    }
    $bf_type = !empty($finfo[2]) ? (int) $finfo[2] : 0;
    sql_query(" insert into {$g5['board_file_table']}
        set bo_table = '" . sql_real_escape_string($bo_table) . "',
            wr_id = '{$wr_id}',
            bf_no = 0,
            bf_source = '{$bf_source}',
            bf_file = '{$bf_file}',
            bf_download = 0,
            bf_content = '',
            bf_filesize = '{$bf_filesize}',
            bf_width = '{$bf_width}',
            bf_height = '{$bf_height}',
            bf_type = '{$bf_type}',
            bf_datetime = '" . G5_TIME_YMDHIS . "' ", false);
    sql_query(" update {$write_table} set wr_file = 1 where wr_id = '{$wr_id}' ", false);
}

if (function_exists('sql_query')) {
    sql_query(" update {$g5['board_table']} set bo_count_write = bo_count_write + 1 where bo_table = '" . sql_real_escape_string($bo_table) . "' ", false);
}

set_session($rate_key, $now);
set_session('onoff_inquiry_token', bin2hex(random_bytes(16)));

symptom_json(true, '접수되었습니다. 확인 후 빠르게 연락드리겠습니다.');
