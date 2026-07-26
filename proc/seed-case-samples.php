<?php
/**
 * 시공사례(notice) 샘플 글 시드 — 관리자 로그인 후 1회 실행
 *
 * 사용: /proc/seed-case-samples.php?key=wonjin-cases-seed
 * 실제 사진 첨부는 관리자 글쓰기에서 추가로 등록하세요.
 */
include_once dirname(__FILE__) . '/../common.php';

if (!defined('_GNUBOARD_')) {
    exit;
}

$expected_key = 'wonjin-cases-seed';
$given_key = isset($_GET['key']) ? (string) $_GET['key'] : '';
if ($given_key !== $expected_key) {
    http_response_code(403);
    exit('권한이 없습니다. (key 필요)');
}

if (!$is_admin) {
    http_response_code(403);
    exit('관리자 로그인 후 실행해 주세요.');
}

$bo_table = 'notice';
$write_table = $g5['write_prefix'] . $bo_table;
$board = get_board_db($bo_table, true);
if (!$board) {
    exit('notice 게시판이 없습니다.');
}

$samples = array(
    array('ca' => '싱크대', 'subject' => '천호동 상가 싱크대청소 · 기름때 누적 배수 개선', 'area' => '천호동', 'href' => '/page/local-cheonho.php'),
    array('ca' => '배수구', 'subject' => '길동 욕실 배수구청소 · 악취 원인 점검', 'area' => '길동', 'href' => '/page/local-gil.php'),
    array('ca' => '하수구', 'subject' => '암사동 정화조·외부 배수 역류 상담', 'area' => '암사동', 'href' => '/page/local-amsa.php'),
    array('ca' => '배수구', 'subject' => '고덕동 대단지 세탁실 배수 청소', 'area' => '고덕동', 'href' => '/page/local-godeok.php'),
    array('ca' => '변기', 'subject' => '성내동 아파트 변기·배수 막힘 상담', 'area' => '성내동', 'href' => '/page/local-seongnae.php'),
    array('ca' => '싱크대', 'subject' => '둔촌동 음식점 주방 배수구청소', 'area' => '둔촌동', 'href' => '/page/local-dunchon.php'),
    array('ca' => '배수구', 'subject' => '명일동 학원가 화장실 배수 점검', 'area' => '명일동', 'href' => '/page/local-myeongil.php'),
    array('ca' => '하수구', 'subject' => '송파구 인접 지역 하수구청소 상담', 'area' => '송파구', 'href' => '/page/local-songpa.php'),
);

$mb_id = $member['mb_id'];
$mb_name = $member['mb_name'] ? $member['mb_name'] : '원진하수구';
$created = 0;
$skipped = 0;

foreach ($samples as $row) {
    $subject = $row['subject'];
    $exists = sql_fetch("select wr_id from {$write_table} where wr_is_comment = 0 and wr_subject = '" . sql_real_escape_string($subject) . "' limit 1");
    if ($exists && !empty($exists['wr_id'])) {
        $skipped++;
        continue;
    }

    $body = '<p><strong>' . htmlspecialchars($row['area'], ENT_QUOTES, 'UTF-8') . '</strong> 현장 상담 사례입니다.</p>'
        . '<p>증상 확인 후 필요한 청소·점검 범위를 안내했습니다.</p>'
        . '<p>관련 지역 페이지: <a href="' . htmlspecialchars($row['href'], ENT_QUOTES, 'UTF-8') . '">' . htmlspecialchars($row['area'], ENT_QUOTES, 'UTF-8') . ' 하수구청소</a></p>'
        . '<p>※ 실제 작업 사진은 관리자에서 첨부해 주세요. 첫 번째 이미지가 홈 썸네일로 사용됩니다.</p>';

    $wr = array(
        'wr_num' => 0,
        'wr_reply' => '',
        'wr_parent' => 0,
        'wr_is_comment' => 0,
        'wr_comment' => 0,
        'wr_comment_reply' => '',
        'ca_name' => $row['ca'],
        'wr_option' => '',
        'wr_subject' => $subject,
        'wr_content' => $body,
        'wr_link1' => $row['href'],
        'wr_link2' => '',
        'wr_link1_hit' => 0,
        'wr_link2_hit' => 0,
        'wr_hit' => 0,
        'wr_good' => 0,
        'wr_nogood' => 0,
        'mb_id' => $mb_id,
        'wr_password' => '',
        'wr_name' => $mb_name,
        'wr_email' => '',
        'wr_homepage' => '',
        'wr_datetime' => G5_TIME_YMDHIS,
        'wr_file' => 0,
        'wr_last' => G5_TIME_YMDHIS,
        'wr_ip' => $_SERVER['REMOTE_ADDR'],
        'wr_facebook_user' => '',
        'wr_twitter_user' => '',
        'wr_1' => $row['area'],
        'wr_2' => '',
        'wr_3' => '',
        'wr_4' => '',
        'wr_5' => '',
        'wr_6' => '',
        'wr_7' => '',
        'wr_8' => '',
        'wr_9' => '',
        'wr_10' => '',
    );

    $sql_common = '';
    foreach ($wr as $k => $v) {
        $sql_common .= ($sql_common ? ', ' : '') . "{$k} = '" . sql_real_escape_string($v) . "'";
    }

    sql_query("insert into {$write_table} set {$sql_common}");
    $wr_id = sql_insert_id();
    if ($wr_id) {
        sql_query("update {$write_table} set wr_parent = '{$wr_id}', wr_num = '-{$wr_id}' where wr_id = '{$wr_id}'");
        sql_query("update {$g5['board_table']} set bo_count_write = bo_count_write + 1 where bo_table = '{$bo_table}'");
        $created++;
    }
}

header('Content-Type: text/plain; charset=utf-8');
echo "시공사례 시드 완료\n";
echo "생성: {$created}\n";
echo "건너뜀(중복): {$skipped}\n";
echo "게시판: /bbs/board.php?bo_table=notice\n";
echo "다음: 각 글에 실제 현장 사진을 첨부하세요.\n";
