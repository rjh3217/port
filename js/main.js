const tabs = document.querySelectorAll('.sc3 .btn_sc');
const projects = document.querySelectorAll('.sc3 .grid_box');

tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {

        tabs.forEach(function (btn) {
            btn.classList.remove('on');
        });

        this.classList.add('on');

        const category = this.id;

        projects.forEach(function (project) {
            if (category === 'all') {
                project.style.display = 'block';
            }
            else if (project.classList.contains(category)) {
                project.style.display = 'block';
            }
            else {
                project.style.display = 'none';
            }
        });
    });
});


const viewBtns = document.querySelectorAll('.sc4 .btn_wrap');
const modal = document.querySelector('.work_modal');
const modalImg = document.querySelector('.modal_img');
const modalClose = document.querySelector('.modal_close');

viewBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
        e.preventDefault();

        const image = this.dataset.image;

        modalImg.src = image;
        modal.classList.add('on');
    });
});

modalClose.addEventListener('click', function () {
    modal.classList.remove('on');
    modalImg.src = '';
});

modal.addEventListener('click', function (e) {
    if (e.target === modal) {
        modal.classList.remove('on');
        modalImg.src = '';
    }
});


// 글자 채워짐

const fillSpans = document.querySelectorAll('.scroll_fill span');

function fillText() {

    const windowHeight = window.innerHeight;

    fillSpans.forEach(function (span) {

        const rect = span.getBoundingClientRect();

        // 화면 아래에서 들어오기 시작
        const start = windowHeight;

        // 화면 중앙쯤 왔을 때 완전히 채워짐
        const end = windowHeight * 0.55;

        let progress = (start - rect.top) / (start - end);

        // 0 ~ 1 사이로 제한
        progress = Math.max(0, Math.min(1, progress));

        // 왼쪽 → 오른쪽으로 배경 채우기
        span.style.backgroundSize = `${progress * 100}% 100%`;
    });
}

window.addEventListener('scroll', fillText);
window.addEventListener('load', fillText);


// 타이핑 효과

const changeText = document.querySelector('.change_text');

const texts = ['PUBLISHING', 'DESIGN'];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typing() {

    const currentText = texts[textIndex];

    if (isDeleting) {
        // 한 글자씩 지우기
        changeText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;

    } else {
        // 한 글자씩 나타내기
        changeText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    // 단어를 다 입력했으면 잠시 기다렸다가 삭제
    if (!isDeleting && charIndex === currentText.length) {

        isDeleting = true;

        setTimeout(typing, 1500);
        return;
    }

    // 단어를 다 지웠으면 다음 단어로 변경
    if (isDeleting && charIndex === 0) {

        isDeleting = false;

        textIndex++;

        if (textIndex >= texts.length) {
            textIndex = 0;
        }
    }

    setTimeout(typing, isDeleting ? 150 : 250);
}

typing();

const scrollUps = document.querySelectorAll('.scroll_up');

function scrollUpEvent() {

    scrollUps.forEach(function (el) {

        // SC2의 me, training은 아래에서 따로 처리
        if (
            el.classList.contains('me') ||
            el.classList.contains('training')
        ) {
            return;
        }

        const rect = el.getBoundingClientRect();

        if (rect.top < window.innerHeight * 0.8) {
            el.classList.add('on');
        } else {
            el.classList.remove('on');
        }

    });

}

window.addEventListener('scroll', scrollUpEvent);
window.addEventListener('load', scrollUpEvent);

const scrollLines = document.querySelectorAll('.scroll_lines');

function scrollLinesEvent() {

    scrollLines.forEach(function (el) {

        // SC2 자기소개는 따로 처리
        if (el.classList.contains('onemin')) {
            return;
        }

        const rect = el.getBoundingClientRect();

        if (rect.top < window.innerHeight * 0.8) {
            el.classList.add('on');
        } else {
            el.classList.remove('on');
        }

    });

}

window.addEventListener('scroll', scrollLinesEvent);
window.addEventListener('load', scrollLinesEvent);

const sc2 = document.querySelector('.sc2');
const sc2Me = document.querySelector('.sc2 .me');
const sc2Intro = document.querySelector('.sc2 .onemin');
const sc2Training = document.querySelector('.sc2 .training');

let sc2Played = false;

function sc2ScrollEvent() {

    const rect = sc2.getBoundingClientRect();

    if (rect.top < window.innerHeight * 0.8 && !sc2Played) {

        sc2Played = true;

        // ① 안녕하세요
        sc2Me.classList.add('on');

        // ② 0.3초 후 자기소개
        setTimeout(function () {
            sc2Intro.classList.add('on');
        }, 500);

        // ③ 0.6초 후 교육
        setTimeout(function () {
            sc2Training.classList.add('on');
        }, 1000);

    }

}

window.addEventListener('scroll', sc2ScrollEvent);
window.addEventListener('load', sc2ScrollEvent);