<?php
if (!defined('_GNUBOARD_')) {
    exit;
}
include_once(G5_LIB_PATH.'/thumbnail.lib.php');

add_stylesheet('<link rel="stylesheet" href="'.$board_skin_url.'/style.css">', 0);
?>

<script src="<?php echo G5_JS_URL; ?>/viewimageresize.js"></script>

<article class="board-wrap board-wrap--cases-gallery board-view board-view--gallery board-view--cases-gallery" id="bo_v" style="width:<?php echo $width; ?>">

    <header class="board-view__head cases-view__head">
        <p class="cases-view__eyebrow">CASE STUDY</p>
        <?php if ($category_name) { ?>
        <span class="bo_v_cate board-view__cate cases-view__cate"><?php echo $view['ca_name']; ?></span>
        <?php } ?>
        <h2 class="board-title cases-view__title" id="bo_v_title">
            <span class="bo_v_tit board-title__text"><?php echo get_text($view['wr_subject']); ?></span>
        </h2>
        <div class="cases-view__meta" id="bo_v_info">
            <ul class="cases-view__stats">
                <li><time datetime="<?php echo date('c', strtotime($view['wr_datetime'])); ?>"><?php echo date('Y.m.d', strtotime($view['wr_datetime'])); ?></time></li>
                <li>조회 <?php echo number_format($view['wr_hit']); ?></li>
                <?php if ((int) $view['wr_comment'] > 0) { ?>
                <li><a href="#bo_vc">댓글 <?php echo number_format($view['wr_comment']); ?></a></li>
                <?php } ?>
            </ul>
            <div class="cases-view__toolbar" id="bo_v_top">
                <a href="<?php echo $list_href; ?>" class="cases-view__list-btn">목록</a>
                <?php if ($update_href || $delete_href || $copy_href || $move_href || $search_href || $reply_href || $write_href) { ?>
                <div class="cases-view__admin">
                    <?php if ($write_href) { ?><a href="<?php echo $write_href; ?>">글쓰기</a><?php } ?>
                    <?php if ($update_href) { ?><a href="<?php echo $update_href; ?>">수정</a><?php } ?>
                    <?php if ($delete_href) { ?><a href="<?php echo $delete_href; ?>" onclick="del(this.href); return false;">삭제</a><?php } ?>
                    <?php if ($copy_href) { ?><a href="<?php echo $copy_href; ?>" onclick="board_move(this.href); return false;">복사</a><?php } ?>
                    <?php if ($move_href) { ?><a href="<?php echo $move_href; ?>" onclick="board_move(this.href); return false;">이동</a><?php } ?>
                </div>
                <?php } ?>
            </div>
        </div>
    </header>

    <section class="board-view__body board-view__body--gallery cases-view__body" id="bo_v_atc">
        <h2 class="sound_only" id="bo_v_atc_title">본문</h2>

        <?php include_once(G5_SKIN_PATH.'/board/_inc/g5b-gallery-view.php'); ?>

        <?php if ($is_signature) { ?><div class="board-view__signature"><?php echo $signature; ?></div><?php } ?>
    </section>

    <?php
    $cnt = 0;
    if (!empty($view['file']['count'])) {
        for ($i = 0; $i < count($view['file']); $i++) {
            if (!empty($view['file'][$i]['source']) && empty($view['file'][$i]['view'])) {
                $cnt++;
            }
        }
    }
    ?>
    <?php if ($cnt) { ?>
    <section id="bo_v_file" class="board-view__files cases-view__files">
        <h3 class="board-view__section-title">첨부파일</h3>
        <ul>
        <?php
        for ($i = 0; $i < count($view['file']); $i++) {
            if (!empty($view['file'][$i]['source']) && empty($view['file'][$i]['view'])) {
        ?>
            <li>
                <a href="<?php echo $view['file'][$i]['href']; ?>" class="view_file_download">
                    <strong><?php echo $view['file'][$i]['source']; ?></strong>
                    <span>(<?php echo $view['file'][$i]['size']; ?>)</span>
                </a>
            </li>
        <?php
            }
        }
        ?>
        </ul>
    </section>
    <?php } ?>

    <?php if (isset($view['link']) && array_filter($view['link'])) { ?>
    <section id="bo_v_link" class="board-view__links cases-view__links">
        <h3 class="board-view__section-title">관련링크</h3>
        <ul>
        <?php
        for ($i = 1; $i <= count($view['link']); $i++) {
            if (!empty($view['link'][$i])) {
        ?>
            <li><a href="<?php echo $view['link_href'][$i]; ?>" target="_blank" rel="noopener noreferrer"><?php echo cut_str($view['link'][$i], 70); ?></a></li>
        <?php
            }
        }
        ?>
        </ul>
    </section>
    <?php } ?>

    <?php if ($prev_href || $next_href) { ?>
    <nav class="bo_v_nb board-view__nav cases-view__nav" aria-label="이전다음 글">
        <?php if ($prev_href) { ?>
        <a class="cases-view__nav-item cases-view__nav-item--prev" href="<?php echo $prev_href; ?>">
            <span class="cases-view__nav-label">이전 사례</span>
            <strong><?php echo $prev_wr_subject; ?></strong>
        </a>
        <?php } else { ?>
        <span class="cases-view__nav-item is-empty"></span>
        <?php } ?>
        <?php if ($next_href) { ?>
        <a class="cases-view__nav-item cases-view__nav-item--next" href="<?php echo $next_href; ?>">
            <span class="cases-view__nav-label">다음 사례</span>
            <strong><?php echo $next_wr_subject; ?></strong>
        </a>
        <?php } else { ?>
        <span class="cases-view__nav-item is-empty"></span>
        <?php } ?>
    </nav>
    <?php } ?>

    <div class="cases-view__footer-actions">
        <a href="<?php echo $list_href; ?>" class="cases-view__back">시공사례 목록으로</a>
    </div>

    <?php include_once(G5_BBS_PATH.'/view_comment.php'); ?>
</article>

<script>
<?php if ($board['bo_download_point'] < 0) { ?>
$(function() {
    $("a.view_file_download").click(function() {
        if (!g5_is_member) { alert("다운로드 권한이 없습니다."); return false; }
        if (confirm("파일 다운로드 시 포인트가 차감됩니다. 계속하시겠습니까?")) {
            $(this).attr("href", $(this).attr("href") + "&js=on");
            return true;
        }
        return false;
    });
});
<?php } ?>
function board_move(href) {
    window.open(href, "boardmove", "left=50, top=50, width=500, height=550, scrollbars=1");
}
</script>
<script>
$(function() {
    $("a.view_image").click(function() {
        window.open(this.href, "large_image", "location=yes,links=no,toolbar=no,top=10,left=10,width=10,height=10,resizable=yes,scrollbars=no,status=no");
        return false;
    });
    $("#bo_v_atc").viewimageresize();
});
</script>
