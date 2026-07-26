<?php
/**
 * 서비스 허브 랜딩 — 싱크대/배수구/정화조
 *
 * 호출 전: $service_hub_slug (sink|drain|septic)
 */
if (!isset($service_hub_slug)) {
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

$service_hub_slug = preg_replace('/[^a-z0-9-]/', '', strtolower((string) $service_hub_slug));
$hub = null;

if (function_exists('g5site_public_profile')) {
    $profile = g5site_public_profile();
    $hubs = isset($profile['serviceHubs']) && is_array($profile['serviceHubs']) ? $profile['serviceHubs'] : array();
    foreach ($hubs as $row) {
        if (is_array($row) && isset($row['slug']) && (string) $row['slug'] === $service_hub_slug) {
            $hub = $row;
            break;
        }
    }
}

if (!$hub) {
    http_response_code(404);
    exit('등록되지 않은 서비스입니다.');
}

$label = isset($hub['label']) ? trim(strip_tags((string) $hub['label'])) : '';
$name = isset($hub['name']) ? trim(strip_tags((string) $hub['name'])) : '';
$intro = isset($hub['intro']) ? trim(strip_tags((string) $hub['intro'])) : '';
$hero_line = isset($hub['hero_line']) ? trim(strip_tags((string) $hub['hero_line'])) : '';
$url = isset($hub['url']) ? (string) $hub['url'] : ('/page/service-' . $service_hub_slug . '.php');
$page_faqs = array();
if (isset($hub['faqs']) && is_array($hub['faqs'])) {
    foreach ($hub['faqs'] as $faq) {
        if (!is_array($faq) || !isset($faq['q'], $faq['a'])) {
            continue;
        }
        $page_faqs[] = array(
            'q' => trim(strip_tags((string) $faq['q'])),
            'a' => trim(strip_tags((string) $faq['a'])),
        );
    }
}

$project_id = function_exists('g5site_cfg') ? g5site_cfg('home_builder_bridge_id', 'gangdong-drain') : 'gangdong-drain';
$project_id = preg_replace('/[^a-z0-9_-]/i', '', (string) $project_id);
if ($project_id === '') {
    $project_id = 'gangdong-drain';
}

if (!is_file(G5_PLUGIN_PATH . '/onoff-builder-bridge/bootstrap.php')) {
    header('Location: /');
    exit;
}

include_once G5_PLUGIN_PATH . '/onoff-builder-bridge/bootstrap.php';

if (!function_exists('onoff_builder_project_exists') || !onoff_builder_project_exists($project_id)) {
    header('Location: /');
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
    header('Location: /');
    exit;
}

$html = @file_get_contents($index_file);
if ($html === false || $html === '') {
    header('Location: /');
    exit;
}

if (function_exists('onoff_builder_remove_base_tags')) {
    $html = onoff_builder_remove_base_tags($html);
}
if (function_exists('onoff_builder_rewrite_asset_paths')) {
    $html = onoff_builder_rewrite_asset_paths($html, $project_id, $entry);
}

$site_name = function_exists('g5site_cfg') ? g5site_cfg('site_name', '원진하수구') : '원진하수구';
$main_kw = $label !== '' ? $label : ('강동구 ' . $name);
$page_title = $main_kw . ' | ' . $site_name;
$page_desc = $intro !== '' ? mb_substr($intro, 0, 150, 'UTF-8') : ($main_kw . ' 상담. 원진하수구');
$canonical = (defined('G5_URL') ? G5_URL : '') . $url;
$region = function_exists('g5site_cfg') ? g5site_cfg('main_keyword', '강동구하수구청소') : '강동구하수구청소';

if (function_exists('onoff_builder_inject_site_profile')) {
    $html = onoff_builder_inject_site_profile($html, $project_id, array(
        'seoTitle' => $page_title,
        'seoDescription' => $page_desc,
        'mainKeyword' => $main_kw,
        'serviceName' => $main_kw,
        'secondaryKeywords' => array($region, '원진하수구', $name),
        'canonical' => $canonical,
        'pageIntro' => $intro,
        'heroLine' => $hero_line,
        'pageFaqs' => $page_faqs,
        'breadcrumbLabel' => $main_kw,
        'activeArea' => '',
    ));
}

header('Content-Type: text/html; charset=utf-8');
echo $html;
exit;
