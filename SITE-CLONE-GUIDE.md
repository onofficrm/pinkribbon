# 지역 SEO 사이트 복제 가이드

같은 디자인과 전화번호를 유지하면서 지역·키워드가 다른 사이트를 복제하는 절차입니다.

## 핵심 원칙

- 복사 사이트의 공개 변수는 루트의 **`_site.clone.config.php` 한 파일에서만 수정**합니다.
- React/Vite 디자인은 동일한 빌드 파일을 사용합니다. 지역명·전화·회사정보·후기·지역 목록을 바꿀 때 다시 빌드하지 않습니다.
- 메인 `<title>`, description, keywords, canonical, Open Graph, LocalBusiness 구조화 데이터도 위 설정에서 서버가 자동 생성합니다.
- API 키·DB 비밀번호·토큰은 이 파일에 넣지 않습니다.

## 1. FTP 백업에 반드시 포함할 파일

```text
/_site.clone.config.php
/_site.config.php
/plugin/onoff-builder-bridge/data/imports.json
/plugin/onoff-builder-bridge/imports/gangdong-drain/
/page/
/proc/
/data/                       서버 실제 폴더 전체
```

특히 `data/`에는 FTP 파일 외에 다음 운영 데이터가 들어갑니다.

- `data/dbconfig.php`: DB 접속 정보
- `data/file/`: 게시판·문의 첨부파일
- `data/icrm.config.php`: 사이트별 iCRM 토큰(사용 중인 경우)
- `data/onoff-builder.config.php`: 라이선스·API 설정(사용 중인 경우)

FTP 파일만으로 게시글·회원·게시판 설정은 복원되지 않습니다. **MySQL DB도 별도 SQL 파일로 백업**해야 합니다.

## 2. 새 사이트에서 수정할 단 하나의 공개 설정 파일

`/_site.clone.config.php`

사이트마다 다음 항목을 수정합니다.

```php
'region_name'     => '송파구',
'region_short'    => '송파',
'region_initial'  => '송',
'company_name'    => '송파 하수구 해결센터',
'phone'           => '010-1234-5678', // 6개 사이트 동일
'address'         => '새 사이트 주소',

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

`local_areas`, `area_spots`, `reviews`도 같은 파일 안에서 지역별로 교체합니다.

## 3. 빌더 디자인 폴더

기본값은 다음과 같습니다.

```php
'builder_project_id' => 'gangdong-drain',
```

가장 간단한 방법은 **6개 사이트 모두 이 ID와 폴더명을 그대로 유지**하는 것입니다.

```text
/plugin/onoff-builder-bridge/imports/gangdong-drain/
```

ID를 바꾸고 싶다면 아래 세 곳이 일치해야 합니다.

1. `_site.clone.config.php`의 `builder_project_id`
2. `plugin/onoff-builder-bridge/data/imports.json`의 `id`, `path`
3. `plugin/onoff-builder-bridge/imports/{ID}/` 폴더명

이미지 URL은 런타임 `assetBase`로 만들어지므로 React 코드를 수정할 필요가 없습니다.

## 4. 지역 상세 랜딩

기존의 검색 친화형 고정 URL:

```text
/page/local-cheonho.php
```

공용 URL(새 PHP 파일 없이 설정의 slug만 사용):

```text
/page/local.php?area=cheonho
```

`local_areas`의 각 항목에 `url`을 지정할 수 있습니다.

```php
array(
    'slug' => 'jamsil',
    'name' => '잠실동',
    'label' => '잠실동 하수구막힘',
    'url' => '/page/local.php?area=jamsil',
),
```

동별 SEO 고정 URL을 별도로 노출하려면 `page/local-jamsil.php` 파일을 추가하고 아래처럼 slug만 지정합니다.

```php
<?php
$local_dong_slug = 'jamsil';
include_once dirname(__FILE__) . '/_local-drain-home.php';
```

지역명과 메타는 `_site.clone.config.php`에서 자동으로 가져옵니다.

## 5. 새 서버 복원 순서

1. 새 호스팅에 FTP 백업 전체 업로드
2. 새 DB 생성 후 SQL 백업 복원
3. `data/dbconfig.php`를 새 DB 정보로 변경
4. `data/cache/`, `data/session/`의 임시 파일 삭제
5. `_site.clone.config.php`의 지역·SEO·회사정보 수정
6. 관리자 기본환경의 사이트 URL을 새 도메인으로 변경
7. iCRM 사용 시 `data/icrm.config.php`를 복사하지 말고 사이트별 새 토큰 발급
8. 홈 소스에서 title·description·canonical과 `window.__SITE_CONFIG__` 확인
9. 전화 버튼, 사진 문의, 첨부파일 업로드, 지역 페이지 테스트
10. 새 도메인의 sitemap·robots·검색콘솔 등록

## 6. 복사본별로 재사용하면 안 되는 것

- DB 접속 계정·비밀번호
- 관리자 비밀번호
- iCRM 사이트 토큰
- GA4/GTM/픽셀 ID(사이트를 분리 집계할 경우)
- 검색콘솔 소유권 파일
- 문의 게시판의 기존 개인정보와 테스트 데이터

## 7. 메인 SEO 출력 확인

브라우저에서 페이지 소스 보기를 열어 다음 항목이 복사 사이트 값인지 확인합니다.

```html
<title>...</title>
<meta name="description" ...>
<meta name="keywords" ...>
<link rel="canonical" ...>
<meta property="og:title" ...>
<script>window.__SITE_CONFIG__=...</script>
<script type="application/ld+json">...</script>
```

이 구조에서는 `_site.clone.config.php`를 수정하면 PHP가 매 요청마다 메타와 화면 변수를 주입하므로 React 재빌드가 필요하지 않습니다.
