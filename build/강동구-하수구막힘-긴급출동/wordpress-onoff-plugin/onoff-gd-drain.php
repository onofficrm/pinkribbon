<?php
/**
 * Plugin Name: On-Off Builder Landing - 강동구하수구막힘
 * Plugin URI:  https://example.com
 * Description: 온오프빌더 워드프레스 전용 독립 랜딩페이지 컴포넌트 플러그인
 * Version:     1.0.0
 * Author:      AI Studio Builder
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // 직접 접근 방지
}

// 에셋 로드 (CSS, JS)
function gd_drain_enqueue_assets() {
    wp_enqueue_style( 'gd-drain-style', plugin_dir_url( __FILE__ ) . 'assets/css/style.css', array(), '1.0.0' );
    wp_enqueue_script( 'gd-drain-script', plugin_dir_url( __FILE__ ) . 'assets/js/script.js', array(), '1.0.0', true );
}
add_action( 'wp_enqueue_scripts', 'gd_drain_enqueue_assets' );

// 숏코드 등록: [gd_drain_landing]
function gd_drain_landing_shortcode( $atts ) {
    $attributes = shortcode_atts( array(
        'phone' => '010-1234-5678',
        'kakao' => 'https://pf.kakao.com/_xxxxxx',
        'form'  => '[contact-form-7 id="123" title="문의폼"]'
    ), $atts );

    $phone_number = $attributes['phone'];
    $phone_link   = preg_replace('/[^0-9]/', '', $phone_number);
    $kakao_link   = $attributes['kakao'];
    $form_shortcode = $attributes['form'];

    ob_start();
    include plugin_dir_path( __FILE__ ) . 'includes/template.php';
    return ob_get_clean();
}
add_shortcode( 'gd_drain_landing', 'gd_drain_landing_shortcode' );
