<?php
/**
 * 최신 시공사례 JSON API
 * GET /proc/latest-posts.php?bo_table=notice&rows=6
 */
include_once dirname(__FILE__) . '/../common.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=60');
header('Access-Control-Allow-Origin: *');

$bo_table = isset($_GET['bo_table']) ? preg_replace('/[^a-z0-9_]/i', '', (string) $_GET['bo_table']) : 'notice';
$rows = isset($_GET['rows']) ? (int) $_GET['rows'] : 6;
$rows = max(1, min(12, $rows));

if ($bo_table === '') {
    $bo_table = 'notice';
}

$helper = G5_PATH . '/components/content-posts-helper.php';
if (is_file($helper)) {
    include_once $helper;
}

$items = array();
$list_url = G5_BBS_URL . '/board.php?bo_table=' . rawurlencode($bo_table);

if (function_exists('g5b_content_fetch_posts') && function_exists('g5b_content_board_available') && g5b_content_board_available($bo_table)) {
    if (!function_exists('get_list_thumbnail')) {
        include_once G5_LIB_PATH . '/thumbnail.lib.php';
    }

    $posts = g5b_content_fetch_posts($bo_table, $rows);
    foreach ($posts as $row) {
        $wr_id = (int) $row['wr_id'];
        $subject = get_text($row['wr_subject']);
        $href = function_exists('g5b_content_post_href')
            ? html_entity_decode(g5b_content_post_href($bo_table, $wr_id), ENT_QUOTES, 'UTF-8')
            : (G5_BBS_URL . '/board.php?bo_table=' . rawurlencode($bo_table) . '&wr_id=' . $wr_id);

        $thumb_src = '';
        $thumb = get_list_thumbnail($bo_table, $wr_id, 640, 480, false, true);
        if (!empty($thumb['src'])) {
            $thumb_src = $thumb['src'];
        } elseif (is_file(G5_PATH . '/img/common/no-image.svg')) {
            $thumb_src = G5_URL . '/img/common/no-image.svg';
        }

        $datetime = !empty($row['wr_datetime']) ? $row['wr_datetime'] : '';
        $items[] = array(
            'id'       => $wr_id,
            'subject'  => $subject,
            'href'     => $href,
            'thumb'    => $thumb_src,
            'date'     => $datetime !== '' ? date('Y-m-d', strtotime($datetime)) : '',
            'category' => isset($row['ca_name']) ? get_text($row['ca_name']) : '',
        );
    }
}

echo json_encode(array(
    'ok'       => true,
    'bo_table' => $bo_table,
    'list_url' => $list_url,
    'count'    => count($items),
    'items'    => $items,
), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
