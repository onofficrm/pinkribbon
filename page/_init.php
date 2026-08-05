<?php
/**
 * 서브페이지 공통 부트스트랩
 * - 직접 URL 접근: /page/about.php
 * - include 경로: dirname 기준 프로젝트 루트 _common.php 로드
 */
if (isset($_SERVER['SCRIPT_FILENAME']) && basename($_SERVER['SCRIPT_FILENAME']) === '_init.php') {
    exit;
}

if (!defined('_GNUBOARD_')) {
    include_once(dirname(__FILE__).'/../_common.php');
}

if (!defined('_GNUBOARD_')) {
    exit;
}

/**
 * 서브페이지 시작 (head.php)
 * @param string $title 브라우저·container_title용
 */
function g5_page_start($title)
{
    global $g5, $page_title, $page_description, $page_keywords,
           $page_og_image, $page_canonical, $page_robots, $page_schema_type;
    $g5['title'] = $title;
    // head.php/head.sub.php는 전역 변수를 직접 참조한다. 함수 내부 include 시 스코프 맞춤.
    extract($GLOBALS, EXTR_SKIP | EXTR_REFS);
    include_once(G5_PATH.'/head.php');
}

/**
 * 서브페이지 종료 (tail.php)
 */
function g5_page_end()
{
    extract($GLOBALS, EXTR_SKIP | EXTR_REFS);
    include_once(G5_PATH.'/tail.php');
}
