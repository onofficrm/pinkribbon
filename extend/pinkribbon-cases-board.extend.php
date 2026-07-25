<?php
/**
 * notice 게시판 → 시공사례 갤러리 스킨/메뉴 자동 구성
 */
if (!defined('_GNUBOARD_')) {
    exit;
}

if (!function_exists('pinkribbon_cases_board_id')) {
    function pinkribbon_cases_board_id()
    {
        return 'notice';
    }
}

if (!function_exists('pinkribbon_cases_ensure_board')) {
    function pinkribbon_cases_ensure_board()
    {
        global $g5;

        static $done = false;
        if ($done) {
            return;
        }
        $done = true;

        if (empty($g5['board_table']) || !function_exists('sql_fetch')) {
            return;
        }

        $flag = G5_DATA_PATH . '/pinkribbon-cases-board.flag';
        if (is_file($flag)) {
            $mtime = @filemtime($flag);
            // 하루 1회 재확인 (스킨 변경 반영)
            if ($mtime && (time() - $mtime) < 86400) {
                return;
            }
        }

        $bo_table = pinkribbon_cases_board_id();
        $bo = sql_fetch(" select bo_table, bo_subject, bo_skin, bo_mobile_skin from {$g5['board_table']} where bo_table = '" . sql_real_escape_string($bo_table) . "' ");
        if (empty($bo['bo_table'])) {
            return;
        }

        $need_update = false;
        $sets = array();

        if ($bo['bo_subject'] !== '시공사례') {
            $sets[] = " bo_subject = '시공사례' ";
            $sets[] = " bo_mobile_subject = '시공사례' ";
            $need_update = true;
        }
        if ($bo['bo_skin'] !== 'cases-gallery') {
            $sets[] = " bo_skin = 'cases-gallery' ";
            $need_update = true;
        }
        if ($bo['bo_mobile_skin'] !== 'cases-gallery') {
            $sets[] = " bo_mobile_skin = 'cases-gallery' ";
            $need_update = true;
        }

        $sets[] = " bo_list_level = '1' ";
        $sets[] = " bo_read_level = '1' ";
        $sets[] = " bo_write_level = '10' ";
        $sets[] = " bo_upload_level = '10' ";
        $sets[] = " bo_use_list_file = '1' ";
        $sets[] = " bo_gallery_width = '640' ";
        $sets[] = " bo_gallery_height = '480' ";
        $sets[] = " bo_image_width = '900' ";
        $sets[] = " bo_upload_count = '10' ";
        $sets[] = " bo_use_category = '1' ";
        $sets[] = " bo_category_list = '싱크대|변기|배수구|하수구|역류|기타' ";
        $need_update = true;

        if ($need_update && $sets) {
            sql_query(" update {$g5['board_table']} set " . implode(', ', $sets) . " where bo_table = '" . sql_real_escape_string($bo_table) . "' ", false);
        }

        pinkribbon_cases_ensure_menu($bo_table);

        if (is_dir(G5_DATA_PATH)) {
            @file_put_contents($flag, date('c') . "\n");
        }
    }
}

if (!function_exists('pinkribbon_cases_ensure_menu')) {
    function pinkribbon_cases_ensure_menu($bo_table)
    {
        global $g5;

        if (empty($g5['menu_table'])) {
            return;
        }

        $link = G5_BBS_URL . '/board.php?bo_table=' . rawurlencode($bo_table);
        $link_esc = sql_real_escape_string($link);
        $exists = sql_fetch(" select me_id from {$g5['menu_table']} where me_link like '%bo_table=" . sql_real_escape_string($bo_table) . "%' limit 1 ");
        if (!empty($exists['me_id'])) {
            sql_query(" update {$g5['menu_table']}
                set me_name = '시공사례',
                    me_link = '{$link_esc}',
                    me_use = '1',
                    me_mobile_use = '1'
                where me_id = '" . (int) $exists['me_id'] . "' ", false);
            return;
        }

        $row = sql_fetch(" select MAX(SUBSTRING(me_code,1,2)) as max_me_code from {$g5['menu_table']} where LENGTH(me_code) = '2' ");
        $me_code = '10';
        if (!empty($row['max_me_code'])) {
            $me_code = (int) base_convert($row['max_me_code'], 36, 10);
            $me_code += 36;
            $me_code = base_convert((string) $me_code, 10, 36);
        }

        $order_row = sql_fetch(" select MAX(me_order) as max_order from {$g5['menu_table']} ");
        $me_order = isset($order_row['max_order']) ? ((int) $order_row['max_order'] + 10) : 10;

        sql_query(" insert into {$g5['menu_table']}
            set me_code = '" . sql_real_escape_string($me_code) . "',
                me_name = '시공사례',
                me_link = '{$link_esc}',
                me_target = 'self',
                me_order = '" . (int) $me_order . "',
                me_use = '1',
                me_mobile_use = '1' ", false);
    }
}

pinkribbon_cases_ensure_board();
