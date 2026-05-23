// DATA CUPANG YANG SUDAH DIBERI KATEGORI FILTER (solid, pattern, rare)
const bettaData = [
    {
        name: "Halfmoon",
        category: "solid",
        tag: "Solid Color Grade AAA",
        image: "Cupang4.jpg"
    },
    {
        name: "Halfmoon",
        category: "solid",
        tag: "Super red",
        image: "Cupang1.jpg"
    },
    {
        name: "avatar",
        category: "rare",
        tag: "Black",
        image: "Cupang5.jpg"
    },
    {
        name: "Plakat",
        category: "pattern",
        tag: "Multi-Color",
        image: "Cupang3.jpg"
    },
    {
        name: "Plakat",
        category: "pattern",
        tag: "Barong",
        image: "Cupang2.jpg"
    },
    {
        name: "Avatar",
        category: "rare",
        tag: "Cooper",
        image: "Cupang6.jpg"
    }
];

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. LOADING SCREEN TRANSITION
    const loader = document.getElementById("loading-screen");
    setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
    }, 1200);

    // 2. RENDER CARD SECARA OTOMATIS
    const gridContainer = document.getElementById("betta-grid");
    
    function renderCards(data) {
        gridContainer.innerHTML = ""; // Bersihkan kontainer
        data.forEach(fish => {
            const card = document.createElement("div");
            card.classList.add("betta-card");
            card.setAttribute("data-category", fish.category);
            
            // Memberikan style inline untuk memicu trigger CSS keyframe animation masuk
            card.style.animation = "cardEntrance 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards";
            
            card.innerHTML = `
                <img src="${fish.image}" alt="${fish.name}" class="betta-card-img" loading="lazy">
                <div class="betta-card-overlay">
                    <span class="betta-card-tag">${fish.tag}</span>
                    <h3 class="betta-card-title">${fish.name}</h3>
                </div>
            `;
            gridContainer.appendChild(card);
        });
    }

    // Panggil fungsi render awal
    renderCards(bettaData);

    // 3. FITUR FILTER SISTEM (INTERAKTIF & REAL-TIME)
    const filterButtons = document.querySelectorAll(".filter-btn");
    
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Ubah button aktif
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            
            const filterValue = button.getAttribute("data-filter");
            
            if (filterValue === "all") {
                renderCards(bettaData);
            } else {
                const filteredData = bettaData.filter(fish => fish.category === filterValue);
                renderCards(filteredData);
            }
        });
    });

    // 4. BACK TO HOME / BACK TO TOP FUNCTIONAL LOGO
    const logoButton = document.getElementById("back-to-home");
    logoButton.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        
        // Reset menu navigasi aktif ke 'Home'
        document.querySelectorAll(".nav-link").forEach(link => link.classList.remove("active"));
        document.querySelector(".nav-link[href='#']").classList.add("active");
    });

    // 5. STICKY NAVBAR CONTROL
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 6. RESPONSIVE MOBILE HAMBURGER
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // 7. SCROLL REVEAL ANIMATION (ANIMASI SAAT LAYER DI SCROLL DOWN)
    const revealElements = document.querySelectorAll(".scroll-reveal");
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < window.innerHeight - 100) {
                el.classList.add("active");
            }
        });
    };
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Jalankan sekali di awal load

    // 8. COUNTER ANIMATION FOR STATS SECTION
    const statsSection = document.querySelector(".stats-section");
    const counters = document.querySelectorAll(".stat-number");
    let counterActivated = false;

    const startCounting = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute("data-target");
            const speed = target / 80;
            const updateCount = () => {
                const count = +counter.innerText;
                if (count < target) {
                    counter.innerText = Math.ceil(count + speed);
                    setTimeout(updateCount, 25);
                } else {
                    counter.innerText = target + (target > 100 ? "+" : "");
                }
            };
            updateCount();
        });
    };

    window.addEventListener("scroll", () => {
        if(!statsSection) return;
        const sectionTop = statsSection.getBoundingClientRect().top;
        if(sectionTop < window.innerHeight - 100 && !counterActivated) {
            startCounting();
            counterActivated = true;
        }
    });
});
