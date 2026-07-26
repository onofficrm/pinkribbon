<?php
include_once(dirname(__FILE__).'/_init.php');
include_once(G5_PATH.'/section/_helpers.php');

if (is_file(G5_PATH . '/_site.config.php')) {
    include_once G5_PATH . '/_site.config.php';
}

$company = function_exists('g5site_cfg') ? g5site_cfg('company_name', '원진하수구') : '원진하수구';
$phone = function_exists('g5site_cfg') ? g5site_cfg('phone', '') : '';
$tel = function_exists('g5site_tel_link') ? g5site_tel_link($phone) : '#';
$address = function_exists('g5site_cfg') ? g5site_cfg('address', '') : '';
$ceo = function_exists('g5site_cfg') ? g5site_cfg('ceo_name', '') : '';
$biz = function_exists('g5site_cfg') ? g5site_cfg('business_no', '') : '';
$main_kw = function_exists('g5site_cfg') ? g5site_cfg('main_keyword', '강동구하수구청소') : '강동구하수구청소';
$definition = '';
if (function_exists('g5site_public_profile')) {
    $profile = g5site_public_profile();
    $definition = isset($profile['siteDefinition']) ? (string) $profile['siteDefinition'] : '';
}
if ($definition === '') {
    $definition = $company . '는 ' . $main_kw . '를 중심으로 싱크대·배수구·정화조 청소와 악취·역류 점검을 상담합니다.';
}

$page_title = $company . ' 소개 | ' . $main_kw;
$page_description = $definition;
g5_page_start($page_title);
?>
<div class="page-template page-about">
  <header class="page-hero reveal">
    <div class="page-inner">
      <p class="page-eyebrow">About · <?php echo get_text($company); ?></p>
      <h1 class="page-title"><?php echo get_text($company); ?> 소개</h1>
      <p class="page-desc"><?php echo get_text($definition); ?></p>
    </div>
  </header>

  <section class="page-section page-section--vision reveal">
    <div class="page-inner">
      <h2 class="page-section__title">운영 원칙</h2>
      <p class="page-section__desc">과잉 공사 권유 없이, 필요한 청소·점검만 정확하게 안내합니다.</p>
      <div class="card-grid card-grid--3">
        <article class="base-card icon-card">
          <div class="icon-card__icon" aria-hidden="true">1</div>
          <h3 class="base-card-title">증상 먼저 확인</h3>
          <p class="base-card-desc">배수 느림·악취·역류 위치를 구분해 점검 방향을 설명합니다.</p>
        </article>
        <article class="base-card icon-card">
          <div class="icon-card__icon" aria-hidden="true">2</div>
          <h3 class="base-card-title">필요한 범위만</h3>
          <p class="base-card-desc">현장 상태에 맞는 청소·점검 범위를 안내하고, 불필요한 공사를 권하지 않습니다.</p>
        </article>
        <article class="base-card icon-card">
          <div class="icon-card__icon" aria-hidden="true">3</div>
          <h3 class="base-card-title">지역 밀착 상담</h3>
          <p class="base-card-desc">강동구 전 지역과 송파·광진·하남 인접 구간 상담이 가능합니다.</p>
        </article>
      </div>
    </div>
  </section>

  <section class="page-section page-section--story page-section--alt reveal">
    <div class="page-inner page-inner--split">
      <div class="page-section__text">
        <h2 class="page-section__title">사업자·연락 정보 (NAP)</h2>
        <p class="page-section__desc">검색·지도·사이트에 표시되는 상호·주소·전화는 아래와 동일하게 맞춰 주세요.</p>
        <ul class="page-list">
          <li>상호: <?php echo get_text($company); ?></li>
          <?php if ($ceo !== '') { ?><li>대표: <?php echo get_text($ceo); ?></li><?php } ?>
          <?php if ($address !== '') { ?><li>주소: <?php echo get_text($address); ?></li><?php } ?>
          <?php if ($phone !== '') { ?><li>전화: <?php echo get_text($phone); ?></li><?php } ?>
          <?php if ($biz !== '') { ?><li>사업자등록번호: <?php echo get_text($biz); ?></li><?php } ?>
        </ul>
      </div>
      <div class="page-section__media">
        <?php g5_sample_main_media('about.jpg', get_text($company) . ' 하수구청소 상담', 'page-section__img', 'wide'); ?>
      </div>
    </div>
  </section>

  <section class="page-section page-cta reveal">
    <div class="page-inner page-cta__inner">
      <h2 class="page-cta__title"><?php echo get_text($main_kw); ?>, 지금 상담하세요</h2>
      <p class="page-cta__desc">증상과 위치를 알려주시면 빠르게 안내합니다.</p>
      <div class="page-cta__actions">
        <?php if ($phone !== '') { ?>
        <a href="<?php echo $tel; ?>" class="btn btn-primary"><?php echo get_text($phone); ?> 전화상담</a>
        <?php } ?>
        <a href="<?php echo G5_URL; ?>/#inquiry-form" class="btn btn-outline">사진 보내고 상담</a>
        <a href="<?php echo G5_URL; ?>/page/service-sink.php" class="btn btn-outline">서비스 보기</a>
      </div>
    </div>
  </section>
</div>
<?php
g5_page_end();
