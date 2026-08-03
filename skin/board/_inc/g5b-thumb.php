<?php
if (!defined('_GNUBOARD_')) exit;

include_once(G5_SKIN_PATH.'/board/_inc/g5b-fallback.php');

/**
 * 본문 첫 이미지 URL (첨부·로컬 에디터 이미지 없을 때). 외부 URL 포함.
 * iCRM 블로그 수집글처럼 icrm.co.kr 이미지를 쓰는 글을 목록 썸네일로 노출한다.
 */
function g5b_list_content_image_src($bo_table, $wr_id)
{
    if (!function_exists('get_thumbnail_find_cache') || !function_exists('get_editor_image')) {
        return '';
    }

    $write = get_thumbnail_find_cache($bo_table, $wr_id, 'content');
    if (empty($write['wr_content'])) {
        return '';
    }

    $matches = get_editor_image($write['wr_content'], false);
    if (empty($matches[1]) || !is_array($matches[1])) {
        return '';
    }

    foreach ($matches[1] as $raw) {
        $src = html_entity_decode(trim($raw), ENT_QUOTES, 'UTF-8');
        if ($src === '' || stripos($src, 'data:') === 0) {
            continue;
        }

        if (strpos($src, '//') === 0) {
            $src = 'https:' . $src;
        }

        if (!preg_match('#^https?://#i', $src)) {
            continue;
        }

        // 트래킹·캡차용 더미 이미지 제외
        if (preg_match('/(?:captcha|dot\.gif|blank\.(?:gif|png|jpg)|spacer\.(?:gif|png)|1x1\.(?:gif|png))/i', $src)) {
            continue;
        }

        return $src;
    }

    return '';
}

/**
 * 목록 썸네일 HTML (첨부 → 본문 첫 이미지(로컬·외부) → /img/common/no-image.svg → empty 박스)
 */
function g5b_list_thumb_html($bo_table, $wr_id, $width, $height, $subject = '', $is_secret = false, $is_notice = false, $is_crop = true)
{
    if (!function_exists('get_list_thumbnail')) {
        include_once(G5_LIB_PATH.'/thumbnail.lib.php');
    }

    if ($is_secret) {
        return '<span class="board-thumb board-thumb--empty board-thumb--secret" title="비밀글">'
            .'<i class="fa fa-lock" aria-hidden="true"></i><span class="sound_only">비밀글</span></span>';
    }

    if ($is_notice) {
        $thumb = get_list_thumbnail($bo_table, $wr_id, $width, $height, false, $is_crop);
        if (empty($thumb['src']) && g5b_list_content_image_src($bo_table, $wr_id) === '') {
            return '<span class="board-thumb board-thumb--notice"><span class="notice_icon board-badge board-badge--notice">공지</span></span>';
        }
    }

    $thumb = get_list_thumbnail($bo_table, $wr_id, $width, $height, false, $is_crop);
    $alt = isset($thumb['alt']) && $thumb['alt'] ? get_text($thumb['alt']) : get_text(strip_tags($subject));

    if (!empty($thumb['src'])) {
        $src = $thumb['src'];
        $tag = '<img src="'.htmlspecialchars($src, ENT_QUOTES).'" alt="'.htmlspecialchars($alt, ENT_QUOTES).'" class="board-thumb__img" loading="lazy" decoding="async">';
        return '<span class="board-thumb board-thumb--has-img">'.$tag.'</span>';
    }

    $content_src = g5b_list_content_image_src($bo_table, $wr_id);
    if ($content_src !== '') {
        $tag = '<img src="'.htmlspecialchars($content_src, ENT_QUOTES).'" alt="'.htmlspecialchars($alt, ENT_QUOTES).'" class="board-thumb__img" loading="lazy" decoding="async" referrerpolicy="no-referrer">';
        return '<span class="board-thumb board-thumb--has-img board-thumb--remote">'.$tag.'</span>';
    }

    if (g5b_fallback_file_exists('image')) {
        return '<span class="board-thumb board-thumb--fallback">'
            .g5b_fallback_img_html('image', 'board-thumb__img board-thumb__img--placeholder')
            .'</span>';
    }

    return '<span class="board-thumb board-thumb--empty" aria-hidden="true"></span>';
}
