<?php
/**
 * 강동구 동별 하수구 랜딩 — 빌더 홈 렌더 + 동 이름 주입
 *
 * 호출 전 설정:
 *   $local_dong_slug  (예: cheonho)
 *   $local_dong_name  (예: 천호동)
 */
if (!isset($local_dong_slug, $local_dong_name)) {
    exit;
}

if (!defined('_GNUBOARD_')) {
    include_once dirname(__FILE__) . '/../_common.php';
}

if (!defined('_GNUBOARD_')) {
    exit;
}

if (is_file(G5_PATH . '/_site.config.php')) {
    include_once G5_PATH . '/_site.config.php';
}

$local_dong_slug = preg_replace('/[^a-z0-9-]/', '', strtolower((string) $local_dong_slug));
$local_dong_name = trim(strip_tags((string) $local_dong_name));
if ($local_dong_slug === '' || $local_dong_name === '') {
    exit;
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

$site_name = function_exists('g5site_cfg') ? g5site_cfg('site_name', '강동 하수구 해결센터') : '강동 하수구 해결센터';
$page_title = $local_dong_name . ' 하수구막힘 긴급출동 | ' . $site_name;
$page_desc = $local_dong_name . ' 싱크대·변기·배수구·하수구 역류 긴급 상담. 사진 1장으로 빠른 안내.';
$canonical = (defined('G5_URL') ? G5_URL : '') . '/page/local-' . $local_dong_slug . '.php';

$title_tag = '<title>' . htmlspecialchars($page_title, ENT_QUOTES, 'UTF-8') . '</title>';
if (preg_match('/<title>.*?<\/title>/is', $html)) {
    $html = preg_replace('/<title>.*?<\/title>/is', $title_tag, $html, 1);
} else {
    $html = preg_replace('/<head([^>]*)>/i', '<head$1>' . $title_tag, $html, 1);
}

$meta_block = "\n"
    . '<meta name="description" content="' . htmlspecialchars($page_desc, ENT_QUOTES, 'UTF-8') . '">' . "\n"
    . '<meta name="keywords" content="' . htmlspecialchars($local_dong_name . ' 하수구막힘,' . $local_dong_name . ' 싱크대 막힘,' . $local_dong_name . ' 변기 막힘', ENT_QUOTES, 'UTF-8') . '">' . "\n"
    . '<link rel="canonical" href="' . htmlspecialchars($canonical, ENT_QUOTES, 'UTF-8') . '">' . "\n"
    . '<meta property="og:title" content="' . htmlspecialchars($page_title, ENT_QUOTES, 'UTF-8') . '">' . "\n"
    . '<meta property="og:description" content="' . htmlspecialchars($page_desc, ENT_QUOTES, 'UTF-8') . '">' . "\n"
    . '<script>window.__PINKRIBBON_DONG__=' . json_encode($local_dong_name, JSON_UNESCAPED_UNICODE) . ';</script>' . "\n";

$html = preg_replace('/<head([^>]*)>/i', '<head$1>' . $meta_block, $html, 1);

header('Content-Type: text/html; charset=utf-8');
echo $html;
exit;
