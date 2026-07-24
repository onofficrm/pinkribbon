const fs = require('fs');

let html = fs.readFileSync('wordpress-onoff-plugin/gangdong-drain-clog.html', 'utf8');

// 1. Header
html = html.replace(
  '<a href="tel:{{PHONE_NUMBER}}" class="ob-drain-header-btn">지금 상담하기</a>',
  '<a href="tel:{{PHONE_NUMBER}}" class="ob-drain-header-btn" data-cta="phone-header">지금 전화상담</a>'
);

// 2. Hero
html = html.replace(
  '<a href="tel:{{PHONE_NUMBER}}" class="ob-drain-btn-primary">📞 {{PHONE_DISPLAY}} 상담하기</a>',
  '<a href="tel:{{PHONE_NUMBER}}" class="ob-drain-btn-primary" data-cta="phone-hero">지금 전화상담</a>'
);
html = html.replace(
  '<a href="#ob-drain-symptoms" class="ob-drain-btn-outline">막힘 증상 확인하기</a>',
  '<a href="#ob-drain-symptoms" class="ob-drain-btn-outline" data-cta="scroll-symptoms">막힘 증상 확인하기</a>'
);

// 3. Symptoms (8 cards)
html = html.replaceAll(
  '<a href="tel:{{PHONE_NUMBER}}" class="ob-drain-link">상담하기 ➔</a>',
  '<a href="tel:{{PHONE_NUMBER}}" class="ob-drain-link" data-cta="phone-symptom">지금 전화상담 ➔</a>'
);

// 4. Services
html = html.replace(
  '<a href="tel:{{PHONE_NUMBER}}" class="ob-drain-btn-block">싱크대 막힘 상담하기</a>',
  '<a href="tel:{{PHONE_NUMBER}}" class="ob-drain-btn-block" data-cta="phone-service-sink">싱크대 막힘 상담하기</a>'
);
html = html.replace(
  '<a href="tel:{{PHONE_NUMBER}}" class="ob-drain-btn-block">변기 막힘 상담하기</a>',
  '<a href="tel:{{PHONE_NUMBER}}" class="ob-drain-btn-block" data-cta="phone-service-toilet">변기 막힘 상담하기</a>'
);
html = html.replace(
  '<a href="tel:{{PHONE_NUMBER}}" class="ob-drain-btn-block">배수구 막힘 상담하기</a>',
  '<a href="tel:{{PHONE_NUMBER}}" class="ob-drain-btn-block" data-cta="phone-service-drain">배수구 막힘 상담하기</a>'
);
html = html.replace(
  '<a href="tel:{{PHONE_NUMBER}}" class="ob-drain-btn-block">하수구 역류 상담하기</a>',
  '<a href="tel:{{PHONE_NUMBER}}" class="ob-drain-btn-block" data-cta="phone-service-reverse">하수구 역류 상담하기</a>'
);
html = html.replace(
  '<a href="tel:{{PHONE_NUMBER}}" class="ob-drain-btn-block">배관 청소 상담하기</a>',
  '<a href="tel:{{PHONE_NUMBER}}" class="ob-drain-btn-block" data-cta="phone-service-clean">배관 청소 상담하기</a>'
);
html = html.replace(
  '<a href="tel:{{PHONE_NUMBER}}" class="ob-drain-btn-block">상가 하수구 상담하기</a>',
  '<a href="tel:{{PHONE_NUMBER}}" class="ob-drain-btn-block" data-cta="phone-service-shop">상가 하수구 상담하기</a>'
);

// 5. Equipment
html = html.replace(
  '<a href="tel:{{PHONE_NUMBER}}" class="ob-drain-btn-primary">반복 막힘 상담하기</a>',
  '<a href="tel:{{PHONE_NUMBER}}" class="ob-drain-btn-primary" data-cta="phone-equip">지금 전화상담</a>'
);

// 6. Process
html = html.replace(
  '<a href="tel:{{PHONE_NUMBER}}" class="ob-drain-btn-primary">지금 작업 상담하기</a>',
  '<a href="tel:{{PHONE_NUMBER}}" class="ob-drain-btn-primary" data-cta="phone-process">지금 전화상담</a>'
);

// 7. Area
html = html.replace(
  '<a href="tel:{{PHONE_NUMBER}}" class="ob-drain-btn-primary" style="background-color: #ffffff; color: #f97316; width: 100%; margin-top: 24px;">출동 가능 지역 상담하기</a>',
  '<a href="tel:{{PHONE_NUMBER}}" class="ob-drain-btn-primary" data-cta="phone-area" style="background-color: #ffffff; color: #f97316; width: 100%; margin-top: 24px;">지금 전화상담</a>'
);

// 8. Final CTA
html = html.replace(
  '<a href="tel:{{PHONE_NUMBER}}" class="ob-drain-btn-primary">📞 {{PHONE_DISPLAY}} 바로 연결</a>',
  '<a href="tel:{{PHONE_NUMBER}}" class="ob-drain-btn-primary" data-cta="phone-final">지금 전화상담</a>'
);
html = html.replace(
  '<a href="{{KAKAO_LINK}}" class="ob-drain-btn-white-outline">카카오톡 상담하기</a>',
  '<a href="{{KAKAO_LINK}}" class="ob-drain-btn-white-outline" data-cta="kakao-final">카카오톡 상담</a>'
);
html = html.replace(
  '<a href="#ob-drain-contact" class="ob-drain-btn-white-outline">문의폼 작성하기</a>',
  '<a href="#ob-drain-contact" class="ob-drain-btn-white-outline" data-cta="contact-final">문의 남기기</a>'
);

// 9. Mobile Bottom Bar
html = html.replace(
  `  <!-- Mobile Bottom Bar -->
  <div class="ob-drain-mobile-bar">
    <a href="tel:{{PHONE_NUMBER}}" class="ob-drain-mobile-btn ob-drain-mobile-call">
      전화상담
    </a>
    <a href="{{KAKAO_LINK}}" class="ob-drain-mobile-btn ob-drain-mobile-kakao">
      카카오톡
    </a>
  </div>`,
  `  <!-- Mobile Bottom Bar -->
  <div class="ob-drain-mobile-bar">
    <a href="tel:{{PHONE_NUMBER}}" class="ob-drain-mobile-btn ob-drain-mobile-call" data-cta="phone-floating">
      지금 전화상담
    </a>
    <a href="{{KAKAO_LINK}}" class="ob-drain-mobile-btn ob-drain-mobile-kakao" data-cta="kakao-floating">
      카카오톡 상담
    </a>
    <a href="#ob-drain-contact" class="ob-drain-mobile-btn ob-drain-mobile-contact" data-cta="contact-floating">
      문의 남기기
    </a>
  </div>`
);

// 10. Contact Form Section
const formSectionOld = `<div class="ob-drain-form-box">
        <h3>온라인 문의 작성</h3>
        <!-- 온오프빌더 숏코드 렌더링 영역 -->
        {{CONTACT_FORM_SHORTCODE}}
      </div>`;

const formSectionNew = `<div class="ob-drain-form-box">
        <h3>강동구하수구막힘 문의하기</h3>
        <p style="color: #64748b; margin-bottom: 24px; font-size: 0.95rem;">현재 증상과 위치를 남겨주시면 확인 후 상담을 도와드립니다.</p>
        
        <!-- 온오프빌더 숏코드 렌더링 영역 (Contact Form 7 / WPForms) -->
        <div class="ob-drain-form-wrapper">
          {{CONTACT_FORM_SHORTCODE}}
        </div>

        <!-- 숏코드가 없을 때 표시될 폼 UI (예시 및 퍼블리싱 용도) -->
        <div class="ob-drain-form-demo" style="display:none;">
          <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 700; font-size: 0.95rem;">이름</label>
            <input type="text" placeholder="이름을 입력해주세요" style="width: 100%; padding: 12px 16px; border: 1px solid #e2e8f0; border-radius: 8px; font-family: inherit;">
          </div>
          <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 700; font-size: 0.95rem;">연락처</label>
            <input type="tel" placeholder="연락처를 입력해주세요" style="width: 100%; padding: 12px 16px; border: 1px solid #e2e8f0; border-radius: 8px; font-family: inherit;">
          </div>
          <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 700; font-size: 0.95rem;">지역</label>
            <input type="text" placeholder="예: 강동구 천호동" style="width: 100%; padding: 12px 16px; border: 1px solid #e2e8f0; border-radius: 8px; font-family: inherit;">
          </div>
          <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 700; font-size: 0.95rem;">막힘 위치</label>
            <select style="width: 100%; padding: 12px 16px; border: 1px solid #e2e8f0; border-radius: 8px; font-family: inherit; background-color: #fff;">
              <option value="">선택해주세요</option>
              <option value="싱크대">싱크대</option>
              <option value="변기">변기</option>
              <option value="욕실 배수구">욕실 배수구</option>
              <option value="베란다/세탁실 배수구">베란다/세탁실 배수구</option>
              <option value="하수구 역류">하수구 역류</option>
              <option value="상가/음식점 배관">상가/음식점 배관</option>
              <option value="기타">기타</option>
            </select>
          </div>
          <div style="margin-bottom: 24px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 700; font-size: 0.95rem;">증상 내용</label>
            <textarea placeholder="예: 싱크대 물이 천천히 내려가고 냄새가 올라옵니다." rows="4" style="width: 100%; padding: 12px 16px; border: 1px solid #e2e8f0; border-radius: 8px; font-family: inherit; resize: vertical;"></textarea>
          </div>
          <div style="margin-bottom: 24px;">
            <label style="display: flex; align-items: center; gap: 8px; font-size: 0.9rem; color: #475569; cursor: pointer;">
              <input type="checkbox" checked> 개인정보 수집 및 이용에 동의합니다.
            </label>
          </div>
          <button type="button" class="ob-drain-btn-primary" data-cta="contact-submit" style="width: 100%; border: none;">문의 남기기</button>
        </div>
      </div>`;

html = html.replace(formSectionOld, formSectionNew);

fs.writeFileSync('wordpress-onoff-plugin/gangdong-drain-clog.html', html);
console.log('Replacements completed.');
