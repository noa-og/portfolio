//portfolio_script

// Tabs Navigation
            function opentab(evt, tabName) {
                var i, tabcontent, tablinks;
        
                tabcontent = document.getElementsByClassName("tabcontent");
                    for (i = 0; i < tabcontent.length; i++) {
                        tabcontent[i].style.display = "none";
                    }
                tablinks = document.getElementsByClassName("tablinks");
                    for (i = 0; i < tablinks.length; i++) {
                        tablinks[i].className = tablinks[i].className.replace(" active", "");
                    }
                document.getElementById(tabName).style.display = "block";
            evt.currentTarget.className += " active";
            }
            document.getElementById('defaultTab').click();

// Slideshows

// Opening Modal
function openModal(id, group, startIndex) {
    const modal = document.getElementById(id);

    activeModal = modal;
    activeGroup = group;

    slideIndexes[group] = startIndex;

    modal.style.display = "flex";

    requestAnimationFrame(() => {
        modal.classList.add("show");
    });

    renderSlides(group);
}

// Closing Modal
function closeModal(modal) {
    modal.classList.remove("show");

    setTimeout(() => {
        modal.style.display = "none";
    }, 300);
}

window.addEventListener("click", function (event) {
    if (event.target.classList.contains("modal")) {
        closeModal(event.target);
    }
});

const slideIndexes = {};

// Slides
function renderSlides(group) {
    const slides = document.getElementsByClassName(group);

    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }

    slides[slideIndexes[group] - 1].classList.add("active");
}

// Navigation
function plusSlides(group, n) {
    const slides = document.getElementsByClassName(group);

    slideIndexes[group] += n;

    if (slideIndexes[group] > slides.length) slideIndexes[group] = 1;
    if (slideIndexes[group] < 1) slideIndexes[group] = slides.length;

    renderSlides(group);
}

// Keyboard navigation
let activeModal = null;
let activeGroup = null;

window.addEventListener("keydown", function (e) {
    if (!activeModal) return;

    if (e.key === "ArrowRight") {
        plusSlides(activeGroup, 1);
    }

    if (e.key === "ArrowLeft") {
        plusSlides(activeGroup, -1);
    }

    if (e.key === "Escape") {
        closeModal(activeModal);
        activeModal = null;
        activeGroup = null;
    }
});

//Swipe navigation
let touchStartX = 0;
let touchEndX = 0;

document.querySelectorAll(".modal-content").forEach(content => {

    content.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX;
    });

    content.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    });

});

function handleSwipe() {
    const threshold = 50; // minimum distance in px

    const diff = touchEndX - touchStartX;

    if (Math.abs(diff) < threshold) return; // ignore small swipes

    if (diff < 0) {
        // Swipe left → next
        plusSlides(activeGroup, 1);
    } else {
        // Swipe right → previous
        plusSlides(activeGroup, -1);
    }
}