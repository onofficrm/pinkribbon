<?php if (!defined('ABSPATH')) exit; ?>
<div class="gd-drain-wrapper">
    <!-- 모바일 하단 고정 바 -->
    <div class="gd-drain-mobile-bar">
        <a href="tel:<?php echo esc_attr($phone_link); ?>" class="gd-drain-btn-mobile gd-drain-bg-orange">
            <span class="gd-drain-text-sm">전화상담</span>
        </a>
        <a href="<?php echo esc_url($kakao_link); ?>" class="gd-drain-btn-mobile gd-drain-bg-yellow">
            <span class="gd-drain-text-sm" style="color:#191919">카톡상담</span>
        </a>
    </div>

    <!-- 헤더 -->
    <header class="gd-drain-header">
        <div class="gd-drain-container gd-drain-flex-between">
            <div class="gd-drain-logo">
                <span class="gd-drain-logo-mark">강</span>
                <div class="gd-drain-logo-text">
                    <strong>강동 하수구 해결센터</strong>
                    <span>강동구 전지역 하수구 막힘 상담</span>
                </div>
            </div>
            <a href="tel:<?php echo esc_attr($phone_link); ?>" class="gd-drain-header-btn">지금 상담하기</a>
        </div>
    </header>

    <!-- 히어로 섹션 -->
    <section class="gd-drain-section gd-drain-hero">
        <div class="gd-drain-container gd-drain-hero-grid">
            <div class="gd-drain-hero-text">
                <div class="gd-drain-badge">강동구 전지역 하수구 막힘 상담 가능</div>
                <h1 class="gd-drain-title"><span class="gd-drain-text-orange">강동구하수구막힘</span>,<br>지금 바로 상담하세요</h1>
                <p class="gd-drain-desc">싱크대 막힘부터 변기, 배수구, 하수구 역류까지<br>강동구 생활 배관 문제를 빠르게 확인하고 안내드립니다.</p>
                <ul class="gd-drain-checklist">
                    <li>강동구 지역 상담 가능</li>
                    <li>싱크대·변기·배수구 막힘 상담</li>
                    <li>하수구 역류·악취 증상 확인</li>
                    <li>현장 상황에 맞는 작업 안내</li>
                </ul>
                <div class="gd-drain-hero-btns">
                    <a href="tel:<?php echo esc_attr($phone_link); ?>" class="gd-drain-btn-primary">전화상담 바로가기</a>
                    <a href="#symptoms" class="gd-drain-btn-outline">막힘 증상 확인하기</a>
                </div>
            </div>
            <div class="gd-drain-hero-img">
                <img src="https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=800&auto=format&fit=crop" alt="강동구하수구막힘 전문 장비 상담">
            </div>
        </div>
    </section>

    <!-- 증상 체크 섹션 -->
    <section id="symptoms" class="gd-drain-section gd-drain-bg-gray">
        <div class="gd-drain-container">
            <div class="gd-drain-sec-header">
                <h2>이런 증상이 있다면 하수구 막힘 점검이 필요합니다</h2>
                <p>물이 천천히 내려가거나 악취, 역류 증상이 반복된다면 단순한 막힘이 아닐 수 있습니다.</p>
            </div>
            <div class="gd-drain-grid-4">
                <div class="gd-drain-card">
                    <h3>싱크대 물이 천천히 내려감</h3>
                    <p>기름때, 음식물 찌꺼기, 배관 내부 이물질로 인해 배수가 느려질 수 있습니다.</p>
                    <a href="tel:<?php echo esc_attr($phone_link); ?>" class="gd-drain-card-link">상담하기 ➔</a>
                </div>
                <div class="gd-drain-card">
                    <h3>변기 물이 시원하게 내려가지 않음</h3>
                    <p>휴지, 이물질, 배관 막힘 등 다양한 원인으로 변기 막힘이 발생할 수 있습니다.</p>
                    <a href="tel:<?php echo esc_attr($phone_link); ?>" class="gd-drain-card-link">상담하기 ➔</a>
                </div>
                <div class="gd-drain-card">
                    <h3>욕실 배수구에서 냄새가 올라옴</h3>
                    <p>배관 내부 오염, 트랩 문제, 역류 가능성 등을 확인해야 합니다.</p>
                    <a href="tel:<?php echo esc_attr($phone_link); ?>" class="gd-drain-card-link">상담하기 ➔</a>
                </div>
                <div class="gd-drain-card">
                    <h3>하수구에서 물이 역류함</h3>
                    <p>단순 막힘보다 더 심한 배관 문제일 수 있어 빠른 확인이 필요합니다.</p>
                    <a href="tel:<?php echo esc_attr($phone_link); ?>" class="gd-drain-card-link">상담하기 ➔</a>
                </div>
            </div>
        </div>
    </section>

    <!-- 서비스 섹션 -->
    <section id="services" class="gd-drain-section">
        <div class="gd-drain-container">
            <div class="gd-drain-sec-header">
                <h2>강동구 하수구 막힘 주요 상담 서비스</h2>
                <p>싱크대, 변기, 욕실 배수구, 하수구 역류까지 현장 증상에 맞춰 필요한 작업을 안내드립니다.</p>
            </div>
            <div class="gd-drain-grid-3">
                <div class="gd-drain-card">
                    <h3>강동구 싱크대 막힘</h3>
                    <p>음식물 찌꺼기, 기름때, 배관 내부 이물질로 인해 싱크대 물이 잘 내려가지 않을 때 상담 가능합니다.</p>
                    <a href="tel:<?php echo esc_attr($phone_link); ?>" class="gd-drain-btn-outline" style="width:100%; margin-top:20px;">싱크대 막힘 상담하기</a>
                </div>
                <div class="gd-drain-card">
                    <h3>강동구 변기 막힘</h3>
                    <p>휴지, 이물질, 배관 문제 등으로 변기 물이 내려가지 않거나 넘칠 때 증상 확인 후 안내드립니다.</p>
                    <a href="tel:<?php echo esc_attr($phone_link); ?>" class="gd-drain-btn-outline" style="width:100%; margin-top:20px;">변기 막힘 상담하기</a>
                </div>
                <div class="gd-drain-card">
                    <h3>강동구 배수구 막힘</h3>
                    <p>욕실, 베란다, 세탁실 배수구 막힘과 악취 문제를 현장 상황에 맞춰 상담합니다.</p>
                    <a href="tel:<?php echo esc_attr($phone_link); ?>" class="gd-drain-btn-outline" style="width:100%; margin-top:20px;">배수구 막힘 상담하기</a>
                </div>
            </div>
        </div>
    </section>

    <!-- 지역 안내 섹션 -->
    <section class="gd-drain-section gd-drain-bg-gray">
        <div class="gd-drain-container">
             <div class="gd-drain-sec-header">
                <h2>강동구 전지역 하수구 막힘 상담 가능</h2>
                <p>강동구 내 주거지역, 상가, 사무실, 음식점, 아파트, 빌라, 오피스텔 등 다양한 현장 상담이 가능합니다.</p>
            </div>
            <div class="gd-drain-tags">
                <span>천호동</span><span>성내동</span><span>길동</span><span>암사동</span><span>둔촌동</span><span>명일동</span><span>고덕동</span><span>상일동</span><span>강일동</span>
                <span>천호역 인근</span><span>강동역 인근</span><span>길동역 인근</span><span>암사역 인근</span>
            </div>
        </div>
    </section>

    <!-- FAQ 섹션 -->
    <section id="faq" class="gd-drain-section">
        <div class="gd-drain-container">
            <div class="gd-drain-sec-header">
                <h2>강동구하수구막힘 자주 묻는 질문</h2>
            </div>
            <div class="gd-drain-faq-wrap">
                <div class="gd-drain-faq-item">
                    <button class="gd-drain-faq-q">Q. 강동구 전지역 상담 가능한가요?</button>
                    <div class="gd-drain-faq-a"><p>A. 강동구 주요 지역의 하수구 막힘, 싱크대 막힘, 변기 막힘, 배수구 막힘 증상 상담이 가능합니다. 정확한 가능 여부는 위치와 시간에 따라 안내드립니다.</p></div>
                </div>
                <div class="gd-drain-faq-item">
                    <button class="gd-drain-faq-q">Q. 하수구 막힘 비용은 얼마인가요?</button>
                    <div class="gd-drain-faq-a"><p>A. 비용은 막힘 정도, 배관 구조, 필요한 장비, 작업 범위에 따라 달라질 수 있습니다. 상담 시 증상을 알려주시면 가능한 범위에서 안내드립니다.</p></div>
                </div>
                <div class="gd-drain-faq-item">
                    <button class="gd-drain-faq-q">Q. 밤이나 주말에도 상담 가능한가요?</button>
                    <div class="gd-drain-faq-a"><p>A. 긴급 상황은 상담 후 가능한 일정과 대응 여부를 안내드립니다.</p></div>
                </div>
            </div>
        </div>
    </section>

    <!-- 문의 폼 & 최종 CTA -->
    <section class="gd-drain-section gd-drain-bg-dark">
        <div class="gd-drain-container gd-drain-text-center">
            <h2 class="gd-drain-title-white" style="font-size:2.5rem; margin-bottom:20px;">강동구하수구막힘, 지금 증상만 알려주세요</h2>
            <p style="color:#cbd5e1; margin-bottom:40px; font-size:1.125rem;">물이 내려가지 않거나 냄새, 역류, 반복 막힘이 있다면 더 늦기 전에 상담해보세요.<br>현재 증상과 위치를 알려주시면 상황에 맞게 안내드립니다.</p>
            
            <div class="gd-drain-hero-btns" style="justify-content:center; margin-bottom: 50px;">
                <a href="tel:<?php echo esc_attr($phone_link); ?>" class="gd-drain-btn-primary">전화상담 바로가기</a>
                <a href="<?php echo esc_url($kakao_link); ?>" class="gd-drain-btn-outline" style="color:#fff; border-color:rgba(255,255,255,0.3); background:transparent;">카카오톡 상담하기</a>
            </div>

            <div class="gd-drain-form-wrap" style="background:#fff; padding:40px; border-radius:24px; color:#0f172a; text-align:left; max-width:600px; margin:0 auto;">
                <h3 style="margin-bottom:20px; font-size:1.25rem; font-weight:bold;">온라인 문의 작성</h3>
                <?php echo do_shortcode($form_shortcode); ?>
            </div>
        </div>
    </section>
</div>
