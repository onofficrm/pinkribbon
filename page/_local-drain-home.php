<?php
/**
 * 강동구 동별 하수구 랜딩 — 빌더 홈 렌더 + 동 이름 주입
 *
 * 호출 전 설정:
 *   $local_dong_slug  (예: cheonho)
 *   $local_dong_name  (선택 — 없으면 복제 설정에서 조회)
 */
if (!isset($local_dong_slug)) {
    exit;
}

if (!defined('_GNUBOARD_')) {
    include_once dirname(__FILE__) . '/../common.php';
}

if (!defined('_GNUBOARD_')) {
    exit;
}

if (is_file(G5_PATH . '/_site.config.php')) {
    include_once G5_PATH . '/_site.config.php';
}

$local_dong_slug = preg_replace('/[^a-z0-9-]/', '', strtolower((string) $local_dong_slug));
$local_dong_name = isset($local_dong_name) ? trim(strip_tags((string) $local_dong_name)) : '';

if (function_exists('g5site_public_profile')) {
    $public_profile = g5site_public_profile();
    $profile_areas = isset($public_profile['localAreas']) && is_array($public_profile['localAreas'])
        ? $public_profile['localAreas']
        : array();
    foreach ($profile_areas as $profile_area) {
        if (isset($profile_area['slug'], $profile_area['name'])
            && (string) $profile_area['slug'] === $local_dong_slug) {
            $local_dong_name = trim(strip_tags((string) $profile_area['name']));
            break;
        }
    }
}

if ($local_dong_slug === '' || $local_dong_name === '') {
    http_response_code(404);
    exit('등록되지 않은 지역입니다.');
}

$project_id = function_exists('g5site_cfg') ? g5site_cfg('home_builder_bridge_id', 'gangdong-drain') : 'gangdong-drain';
$project_id = preg_replace('/[^a-z0-9_-]/i', '', (string) $project_id);
if ($project_id === '') {
    $project_id = 'gangdong-drain';
}

if (!is_file(G5_PLUGIN_PATH . '/onoff-builder-bridge/bootstrap.php')) {
    header('Location: /?dong=' . rawurlencode($local_dong_name));
    exit;
}

include_once G5_PLUGIN_PATH . '/onoff-builder-bridge/bootstrap.php';

if (!function_exists('onoff_builder_project_exists') || !onoff_builder_project_exists($project_id)) {
    header('Location: /?dong=' . rawurlencode($local_dong_name));
    exit;
}

$meta = function_exists('onoff_builder_get_import') ? onoff_builder_get_import($project_id) : null;
$entry = function_exists('onoff_builder_resolve_import_entry')
    ? onoff_builder_resolve_import_entry($project_id, $meta ? $meta : array())
    : 'index.html';
$index_file = function_exists('onoff_builder_resolve_import_index_file')
    ? onoff_builder_resolve_import_index_file($project_id, $entry)
    : '';

if ($index_file === '' || !is_file($index_file)) {
    header('Location: /?dong=' . rawurlencode($local_dong_name));
    exit;
}

$html = @file_get_contents($index_file);
if ($html === false || $html === '') {
    header('Location: /?dong=' . rawurlencode($local_dong_name));
    exit;
}

if (function_exists('onoff_builder_remove_base_tags')) {
    $html = onoff_builder_remove_base_tags($html);
}
if (function_exists('onoff_builder_rewrite_asset_paths')) {
    $html = onoff_builder_rewrite_asset_paths($html, $project_id, $entry);
}

$site_name = function_exists('g5site_cfg') ? g5site_cfg('site_name', '하수구 해결센터') : '하수구 해결센터';
$page_title = $local_dong_name . ' 하수구막힘 긴급출동 | ' . $site_name;
$page_desc = $local_dong_name . ' 싱크대·변기·배수구·하수구 역류 긴급 상담. 사진 1장으로 빠른 안내.';
$canonical_path = isset($local_page_url) && $local_page_url !== ''
    ? (string) $local_page_url
    : '/page/local-' . $local_dong_slug . '.php';
$canonical = (defined('G5_URL') ? G5_URL : '') . $canonical_path;

if (function_exists('onoff_builder_inject_site_profile')) {
    $html = onoff_builder_inject_site_profile($html, $project_id, array(
        'activeArea' => $local_dong_name,
        'seoTitle' => $page_title,
        'seoDescription' => $page_desc,
        'mainKeyword' => $local_dong_name . ' 하수구막힘',
        'secondaryKeywords' => array(
            $local_dong_name . ' 싱크대 막힘',
            $local_dong_name . ' 변기 막힘',
            $local_dong_name . ' 배수구 막힘',
        ),
        'canonical' => $canonical,
    ));
}

header('Content-Type: text/html; charset=utf-8');
echo $html;
exit;
