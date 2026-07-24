# 온오프빌더 플러그인 랜딩페이지 관리자 설정 가이드

본 문서는 "강동구하수구막힘" 랜딩페이지를 비롯하여 지역별 하수구 막힘 랜딩페이지를 워드프레스 관리자에서 직접 수정하고 관리할 수 있도록 설계된 데이터 구조 및 개발 가이드입니다.

---

## 1. 관리자 설정 필드 목록

관리자 화면은 탭이나 아코디언 형태로 아래 영역들을 구분하여 배치합니다.

### 1-1. 기본 정보 (Basic Info)
- **업체명**: 화면에 표시될 상호명 (예: 온오프설비)
- **대표 전화번호**: 실제 통화 연결에 사용될 번호 (`-` 생략 가능, 예: 01012345678)
- **화면 표시용 전화번호**: 사용자 화면에 보여질 번호 포맷 (예: 010-1234-5678)
- **카카오톡 상담 링크**: 카카오톡 오픈채팅 또는 채널 URL (예: https://pf.kakao.com/...)
- **문의폼 숏코드**: Contact Form 7, WPForms 등의 숏코드 (예: `[contact-form-7 id="123" title="문의"]`)
- **주소**: 사업장 주소 (Schema Markup 용도)
- **영업시간**: (예: 00:00-23:59 (연중무휴))
- **대표 이미지**: og:image 등에 사용될 이미지 URL
- **로고 이미지**: 헤더 등에 사용될 로고 이미지 URL (미입력 시 텍스트 로고 대체)

### 1-2. 페이지 정보 (Page Info)
- **지역명**: 랜딩페이지의 타겟 지역 (예: 강동구)
- **대표 키워드**: (예: 강동구하수구막힘)
- **페이지 제목**: H1 등에 쓰일 제목 (예: 강동구하수구막힘 상담)
- **SEO Title**: (예: 강동구하수구막힘 | 싱크대·변기·배수구·하수구역류 상담)
- **Meta Description**: 검색엔진 노출용 설명
- **URL Slug**: 접속 고유 주소 (예: gangdong-drain-clog)

### 1-3. CTA 설정 (CTA Settings)
- **상단 전화 버튼 문구**: (기본값: 지금 전화상담)
- **메인 전화 버튼 문구**: (기본값: 지금 전화상담)
- **카카오톡 버튼 문구**: (기본값: 카카오톡 상담)
- **문의하기 버튼 문구**: (기본값: 문의 남기기)
- **모바일 하단 버튼 노출 여부**: [체크박스] 노출함/숨김

### 1-4. 서비스 항목 (Service Repeater) - 최대 6개 권장
반복(Repeater) 필드로 구성하여 추가/수정/삭제 가능
- **서비스명**: (예: 강동구 싱크대 막힘)
- **설명**: (예: 음식물 찌꺼기, 기름때로 인한 막힘을 뚫어드립니다.)
- **포인트 (쉼표로 구분)**: (예: 물 빠짐 느림, 싱크대 냄새, 반복 막힘)
- **버튼 문구**: (예: 싱크대 막힘 상담하기)
- **아이콘**: 이모지 또는 이미지 URL

### 1-5. 지역명 태그 (Region Tags)
- **동네명 목록**: 쉼표(,)로 구분하여 입력 (예: 천호동, 성내동, 길동, 암사동...)

### 1-6. FAQ 항목 (FAQ Repeater)
반복(Repeater) 필드로 구성하여 추가/수정/삭제 가능
- **질문(Question)**: (예: 하수구 막힘 비용은 얼마인가요?)
- **답변(Answer)**: (예: 비용은 막힘 정도, 배관 구조 등에 따라 달라집니다...)

---

## 2. 데이터 저장 구조 (Data Storage)

워드프레스의 `wp_options` 테이블을 사용하되, 페이지별 확장을 위해 다차원 배열을 Serialize하여 저장합니다. Option Key는 `ob_landing_{slug}_settings` 형태로 구성합니다.

```php
// Option Key: ob_landing_gangdong-drain-clog_settings
$settings = [
    'basic_info' => [
        'company_name'   => '온오프배관설비',
        'phone_number'   => '01012345678',
        'phone_display'  => '010-1234-5678',
        'kakao_link'     => 'https://pf.kakao.com/_xxxxxx',
        'cf_shortcode'   => '[contact-form-7 id="123"]',
        'address'        => '서울특별시 강동구 천호동',
        'business_hours' => '24시간 연중무휴',
        'main_image'     => 'https://...',
        'logo_image'     => '',
    ],
    'page_info' => [
        'region_name'    => '강동구',
        'main_keyword'   => '강동구하수구막힘',
        'page_title'     => '강동구하수구막힘 상담',
        'seo_title'      => '강동구하수구막힘 | 싱크대·변기·배수구 상담',
        'meta_desc'      => '강동구하수구막힘 상담 페이지입니다...',
        'url_slug'       => 'gangdong-drain-clog',
    ],
    'cta_settings' => [
        'btn_header_phone'=> '지금 전화상담',
        'btn_hero_phone'  => '지금 전화상담',
        'btn_kakao'       => '카카오톡 상담',
        'btn_contact'     => '문의 남기기',
        'show_mobile_bar' => true,
    ],
    'services' => [
        [
            'title'  => '강동구 싱크대 막힘',
            'desc'   => '음식물 찌꺼기, 기름때로 인한 배수 불량...',
            'points' => '물 빠짐이 느림, 싱크대 냄새, 반복 막힘',
            'btn'    => '싱크대 막힘 상담하기',
        ],
        // ... (총 6개)
    ],
    'region_tags' => '천호동, 성내동, 길동, 암사동, 둔촌동, 명일동, 고덕동, 상일동, 강일동, 천호역, 강동역, 길동역, 암사역, 명일역, 고덕역, 상일동역',
    'faqs' => [
        [
            'q' => '강동구 전지역 상담 가능한가요?',
            'a' => '네, 강동구 전지역 출동 및 상담 가능합니다.',
        ],
        // ... (총 8개)
    ]
];
update_option('ob_landing_gangdong-drain-clog_settings', $settings);
```

---

## 3. 기본값 예시 (Defaults)

설정값이 비어있을 경우 적용할 기본값(Fallback) 배열을 준비합니다.

```php
$defaults = [
    'company_name' => '배관설비전문',
    'phone_number' => '15880000',
    'phone_display'=> '1588-0000',
    'kakao_link'   => '#',
    'region_name'  => '강동구',
    'show_mobile_bar' => true,
    'btn_header_phone' => '지금 상담하기',
];
// $value = !empty($settings['basic_info']['company_name']) ? $settings['basic_info']['company_name'] : $defaults['company_name'];
```

---

## 4. Shortcode에서 호출할 변수명 (HTML 치환용)

HTML 템플릿 내에서 아래 치환자(Merge Tags)를 사용합니다.

- `{{COMPANY_NAME}}`
- `{{PHONE_NUMBER}}`
- `{{PHONE_DISPLAY}}`
- `{{KAKAO_LINK}}`
- `{{CONTACT_FORM_SHORTCODE}}`
- `{{REGION_NAME}}`
- `{{REGION_TAGS_HTML}}` : 쉼표로 구분된 지역명을 `<span>` 태그로 감싸서 출력
- `{{SERVICES_HTML}}` : 서비스 리스트 루프 출력
- `{{FAQS_HTML}}` : FAQ 리스트 루프 출력
- `{{BTN_HEADER_PHONE}}`
- `{{MOBILE_BAR_CSS}}` : 노출 여부에 따라 `display: flex;` 또는 `display: none;` 출력

---

## 5. 랜딩페이지 HTML에서 변수 치환 방식

PHP의 `str_replace`를 활용하여 HTML 템플릿의 변수를 렌더링 시점에 치환합니다.

```php
// 1. 템플릿 파일 읽기
$html = file_get_contents( plugin_dir_path( __FILE__ ) . 'assets/templates/landing-template.html' );

// 2. 관리자 설정값 가져오기
$settings = get_option('ob_landing_gangdong-drain-clog_settings', []);

// 3. 변수 매핑
$replacements = [
    '{{COMPANY_NAME}}'  => esc_html($settings['basic_info']['company_name'] ?? '설비전문'),
    '{{PHONE_NUMBER}}'  => esc_attr(preg_replace('/[^0-9]/', '', $settings['basic_info']['phone_number'])),
    '{{PHONE_DISPLAY}}' => esc_html($settings['basic_info']['phone_display']),
    '{{KAKAO_LINK}}'    => esc_url($settings['basic_info']['kakao_link']),
    '{{REGION_NAME}}'   => esc_html($settings['page_info']['region_name']),
];

// 4. 숏코드 렌더링 처리
$cf_shortcode = $settings['basic_info']['cf_shortcode'] ?? '';
$replacements['{{CONTACT_FORM_SHORTCODE}}'] = do_shortcode(wp_kses_post($cf_shortcode));

// 5. 치환 적용
foreach ($replacements as $key => $value) {
    $html = str_replace($key, $value, $html);
}

// 6. 동적 반복 영역 (서비스, 태그, FAQ 등)은 별도 PHP 루프를 통해 문자열을 결합 후 치환
$tags_arr = explode(',', $settings['region_tags']);
$tags_html = '';
foreach($tags_arr as $tag) {
    $tags_html .= '<span class="ob-drain-tag">' . esc_html(trim($tag)) . '</span>';
}
$html = str_replace('{{REGION_TAGS_HTML}}', $tags_html, $html);

echo $html;
```

---

## 6. 보안 처리 주의사항 (Security)

1. **전화번호 링크**: `tel:` 프로토콜에 들어가는 전화번호는 해킹 방지 및 정상 작동을 위해 숫자만 남기도록 정규식을 사용합니다.
   - `preg_replace('/[^0-9]/', '', $phone)`
2. **URL 검증**: 카카오톡 링크나 이미지 URL 등은 출력 전 반드시 `esc_url()`을 거쳐야 XSS 공격을 방지할 수 있습니다.
3. **일반 텍스트**: 화면에 뿌려지는 모든 업체명, 지역명, 문구 등은 `esc_html()`을 사용합니다.
4. **숏코드 출력**: Contact Form 숏코드 자체를 저장하고 불러올 때는 `wp_kses_post()`로 허용된 HTML만 남긴 뒤, `do_shortcode()`를 실행해야 합니다.
5. **관리자 저장 검증**: `update_option` 실행 전 관리자가 폼으로 전송한 데이터는 `sanitize_text_field()` (배열인 경우 `array_map`)를 통해 정제해야 합니다.

---

## 7. 향후 다른 지역 랜딩페이지로 복제하는 방법 (확장성)

지역명만 바꿔서 랜딩페이지를 무한히 생성할 수 있는 구조입니다.

1. **Option Key 동적화**:
   - `ob_landing_{slug}_settings` 구조를 사용하므로, 관리자 화면에서 "새 랜딩페이지 추가" 버튼을 누르고 슬러그(예: `songpa-drain-clog`)를 입력합니다.
2. **기본 설정 복제 (Duplicate)**:
   - 강동구 설정(`ob_landing_gangdong-drain-clog_settings`)을 읽어와서, 배열 내부의 문자열 중 `강동구`를 `송파구`로 일괄 `str_replace` 처리합니다.
   - 변환된 배열을 `update_option('ob_landing_songpa-drain-clog_settings', $new_settings)`로 새롭게 저장합니다.
3. **URL 라우팅 (Rewrite Rule)**:
   - 워드프레스의 Rewrite Rule을 추가하여 `https://site.com/landing/songpa-drain-clog` 접속 시, 쿼리 파라미터 `?ob_slug=songpa-drain-clog`로 인식하게 합니다.
   - 페이지 로드 시 `ob_slug` 값을 기반으로 해당하는 Option Key를 불러와 HTML 템플릿에 동적 치환하여 화면을 렌더링합니다. (HTML 템플릿 파일은 단 1개만 유지 보수하면 됩니다.)
