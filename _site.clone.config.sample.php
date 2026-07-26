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
 */
if (!defined('_GNUBOARD_')) {
    exit;
}

return array(
    /* =========================================================
     * [공통 유지] — 복사 사이트 전부 동일
     * 홈 히어로·헤더·하단바·CTA에 크게 표시되고 tel: 링크로 연결됩니다.
     * ========================================================= */
    'phone' => '010-4265-2634',
    'ceo_name' => '김배관',
    'business_no' => '123-45-67890',
    'email' => 'help@example.com',
    'builder_project_id' => 'gangdong-drain',

    /* =========================================================
     * [사이트마다 변경] — 지역 SEO용
     * ========================================================= */
    'region_name' => '송파구',
    'region_short' => '송파',
    'region_initial' => '송',
    'company_name' => '송파 하수구 해결센터',
    'address' => '서울특별시 송파구 00로 00',

    'site_name' => '송파구 하수구막힘 긴급출동',
    'site_desc' => '송파구 전 지역 하수구, 싱크대, 변기 막힘 긴급 상담',
    'seo_title' => '송파구 하수구막힘 긴급출동',
    'seo_description' => '송파구 전 지역 하수구, 싱크대, 변기 막힘 긴급출동 서비스',
    'main_keyword' => '송파구하수구막힘',
    'sub_keywords' => array(
        '송파구 싱크대 막힘',
        '송파구 변기 막힘',
        '송파구 배수구 막힘',
        '송파구 하수구 긴급출동',
    ),
    'footer_desc' => '송파구 하수구·싱크대·변기 막힘 긴급출동',

    /* 지역 선택·동별 랜딩. 고정 URL이 없으면 /page/local.php?area=slug 사용 */
    'local_areas' => array(
        array('slug' => 'jamsil', 'name' => '잠실동', 'label' => '잠실동 하수구막힘', 'url' => '/page/local.php?area=jamsil'),
        array('slug' => 'songpa', 'name' => '송파동', 'label' => '송파동 하수구막힘', 'url' => '/page/local.php?area=songpa'),
        array('slug' => 'garak', 'name' => '가락동', 'label' => '가락동 하수구막힘', 'url' => '/page/local.php?area=garak'),
    ),
    'area_spots' => array(
        '잠실역 인근', '송파나루역 인근', '가락시장역 인근',
    ),

    /* 표시용 후기 — 지역별로 문구를 바꿔 중복 콘텐츠를 줄입니다 */
    'reviews' => array(
        array(
            'area' => '잠실동',
            'title' => '싱크대 막힘 빠른 상담',
            'body' => '물이 안 내려가서 급했는데 전화 상담이 바로 연결됐습니다.',
            'rating' => 5,
        ),
        array(
            'area' => '송파동',
            'title' => '욕실 배수 악취 해결',
            'body' => '원인을 자세히 설명해 주시고 필요한 작업만 안내해 주셨습니다.',
            'rating' => 5,
        ),
    ),
);
