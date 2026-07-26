<?php
/**
 * 복제 사이트 공용 지역 랜딩
 *
 * /_site.clone.config.php 의 local_areas에 등록한 slug 사용:
 * /page/local.php?area=slug
 *
 * 검색 노출용 고정 URL이 필요하면 기존 local-{slug}.php처럼
 * $local_dong_slug만 지정한 얇은 파일을 추가하면 됩니다.
 */
$local_dong_slug = isset($_GET['area'])
    ? preg_replace('/[^a-z0-9-]/', '', strtolower((string) $_GET['area']))
    : '';

if ($local_dong_slug === '') {
    http_response_code(404);
    exit('지역을 선택해 주세요.');
}

$local_page_url = '/page/local.php?area=' . rawurlencode($local_dong_slug);
include_once dirname(__FILE__) . '/_local-drain-home.php';
