# 온오프빌더 강동구하수구막힘 랜딩페이지 플러그인

이 폴더의 파일들은 구글스튜디오 빌더에서 제작한 랜딩페이지를 **워드프레스 온오프빌더 컴포넌트**로 사용하기 위해 정리된 플러그인 코드입니다. 기존 워드프레스 테마와 CSS 충돌이 없도록 모든 클래스에 `gd-drain-` 접두어를 적용했습니다.

## 사용 방법

1. `wordpress-onoff-plugin` 폴더 전체를 워드프레스의 `/wp-content/plugins/` 디렉토리에 업로드합니다.
2. 워드프레스 관리자 [플러그인] 메뉴에서 **On-Off Builder Landing - 강동구하수구막힘** 플러그인을 활성화합니다.
3. 랜딩페이지를 띄울 페이지(또는 온오프빌더 에디터)에 아래 숏코드를 삽입합니다.

```text
[gd_drain_landing phone="010-1234-5678" kakao="https://pf.kakao.com/_xxxxxx" form='[contact-form-7 id="123" title="문의폼"]']
```

## SEO 적용 가이드 (Rank Math / Yoast SEO)

온오프빌더로 숏코드를 삽입한 워드프레스 페이지의 설정에서 아래와 같이 SEO 메타 데이터를 세팅하세요.

- **포커스 키워드 (Focus Keyword):** 강동구하수구막힘
- **SEO 제목 (SEO Title):** 강동구하수구막힘, 싱크대 변기 배수구 막힘 빠른 해결
- **메타 설명 (Meta Description):** 강동구 지역 하수구 막힘, 싱크대 막힘, 변기 막힘, 배수구 역류 문제 해결. 전문 내시경 장비 점검으로 원인을 파악하고 확실하게 뚫어드립니다. 24시간 상담 가능.

## 구조 설명
- `onoff-gd-drain.php`: 플러그인 메인 파일. 숏코드(`[gd_drain_landing]`)를 정의합니다.
- `includes/template.php`: 랜딩페이지의 핵심 HTML 구조가 들어있으며, 숏코드의 변수(`$phone_link`, `$kakao_link`, `$form_shortcode`)를 출력합니다.
- `assets/css/style.css`: 워드프레스 테마 충돌을 방지하는 전용 독립 CSS 파일입니다.
- `assets/js/script.js`: FAQ 아코디언 및 부드러운 앵커 이동 기능을 지원하는 가벼운 바닐라 자바스크립트입니다.
