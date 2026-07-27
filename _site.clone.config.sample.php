<?php
/**
 * 지역 SEO 사이트 복제 템플릿
 *
 * 사용법:
 * 1. 이 파일을 `_site.clone.config.php` 로 복사
 * 2. [사이트마다 변경] 블록만 지역·키워드에 맞게 수정
 * 3. [공통 유지] 블록의 전화번호는 전 사이트 동일하게 유지
 *
 * React 재빌드 없이 홈 CTA·SEO 메타·지역 목록에 반영됩니다.
 * 고유 FAQ·intro는 area_content 에 지역별 작성하세요.
 */
if (!defined('_GNUBOARD_')) {
    exit;
}

return array(
    /* =========================================================
     * [공통 유지] — 복사 사이트 전부 동일
     * ========================================================= */
    'phone' => '010-4265-2634',
    'ceo_name' => '김원진',
    'business_no' => '123-45-67890',
    'email' => 'help@example.com',
    'builder_project_id' => 'gangdong-drain',

    /* =========================================================
     * [사이트마다 변경] — 지역 SEO용 (브랜드·메인키워드 축)
     * ========================================================= */
    'region_name' => '송파구',
    'region_short' => '송파',
    'region_initial' => '원',
    'company_name' => '원진하수구',
    'address' => '서울특별시 송파구 00로 00',

    'site_name' => '원진하수구',
    'site_desc' => '송파구하수구청소 전문 원진하수구. 싱크대·배수구·정화조 청소 상담',
    'seo_title' => '송파구하수구청소 | 원진하수구',
    'seo_description' => '원진하수구의 송파구하수구청소. 싱크대·배수구·변기·정화조 청소와 악취·역류 점검을 상담합니다.',
    'main_keyword' => '송파구하수구청소',
    'sub_keywords' => array(
        '송파구 싱크대청소',
        '송파구 배수구청소',
        '송파구 변기막힘',
        '송파구 하수구역류',
    ),
    'footer_desc' => '원진하수구 · 송파구하수구청소 · 싱크대·배수구·정화조 청소 상담',

    'site_definition' => '원진하수구는 지역 하수구청소를 중심으로 싱크대·배수구·정화조 청소와 악취·역류 점검을 상담합니다.',
    'opening_hours' => 'Mo-Su 00:00-23:59',
    'price_range' => '상담 후 안내',
    'how_to_name' => '하수구가 막혔을 때 대처 방법',
    'how_to_steps' => array(
        array('name' => '물 사용을 잠시 멈춘다', 'text' => '역류·넘침이 있으면 물을 더 내리지 않습니다.'),
        array('name' => '증상 위치를 확인한다', 'text' => '싱크대·욕실·변기·외부 배수 중 어디인지 구분합니다.'),
        array('name' => '사진과 함께 상담한다', 'text' => '증상 사진을 보내면 안내가 빨라집니다.'),
    ),
    'home_faqs' => array(
        array('q' => '하수구청소는 어디서 받나요?', 'a' => '원진하수구에서 지역 하수구청소 상담이 가능합니다.'),
    ),
    'service_hubs' => array(
        array('slug' => 'sink', 'name' => '싱크대청소', 'label' => '싱크대청소', 'url' => '/page/service-sink.php', 'hero_line' => '주방 배수 청소', 'intro' => '싱크대청소 상담', 'faqs' => array()),
        array('slug' => 'drain', 'name' => '배수구청소', 'label' => '배수구청소', 'url' => '/page/service-drain.php', 'hero_line' => '배수구 청소', 'intro' => '배수구청소 상담', 'faqs' => array()),
        array('slug' => 'septic', 'name' => '정화조청소', 'label' => '정화조청소', 'url' => '/page/service-septic.php', 'hero_line' => '정화조 청소', 'intro' => '정화조청소 상담', 'faqs' => array()),
    ),

    'local_areas' => array(
        array('slug' => 'jamsil', 'name' => '잠실동', 'label' => '잠실동 하수구청소', 'clog_label' => '잠실동 하수구막힘', 'url' => '/page/local.php?area=jamsil'),
        array('slug' => 'songpa', 'name' => '송파동', 'label' => '송파동 하수구청소', 'clog_label' => '송파동 하수구막힘', 'url' => '/page/local.php?area=songpa'),
        array('slug' => 'garak', 'name' => '가락동', 'label' => '가락동 하수구청소', 'clog_label' => '가락동 하수구막힘', 'url' => '/page/local.php?area=garak'),
    ),
    'neighbor_areas' => array(
        array('slug' => 'gangdong', 'name' => '강동구', 'label' => '강동구하수구청소', 'clog_label' => '강동구하수구막힘', 'url' => '/page/local.php?area=gangdong'),
    ),
    'area_spots' => array(
        '잠실역 인근', '송파나루역 인근', '가락시장역 인근',
    ),
    'area_content' => array(
        'jamsil' => array(
            'hero_line' => '잠실동 대단지·상권 배수 청소',
            'intro' => '잠실동 하수구청소는 단지·상가 배수 문의가 많습니다. 원진하수구가 증상별 청소·점검을 안내합니다.',
            'faqs' => array(
                array('q' => '잠실동 아파트도 가능한가요?', 'a' => '네. 세대 내부 배수 청소 상담이 가능합니다.'),
            ),
        ),
    ),

    'reviews' => array(
        array(
            'area' => '잠실동',
            'title' => '싱크대 배수 청소 상담',
            'body' => '물이 안 내려가서 급했는데 전화 상담이 바로 연결됐습니다.',
            'rating' => 5,
        ),
        array(
            'area' => '송파동',
            'title' => '욕실 배수 악취 개선',
            'body' => '원인을 자세히 설명해 주시고 필요한 청소만 안내해 주셨습니다.',
            'rating' => 5,
        ),
    ),
);
