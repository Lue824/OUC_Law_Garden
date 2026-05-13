/**
 * 海大法苑 - 交互脚本
 */

document.addEventListener('DOMContentLoaded', function () {

    // ========== DOM 元素 ==========
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('backToTop');

    // ========== 导航栏滚动效果 ==========
    function updateNavScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // ========== 返回顶部按钮 ==========
    function updateBackToTop() {
        if (window.scrollY > 600) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ========== 导航高亮（滚动监听） ==========
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        let current = '';
        const scrollPos = window.scrollY + 100;

        sections.forEach(function (section) {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    // ========== 合并滚动处理 ==========
    let scrollTicking = false;
    window.addEventListener('scroll', function () {
        if (!scrollTicking) {
            requestAnimationFrame(function () {
                updateNavScroll();
                updateBackToTop();
                updateActiveNav();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    });

    // ========== 移动端菜单切换 ==========
    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('open');
        document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    // 点击导航链接关闭菜单
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // ========== FAQ 手风琴 ==========
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(function (item) {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function () {
            // 关闭同分类下其他展开的项
            const category = item.closest('.faq-category');
            const siblings = category.querySelectorAll('.faq-item.open');
            siblings.forEach(function (sibling) {
                if (sibling !== item) {
                    sibling.classList.remove('open');
                }
            });
            // 切换当前项
            item.classList.toggle('open');
        });
    });

    // ========== FAQ 分类切换 ==========
    const faqTabs = document.querySelectorAll('.faq-tab');
    const faqCategories = document.querySelectorAll('.faq-category');

    faqTabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            const category = this.getAttribute('data-category');

            // 更新 tab 状态
            faqTabs.forEach(function (t) { t.classList.remove('active'); });
            this.classList.add('active');

            // 切换分类
            faqCategories.forEach(function (cat) { cat.classList.remove('active'); });
            var target = document.getElementById('cat-' + category);
            if (target) {
                target.classList.add('active');
            }
        });
    });

    // ========== 背景图自动检测 ==========
    var heroBg = document.getElementById('heroBg');
    if (heroBg) {
        var testImg = new Image();
        testImg.onload = function () {
            heroBg.classList.remove('no-image');
        };
        testImg.onerror = function () {
            // 图片不存在，保持 no-image 状态，显示默认渐变
        };
        // 获取 CSS 中的背景图 URL
        var bgStyle = getComputedStyle(heroBg).backgroundImage;
        var urlMatch = bgStyle.match(/url\(['"]?([^'"()]+)['"]?\)/);
        if (urlMatch) {
            testImg.src = urlMatch[1];
        }
    }

    // ========== 初始状态修复 ==========
    updateNavScroll();
    updateBackToTop();
    updateActiveNav();

});
