<?php
if (!defined('_GNUBOARD_')) {
    exit;
}

/**
 * 시공사례 글보기 — 룩북형 이미지 + 본문(첨부 이미지 중복 제거)
 */
$g5b_gallery_images = array();

if (!empty($view['file']['count'])) {
    for ($i = 0; $i < count($view['file']); $i++) {
        if (!empty($view['file'][$i]['view'])) {
            $g5b_gallery_images[] = $view['file'][$i];
        }
    }
}

$g5b_view_content = $view['content'];
if (count($g5b_gallery_images) > 0) {
    // 첨부 갤러리로 이미 보여주므로 본문 img 중복 제거
    $g5b_view_content = preg_replace('/<img[^>]*>/i', '', $g5b_view_content);
    $g5b_view_content = preg_replace('/<(p|div)[^>]*>\s*<\/\1>/i', '', $g5b_view_content);
}
$g5b_view_content = get_view_thumbnail($g5b_view_content);
$g5b_view_text = trim(preg_replace('/\s+/', ' ', strip_tags($g5b_view_content)));
?>

<?php if (count($g5b_gallery_images) > 0) { ?>
<section class="cases-lookbook" id="bo_v_img" aria-label="시공 사진">
    <?php
    for ($i = 0; $i < count($g5b_gallery_images); $i++) {
        $file = $g5b_gallery_images[$i];
        $img_src = '';
        if (!empty($file['path']) && !empty($file['file'])) {
            $img_src = $file['path'] . '/' . $file['file'];
        }
        $img_alt = !empty($file['bf_content'])
            ? get_text($file['bf_content'])
            : (get_text(strip_tags($view['wr_subject'])) . ' 시공사진 ' . ($i + 1));
        $caption = !empty($file['bf_content']) ? get_text($file['bf_content']) : '';
        $href = !empty($file['href']) ? $file['href'] : $img_src;
    ?>
    <figure class="cases-lookbook__item<?php echo $i === 0 ? ' cases-lookbook__item--hero' : ''; ?>">
        <?php if ($img_src) { ?>
        <a href="<?php echo htmlspecialchars($href, ENT_QUOTES, 'UTF-8'); ?>" class="cases-lookbook__link view_image" target="_blank" rel="noopener noreferrer">
            <img src="<?php echo htmlspecialchars($img_src, ENT_QUOTES, 'UTF-8'); ?>" alt="<?php echo htmlspecialchars($img_alt, ENT_QUOTES, 'UTF-8'); ?>" class="cases-lookbook__img" loading="<?php echo $i === 0 ? 'eager' : 'lazy'; ?>">
        </a>
        <?php } else { ?>
        <div class="cases-lookbook__fallback"><?php echo get_file_thumbnail($file); ?></div>
        <?php } ?>
        <?php if ($caption !== '') { ?>
        <figcaption class="cases-lookbook__caption"><?php echo $caption; ?></figcaption>
        <?php } ?>
    </figure>
    <?php } ?>
</section>
<?php } else {
    $hero_thumb = get_list_thumbnail($bo_table, $view['wr_id'], 1200, 800, false, false);
    if (!empty($hero_thumb['src'])) {
        $alt = !empty($hero_thumb['alt']) ? get_text($hero_thumb['alt']) : get_text(strip_tags($view['wr_subject']));
?>
<div class="cases-lookbook cases-lookbook--single" id="bo_v_img">
    <figure class="cases-lookbook__item cases-lookbook__item--hero">
        <img src="<?php echo htmlspecialchars($hero_thumb['src'], ENT_QUOTES, 'UTF-8'); ?>" alt="<?php echo htmlspecialchars($alt, ENT_QUOTES, 'UTF-8'); ?>" class="cases-lookbook__img">
    </figure>
</div>
<?php
    }
}
?>

<?php if ($g5b_view_text !== '') { ?>
<div class="board-view__content-wrap cases-view__content-wrap">
    <div id="bo_v_con" class="board-view__content cases-view__content"><?php echo $g5b_view_content; ?></div>
</div>
<?php } else { ?>
<div id="bo_v_con" class="sound_only"></div>
<?php } ?>
