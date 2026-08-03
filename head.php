<?php
if (!defined('_GNUBOARD_')) exit; // 개별 페이지 접근 불가

if (!isset($site_config) && is_file(G5_PATH.'/_site.config.php')) {
    include_once(G5_PATH.'/_site.config.php');
}

run_event('pre_head');

if (defined('G5_THEME_PATH')) {
    require_once(G5_THEME_PATH.'/head.php');
    return;
}

if (G5_IS_MOBILE) {
    include_once(G5_MOBILE_PATH.'/head.php');
    return;
}

// SEO 메타 (파일 없어도 fatal 방지)
if (is_file(G5_PATH.'/components/seo-meta.php')) {
    include_once(G5_PATH.'/components/seo-meta.php');
    if (function_exists('g5b_seo_init')) {
        g5b_seo_init();
    }
}

include_once(G5_PATH.'/head.sub.php');

// 방문 추적 (head) — ID 없으면 출력 없음
if (is_file(G5_PATH.'/components/tracking-head.php')) {
    ob_start();
    include_once(G5_PATH.'/components/tracking-head.php');
    $onoff_tracking_head = ob_get_clean();
    if (trim($onoff_tracking_head) !== '') {
        add_javascript($onoff_tracking_head, -20);
    }
}

// GTM noscript — body 시작 직후 (head.sub.php 직후)
if (is_file(G5_PATH.'/components/tracking-body.php')) {
    include_once(G5_PATH.'/components/tracking-body.php');
}

// site_config 브랜드 색 → :root (hex만 허용) — stylesheet 등록 전에 구성
$g5_css_brand = '';
if (function_exists('g5site_cfg')) {
    $g5_primary = g5site_cfg('primary_color', '');
    $g5_secondary = g5site_cfg('secondary_color', '');
    $g5_primary_hover = g5site_cfg('primary_color_hover', '#e56200');
    if ($g5_primary !== '' && preg_match('/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/', $g5_primary)) {
        $g5_css_brand .= '--color-primary:'.$g5_primary.';';
    }
    if ($g5_primary_hover !== '' && preg_match('/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/', $g5_primary_hover)) {
        $g5_css_brand .= '--color-primary-hover:'.$g5_primary_hover.';';
    }
    if ($g5_secondary !== '' && preg_match('/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/', $g5_secondary)) {
        $g5_css_brand .= '--color-secondary:'.$g5_secondary.';--color-muted:'.$g5_secondary.';';
    }
}

// 템플릿 전용 CSS/JS (default.css·common.js 이후 로드)
add_stylesheet('<link rel="stylesheet" href="'.G5_CSS_URL.'/custom.css">', 10);
if ($g5_css_brand !== '') {
    add_stylesheet('<style>:root{'.$g5_css_brand.'}</style>', 11);
}
if (is_file(G5_LIB_PATH.'/icrm.lib.php')) {
    include_once G5_LIB_PATH.'/icrm.lib.php';
    if (function_exists('icrm_enqueue_board_assets')) {
        icrm_enqueue_board_assets();
    }
}
add_javascript('<script src="'.G5_JS_URL.'/custom.js"></script>', 20);

include_once(G5_LIB_PATH.'/latest.lib.php');
include_once(G5_LIB_PATH.'/outlogin.lib.php');
include_once(G5_LIB_PATH.'/poll.lib.php');
include_once(G5_LIB_PATH.'/visit.lib.php');
include_once(G5_LIB_PATH.'/connect.lib.php');
include_once(G5_LIB_PATH.'/popular.lib.php');

// 로고 경로 (site_config → svg/png 파일 → 텍스트 fallback)
$g5_logo_url = '';
if (function_exists('g5site_cfg')) {
    $g5_logo_rel = g5site_cfg('logo_path', '');
    if ($g5_logo_rel !== '' && preg_match('#^https?://#i', $g5_logo_rel)) {
        $g5_logo_url = $g5_logo_rel;
    } elseif ($g5_logo_rel !== '') {
        $g5_logo_rel = ($g5_logo_rel[0] === '/') ? $g5_logo_rel : '/'.$g5_logo_rel;
        if (is_file(G5_PATH.$g5_logo_rel)) {
            $g5_logo_url = G5_URL.$g5_logo_rel;
        }
    }
}
if ($g5_logo_url === '') {
    foreach (array('logo.svg', 'logo.png') as $g5_logo_file) {
        if (is_file(G5_PATH.'/img/logo/'.$g5_logo_file)) {
            $g5_logo_url = G5_URL.'/img/logo/'.$g5_logo_file;
            break;
        }
    }
}
$g5_site_title = function_exists('g5site_cfg')
    ? g5site_cfg('site_name', get_text($config['cf_title']))
    : get_text($config['cf_title']);
if ($g5_site_title === '') {
    $g5_site_title = get_text($config['cf_title']);
}
$g5_brand_name = function_exists('g5site_cfg')
    ? g5site_cfg('company_name', $g5_site_title)
    : $g5_site_title;
if ($g5_brand_name === '') {
    $g5_brand_name = $g5_site_title;
}
$g5_region_name = '';
$g5_region_initial = '원';
if (isset($GLOBALS['site_clone_config']) && is_array($GLOBALS['site_clone_config'])) {
    if (!empty($GLOBALS['site_clone_config']['region_name'])) {
        $g5_region_name = (string) $GLOBALS['site_clone_config']['region_name'];
    }
    if (!empty($GLOBALS['site_clone_config']['region_initial'])) {
        $g5_region_initial = (string) $GLOBALS['site_clone_config']['region_initial'];
    }
}
$g5_logo_tagline = $g5_region_name !== ''
    ? ($g5_region_name . ' 하수구청소·막힘 · ' . $g5_brand_name)
    : $g5_brand_name;

// 상담문의 URL (메인: contact 섹션 / 그 외: Q&A)
$g5_inquiry_url = defined('_INDEX_') ? G5_URL.'/#section-contact' : G5_BBS_URL.'/qalist.php';
$g5_consult_label = function_exists('g5site_cfg') ? g5site_cfg('consultation_text', '상담문의') : '상담문의';


// 홈화면과 동일한 GNB (빌더 섹션 앵커 + 시공사례/소개)
$g5_phone = function_exists('g5site_cfg') ? g5site_cfg('phone', '') : '';
$g5_main_keyword = function_exists('g5site_cfg') ? g5site_cfg('main_keyword', '') : '';
$g5_cta_label = trim($g5_main_keyword) !== ''
    ? (preg_replace('/\s+/', ' ', $g5_main_keyword) . ' 상담')
    : (function_exists('g5site_cfg') ? g5site_cfg('consultation_text', '긴급출동 상담') : '긴급출동 상담');
$g5_tel_href = function_exists('g5site_tel_link') ? g5site_tel_link($g5_phone) : ('tel:' . preg_replace('/[^0-9+]/', '', $g5_phone));

$g5_home_nav = array(
    array('me_name' => '서비스', 'me_link' => G5_URL . '/#services', 'me_target' => 'self', 'sub' => array()),
    array('me_name' => '대처법', 'me_link' => G5_URL . '/#howto', 'me_target' => 'self', 'sub' => array()),
    array('me_name' => '뚫기vs청소', 'me_link' => G5_URL . '/#compare', 'me_target' => 'self', 'sub' => array()),
    array('me_name' => '사진상담', 'me_link' => G5_URL . '/#inquiry-form', 'me_target' => 'self', 'sub' => array()),
    array('me_name' => '출동지역', 'me_link' => G5_URL . '/#areas', 'me_target' => 'self', 'sub' => array()),
    array('me_name' => '시공사례', 'me_link' => G5_BBS_URL . '/board.php?bo_table=notice', 'me_target' => 'self', 'sub' => array()),
    array('me_name' => '소개', 'me_link' => G5_URL . '/page/about.php', 'me_target' => 'self', 'sub' => array()),
    array('me_name' => '후기', 'me_link' => G5_URL . '/#reviews', 'me_target' => 'self', 'sub' => array()),
    array('me_name' => 'FAQ', 'me_link' => G5_URL . '/#faq', 'me_target' => 'self', 'sub' => array()),
);
$menu_datas_pc = $g5_home_nav;
$menu_datas_mo = $g5_home_nav;
?>

<!-- 상단 시작 { -->
<div id="hd">
    <?php
    if (defined('_INDEX_')) {
        include G5_BBS_PATH.'/newwin.inc.php';
    }
    ?>

    <header id="siteHeader" class="site-header">
        <h1 id="hd_h1" class="sound_only"><?php echo $g5['title']; ?></h1>
        <div id="skip_to_container" class="site-header__skip">
            <a href="#container">본문 바로가기</a>
        </div>

        <div class="site-header__inner">
            <div class="site-header__logo">
                <a href="<?php echo G5_URL; ?>" class="site-header__logo-link" aria-label="<?php echo htmlspecialchars($g5_brand_name, ENT_QUOTES, 'UTF-8'); ?>">
                    <?php if ($g5_logo_url) { ?>
                    <img src="<?php echo $g5_logo_url; ?>" alt="" class="site-header__logo-img" width="40" height="40">
                    <?php } else { ?>
                    <span class="site-header__logo-mark" aria-hidden="true"><?php echo htmlspecialchars($g5_region_initial, ENT_QUOTES, 'UTF-8'); ?></span>
                    <?php } ?>
                    <span class="site-header__logo-copy">
                        <span class="site-header__logo-name"><?php echo htmlspecialchars($g5_brand_name, ENT_QUOTES, 'UTF-8'); ?></span>
                        <span class="site-header__logo-tagline"><?php echo htmlspecialchars($g5_logo_tagline, ENT_QUOTES, 'UTF-8'); ?></span>
                    </span>
                </a>
            </div>

            <nav id="siteGnb" class="site-header__gnb" aria-label="메인메뉴">
                <ul class="site-header__gnb-list">
                    <?php
                    $gnb_i = 0;
                    foreach ((array) $menu_datas_pc as $row) {
                        if (empty($row)) {
                            continue;
                        }
                        $has_sub = !empty($row['sub']);
                    ?>
                    <li class="site-header__gnb-item<?php echo $has_sub ? ' has-sub' : ''; ?>">
                        <a href="<?php echo $row['me_link']; ?>" target="_<?php echo $row['me_target']; ?>" class="site-header__gnb-link"><?php echo $row['me_name']; ?></a>
                        <?php if ($has_sub) { ?>
                        <ul class="site-header__gnb-sub">
                            <?php foreach ((array) $row['sub'] as $row2) {
                                if (empty($row2)) {
                                    continue;
                                }
                            ?>
                            <li class="site-header__gnb-sub-item">
                                <a href="<?php echo $row2['me_link']; ?>" target="_<?php echo $row2['me_target']; ?>" class="site-header__gnb-sub-link"><?php echo $row2['me_name']; ?></a>
                            </li>
                            <?php } ?>
                        </ul>
                        <?php } ?>
                    </li>
                    <?php
                        $gnb_i++;
                    }
                    if ($gnb_i === 0) {
                    ?>
                    <li class="site-header__gnb-item site-header__gnb-item--empty">
                        <span class="site-header__gnb-empty">메뉴 준비 중입니다.<?php if ($is_admin) { ?> <a href="<?php echo G5_ADMIN_URL; ?>/menu_list.php">메뉴설정</a><?php } ?></span>
                    </li>
                    <?php } ?>
                </ul>
            </nav>

            <div class="site-header__utils">


                <a href="<?php echo htmlspecialchars($g5_tel_href, ENT_QUOTES, 'UTF-8'); ?>" class="site-header__cta site-header__cta--phone">
                    <span class="site-header__cta-label"><i class="fa fa-phone" aria-hidden="true"></i> <?php echo get_text($g5_cta_label); ?></span>
                    <?php if ($g5_phone !== '') { ?>
                    <strong class="site-header__cta-phone"><?php echo get_text($g5_phone); ?></strong>
                    <?php } ?>
                </a>

                <button type="button" class="site-header__menu-btn" aria-controls="siteMobileNav" aria-expanded="false" title="전체메뉴">
                    <i class="fa fa-bars" aria-hidden="true"></i>
                    <span class="sound_only">전체메뉴열기</span>
                </button>
            </div>
        </div>

        <div id="siteMobileNav" class="site-header__mobile-nav" aria-hidden="true">
            <div class="site-header__mobile-nav-head">
                <strong class="site-header__mobile-nav-title">전체메뉴</strong>
                <button type="button" class="site-header__mobile-close" title="메뉴 닫기">
                    <i class="fa fa-times" aria-hidden="true"></i>
                    <span class="sound_only">메뉴 닫기</span>
                </button>
            </div>
            <ul class="site-header__mobile-list">
                <?php
                $mnb_i = 0;
                foreach ((array) $menu_datas_mo as $row) {
                    if (empty($row)) {
                        continue;
                    }
                ?>
                <li class="site-header__mobile-item">
                    <a href="<?php echo $row['me_link']; ?>" target="_<?php echo $row['me_target']; ?>" class="site-header__mobile-link"><?php echo $row['me_name']; ?></a>
                    <?php
                    $mnb_k = 0;
                    foreach ((array) $row['sub'] as $row2) {
                        if (empty($row2)) {
                            continue;
                        }
                        if ($mnb_k === 0) {
                            echo '<ul class="site-header__mobile-sub">'.PHP_EOL;
                        }
                    ?>
                    <li><a href="<?php echo $row2['me_link']; ?>" target="_<?php echo $row2['me_target']; ?>"><?php echo $row2['me_name']; ?></a></li>
                    <?php
                        $mnb_k++;
                    }
                    if ($mnb_k > 0) {
                        echo '</ul>'.PHP_EOL;
                    }
                    ?>
                </li>
                <?php
                    $mnb_i++;
                }
                if ($mnb_i === 0) {
                ?>
                <li class="site-header__mobile-item site-header__mobile-item--empty">
                    <span>메뉴 준비 중입니다.<?php if ($is_admin) { ?> <a href="<?php echo G5_ADMIN_URL; ?>/menu_list.php">메뉴설정</a><?php } ?></span>
                </li>
                <?php } ?>
            </ul>
            <ul class="site-header__mobile-utils">
                <li><a href="<?php echo G5_BBS_URL; ?>/faq.php">FAQ</a></li>
                <li><a href="<?php echo G5_BBS_URL; ?>/qalist.php">Q&amp;A</a></li>
                <li><a href="<?php echo G5_BBS_URL; ?>/new.php">새글</a></li>
                <?php if (defined('G5_USE_SHOP') && G5_USE_SHOP) { ?>
                <li><a href="<?php echo G5_SHOP_URL; ?>">쇼핑몰</a></li>
                <?php } ?>
            </ul>
            <a href="<?php echo htmlspecialchars($g5_tel_href, ENT_QUOTES, 'UTF-8'); ?>" class="site-header__cta site-header__cta--phone site-header__mobile-cta">
                <span class="site-header__cta-label"><i class="fa fa-phone" aria-hidden="true"></i> <?php echo get_text($g5_cta_label); ?></span>
                <?php if ($g5_phone !== '') { ?>
                <strong class="site-header__cta-phone"><?php echo get_text($g5_phone); ?></strong>
                <?php } ?>
            </a>
        </div>
        <div class="site-header__overlay" aria-hidden="true"></div>
    </header>
</div>

<script>
function fsearchbox_submit(f)
{
    var stx = f.stx.value.trim();
    if (stx.length < 2) {
        alert("검색어는 두글자 이상 입력하십시오.");
        f.stx.select();
        f.stx.focus();
        return false;
    }
    var cnt = 0;
    for (var i = 0; i < stx.length; i++) {
        if (stx.charAt(i) == ' ') cnt++;
    }
    if (cnt > 1) {
        alert("빠른 검색을 위하여 검색어에 공백은 한개만 입력할 수 있습니다.");
        f.stx.select();
        f.stx.focus();
        return false;
    }
    f.stx.value = stx;
    return true;
}
</script>
<!-- } 상단 끝 -->

<hr>

<!-- 콘텐츠 시작 { -->
<div id="wrapper">
    <div id="container_wr">
    <div id="container">
        <?php if (!defined('_INDEX_')) { ?><h2 id="container_title"><span title="<?php echo get_text($g5['title']); ?>"><?php echo get_head_title($g5['title']); ?></span></h2><?php } ?>
