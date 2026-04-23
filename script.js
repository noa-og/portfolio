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
            function openModal(id, group, startIndex) {
                const modal = document.getElementById(id);

                activeModal = modal;
                activeGroup = group;

                modal.style.display = "flex";

                requestAnimationFrame(() => {
                    modal.classList.add("show");
                });

                showSlides(group, startIndex);
            }

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

            function showSlides(group, n) {
                const slides = document.getElementsByClassName(group);

                // If first time OR direct jump → set index
                if (!slideIndexes[group] || n !== 1 && n !== -1) {
                    slideIndexes[group] = n;
                } else {
                    slideIndexes[group] += n;
                }

                if (slideIndexes[group] > slides.length) slideIndexes[group] = 1;
                if (slideIndexes[group] < 1) slideIndexes[group] = slides.length;

                for (let i = 0; i < slides.length; i++) {
                    slides[i].style.display = "none";
                }

                slides[slideIndexes[group] - 1].style.display = "block";
            }

            function plusSlides(group, n) {
                showSlides(group, n);
            }

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