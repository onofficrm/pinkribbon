# 지역 SEO 사이트 복제 가이드

같은 디자인과 **동일 상담전화(`010-4265-2634`)** 를 유지하면서, 지역·키워드만 다른 사이트를 복제하는 절차입니다.

## 핵심 원칙

- 복사 사이트의 공개 변수는 루트의 **`_site.clone.config.php` 한 파일에서만 수정**합니다.
- 새 사이트 시작 시 **`_site.clone.config.sample.php`를 복사**해 `_site.clone.config.php`로 저장한 뒤 값을 바꿉니다.
- React/Vite 재빌드 없이 홈 화면·대형 전화 CTA·SEO 메타가 반영됩니다.
- `phone` 값만 바꾸면 히어로·헤더·하단바·모든 전화 버튼 문구/번호가 함께 바뀝니다.
- API 키·DB 비밀번호·토큰은 이 파일에 넣지 않습니다.

## 1. FTP 백업에 반드시 포함할 파일

```text
/_site.clone.config.php
/_site.clone.config.sample.php
/_site.config.php
/SITE-CLONE-GUIDE.md
/plugin/onoff-builder-bridge/data/imports.json
/plugin/onoff-builder-bridge/imports/gangdong-drain/
/page/
/proc/
/data/                       서버 실제 폴더 전체
```

특히 `data/`에는 다음이 들어갑니다.

- `data/dbconfig.php`: DB 접속 정보
- `data/file/`: 게시판·문의 첨부파일
- `data/icrm.config.php`: 사이트별 iCRM 토큰(사용 중인 경우)
- `data/onoff-builder.config.php`: 라이선스·API 설정(사용 중인 경우)

FTP 파일만으로 게시글·회원·게시판 설정은 복원되지 않습니다. **MySQL DB도 별도 SQL로 백업**하세요.

## 2. 새 사이트에서 수정할 파일

`/_site.clone.config.php`

### 공통 유지 (전 사이트 동일)

```php
'phone' => '010-4265-2634',
'builder_project_id' => 'gangdong-drain',
```

이 번호는 홈 첫 화면과 CTA에 **크게 표시**되고, 클릭 시 `tel:01042652634`로 연결됩니다.

### 사이트마다 변경 (지역 SEO)

```php
'region_name'     => '송파구',
'region_short'    => '송파',
'region_initial'  => '송',
'company_name'    => '송파 하수구 해결센터',
'address'         => '서울특별시 송파구 00로 00',

'site_name'       => '송파구 하수구막힘 긴급출동',
'site_desc'       => '...',
'seo_title'       => '송파구 하수구막힘 긴급출동',
'seo_description' => '...',
'main_keyword'    => '송파구하수구막힘',
'sub_keywords'    => array(
    '송파구 싱크대 막힘',
    '송파구 변기 막힘',
    '송파구 배수구 막힘',
),
```

`local_areas`, `area_spots`, `reviews`도 같은 파일에서 지역별로 교체합니다.

빠른 시작:

```bash
cp _site.clone.config.sample.php _site.clone.config.php
# 그다음 region / SEO / local_areas 만 수정
```

## 3. 빌더 디자인 폴더

```php
'builder_project_id' => 'gangdong-drain',
```

가장 간단한 방법은 **복사본 모두 이 ID와 폴더명을 유지**하는 것입니다.

```text
/plugin/onoff-builder-bridge/imports/gangdong-drain/
```

ID를 바꾸려면 아래가 일치해야 합니다.

1. `_site.clone.config.php`의 `builder_project_id`
2. `plugin/onoff-builder-bridge/data/imports.json`의 `id`, `path`
3. `plugin/onoff-builder-bridge/imports/{ID}/` 폴더명

## 4. 지역 상세 랜딩

고정 URL 예:

```text
/page/local-cheonho.php
```

공용 URL(설정 slug만 사용, 새 PHP 불필요):

```text
/page/local.php?area=jamsil
```

```php
array(
    'slug' => 'jamsil',
    'name' => '잠실동',
    'label' => '잠실동 하수구막힘',
    'url' => '/page/local.php?area=jamsil',
),
```

고정 URL이 필요하면:

```php
<?php
$local_dong_slug = 'jamsil';
include_once dirname(__FILE__) . '/_local-drain-home.php';
```

## 5. 새 서버 복원 순서

1. FTP 백업 업로드 + DB SQL 복원
2. `data/dbconfig.php`를 새 DB로 변경
3. `data/cache/`, `data/session/` 비우기
4. `_site.clone.config.php`에서 지역·SEO 수정 (`phone`은 공통 유지)
5. 관리자 비밀번호 변경, 사이트 URL 확인
6. `data/icrm.config.php`는 복사하지 말고 새 토큰 발급
7. 문의·시공사례 개인정보/원본 데이터 정리
8. 홈 소스에서 `window.__SITE_CONFIG__.phone` = `010-4265-2634` 확인
9. 전화 버튼·사진 문의·지역 페이지 테스트
10. sitemap·검색콘솔 등록

## 6. 복사본에 그대로 두지 말 것

- DB 계정·비밀번호
- 관리자 비밀번호
- iCRM 토큰
- 분리 집계가 필요하면 GA4/GTM/픽셀
- 원본 문의 게시판 개인정보

## 7. 확인 체크

페이지 소스에서:

```html
<title>...</title>
<meta name="description" ...>
<link rel="canonical" ...>
<script>window.__SITE_CONFIG__=... "phone":"010-4265-2634" ...</script>
```

화면에서:

- 히어로에 `010-4265-2634`가 크게 보이는지
- 헤더·모바일 하단바 클릭 시 전화 앱이 열리는지
- 지역명·SEO title이 새 지역으로 바뀌었는지
