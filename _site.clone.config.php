<?php
/**
 * 사이트 복제 전용 설정 (이 파일만 사이트마다 수정)
 *
 * - [공통 유지] phone: 전 사이트 동일. 홈·CTA에 크게 표시 + 클릭 시 tel 연결
 * - [사이트마다 변경] 지역명·SEO·동 목록·후기
 * - React/Vite 재빌드 불필요. 샘플: `_site.clone.config.sample.php`
 * - 절차: SITE-CLONE-GUIDE.md
 */
if (!defined('_GNUBOARD_')) {
    exit;
}

return array(
    /* =========================================================
     * [공통 유지] — 복사본에도 그대로 둡니다
     * ========================================================= */
    'phone' => '010-4265-2634',
    'ceo_name' => '김배관',
    'business_no' => '123-45-67890',
    'email' => 'help@example.com',
    'builder_project_id' => 'gangdong-drain',

    /* =========================================================
     * [사이트마다 변경] — 지역 SEO
     * ========================================================= */
    'region_name' => '강동구',
    'region_short' => '강동',
    'region_initial' => '강',
    'company_name' => '강동 하수구 해결센터',
    'address' => '서울특별시 강동구 천호대로 00길 00',

    'site_name' => '강동구 하수구막힘 긴급출동',
    'site_desc' => '강동구 전 지역 하수구, 싱크대, 변기 막힘 긴급 상담',
    'seo_title' => '강동구 하수구막힘 긴급출동',
    'seo_description' => '강동구 전 지역 하수구, 싱크대, 변기 막힘 긴급출동 서비스',
    'main_keyword' => '강동구하수구막힘',
    'sub_keywords' => array(
        '강동구 싱크대 막힘',
        '강동구 변기 막힘',
        '강동구 배수구 막힘',
        '강동구 하수구 긴급출동',
    ),
    'footer_desc' => '강동구 하수구·싱크대·변기 막힘 긴급출동',

    /* 지역 선택·동별 랜딩 */
    'local_areas' => array(
        array('slug' => 'cheonho', 'name' => '천호동', 'label' => '천호동 하수구막힘', 'url' => '/page/local-cheonho.php'),
        array('slug' => 'seongnae', 'name' => '성내동', 'label' => '성내동 하수구막힘', 'url' => '/page/local-seongnae.php'),
        array('slug' => 'gil', 'name' => '길동', 'label' => '길동 하수구막힘', 'url' => '/page/local-gil.php'),
        array('slug' => 'amsa', 'name' => '암사동', 'label' => '암사동 하수구막힘', 'url' => '/page/local-amsa.php'),
        array('slug' => 'dunchon', 'name' => '둔촌동', 'label' => '둔촌동 하수구막힘', 'url' => '/page/local-dunchon.php'),
        array('slug' => 'myeongil', 'name' => '명일동', 'label' => '명일동 하수구막힘', 'url' => '/page/local-myeongil.php'),
        array('slug' => 'godeok', 'name' => '고덕동', 'label' => '고덕동 하수구막힘', 'url' => '/page/local-godeok.php'),
        array('slug' => 'sangil', 'name' => '상일동', 'label' => '상일동 하수구막힘', 'url' => '/page/local-sangil.php'),
        array('slug' => 'gangil', 'name' => '강일동', 'label' => '강일동 하수구막힘', 'url' => '/page/local-gangil.php'),
    ),
    'area_spots' => array(
        '천호역 인근', '강동역 인근', '길동역 인근', '둔촌동역 인근',
        '암사역 인근', '명일역 인근', '고덕역 인근', '상일동역 인근',
    ),

    /* 표시용 후기 — 복사본에서는 지역에 맞게 교체 */
    'reviews' => array(
        array(
            'area' => '천호동',
            'title' => '싱크대 막힘 당일 해결',
            'body' => '물이 안 내려가서 급했는데, 증상만 말씀드려도 바로 안내해 주셨어요. 작업 후 배수도 정상입니다.',
            'rating' => 5,
        ),
        array(
            'area' => '길동',
            'title' => '욕실 배수구 악취 해결',
            'body' => '냄새 때문에 고생했는데 원인을 자세히 설명해 주시고 필요한 작업만 진행해 주셨습니다.',
            'rating' => 5,
        ),
        array(
            'area' => '암사동',
            'title' => '하수구 역류 긴급 상담',
            'body' => '밤에 역류가 와서 불안했는데 바로 상담이 됐고, 현장 상황에 맞게 안내받았습니다.',
            'rating' => 5,
        ),
        array(
            'area' => '성내동',
            'title' => '음식점 주방 배수 막힘',
            'body' => '영업 전에 급하게 연락드렸는데 대응이 빨랐어요. 사진 보내고 상담하니 더 수월했습니다.',
            'rating' => 5,
        ),
    ),
);
