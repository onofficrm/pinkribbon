<?php
/**
 * 지역·동별 하수구청소 랜딩 — 빌더 홈 렌더 + 지역 고유 SEO/본문 주입
 *
 * 호출 전 설정:
 *   $local_dong_slug  (예: cheonho, songpa)
 *   $local_dong_name  (선택 — 없으면 복제 설정에서 조회)
 *   $local_page_url   (선택 — canonical 경로)
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
$local_area_label = '';
$local_clog_label = '';
$is_neighbor_area = false;

$resolve_area_from_list = function ($areas, $slug) {
    if (!is_array($areas)) {
        return null;
    }
    foreach ($areas as $row) {
        if (!is_array($row) || !isset($row['slug'], $row['name'])) {
            continue;
        }
        if ((string) $row['slug'] === $slug) {
            return $row;
        }
    }
    return null;
};

if (function_exists('g5site_public_profile')) {
    $public_profile = g5site_public_profile();
    $profile_areas = isset($public_profile['localAreas']) && is_array($public_profile['localAreas'])
        ? $public_profile['localAreas']
        : array();
    $neighbor_areas = isset($public_profile['neighborAreas']) && is_array($public_profile['neighborAreas'])
        ? $public_profile['neighborAreas']
        : array();

    $matched = $resolve_area_from_list($profile_areas, $local_dong_slug);
    if ($matched) {
        $local_dong_name = trim(strip_tags((string) $matched['name']));
        $local_area_label = isset($matched['label']) ? trim(strip_tags((string) $matched['label'])) : '';
        $local_clog_label = isset($matched['clog_label']) ? trim(strip_tags((string) $matched['clog_label'])) : '';
        if (isset($matched['url']) && (!isset($local_page_url) || $local_page_url === '')) {
            $local_page_url = (string) $matched['url'];
        }
    } else {
        $matched = $resolve_area_from_list($neighbor_areas, $local_dong_slug);
        if ($matched) {
            $is_neighbor_area = true;
            $local_dong_name = trim(strip_tags((string) $matched['name']));
            $local_area_label = isset($matched['label']) ? trim(strip_tags((string) $matched['label'])) : '';
            $local_clog_label = isset($matched['clog_label']) ? trim(strip_tags((string) $matched['clog_label'])) : '';
            if (isset($matched['url']) && (!isset($local_page_url) || $local_page_url === '')) {
                $local_page_url = (string) $matched['url'];
            }
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

$site_name = function_exists('g5site_cfg') ? g5site_cfg('site_name', '원진하수구') : '원진하수구';
$main_kw = $local_area_label !== '' ? $local_area_label : ($local_dong_name . ' 하수구청소');
if ($local_clog_label === '') {
    $local_clog_label = $local_dong_name . ' 하수구막힘';
}
$page_title = $main_kw . '·' . $local_clog_label . ' | ' . $site_name;
$page_desc = $local_dong_name . ' 하수구청소·하수구막힘 · 싱크대·배수구·변기·정화조 청소·막힘 상담. 원진하수구가 사진 한 장으로 빠르게 안내합니다.';

$canonical_path = isset($local_page_url) && $local_page_url !== ''
    ? (string) $local_page_url
    : '/page/local-' . $local_dong_slug . '.php';
$canonical = (defined('G5_URL') ? G5_URL : '') . $canonical_path;

$page_intro = '';
$hero_line = '';
$page_faqs = array();
$area_content_map = array();
if (function_exists('g5site_public_profile')) {
    $profile_for_content = g5site_public_profile();
    if (isset($profile_for_content['areaContent']) && is_array($profile_for_content['areaContent'])) {
        $area_content_map = $profile_for_content['areaContent'];
    }
}
if (isset($area_content_map[$local_dong_slug]) && is_array($area_content_map[$local_dong_slug])) {
    $row = $area_content_map[$local_dong_slug];
    $page_intro = isset($row['intro']) ? trim(strip_tags((string) $row['intro'])) : '';
    $hero_line = isset($row['hero_line']) ? trim(strip_tags((string) $row['hero_line'])) : '';
    if (isset($row['faqs']) && is_array($row['faqs'])) {
        foreach ($row['faqs'] as $faq) {
            if (!is_array($faq) || !isset($faq['q'], $faq['a'])) {
                continue;
            }
            $page_faqs[] = array(
                'q' => trim(strip_tags((string) $faq['q'])),
                'a' => trim(strip_tags((string) $faq['a'])),
            );
        }
    }
    if ($page_intro !== '') {
        $page_desc = mb_substr($page_intro, 0, 150, 'UTF-8');
    }
}

$secondary = array(
    $local_clog_label,
    str_replace(' ', '', $local_clog_label),
    $local_dong_name . ' 싱크대청소',
    $local_dong_name . ' 배수구청소',
    $local_dong_name . ' 변기막힘',
    $local_dong_name . ' 하수구역류',
);
if ($is_neighbor_area) {
    $secondary[] = '강동구하수구청소';
    $secondary[] = '강동구하수구막힘';
    $secondary[] = '원진하수구';
} else {
    $secondary[] = '강동구하수구청소';
    $secondary[] = '강동구하수구막힘';
}

if (function_exists('onoff_builder_inject_site_profile')) {
    $html = onoff_builder_inject_site_profile($html, $project_id, array(
        'activeArea' => $local_dong_name,
        'seoTitle' => $page_title,
        'seoDescription' => $page_desc,
        'mainKeyword' => $main_kw,
        'secondaryKeywords' => array_values(array_unique(array_filter($secondary))),
        'canonical' => $canonical,
        'pageIntro' => $page_intro,
        'heroLine' => $hero_line !== '' ? $hero_line : ($local_dong_name . ' 하수구청소·하수구막힘 상담'),
        'pageFaqs' => $page_faqs,
        'serviceName' => $main_kw . '·' . $local_clog_label,
        'breadcrumbLabel' => $main_kw,
        'clogKeyword' => $local_clog_label,
    ));
}

header('Content-Type: text/html; charset=utf-8');
echo $html;
exit;
