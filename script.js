const themeToggle = document.getElementById("theme_toggle");
const body = document.querySelector('body');
const themePreference = localStorage.getItem("theme");
const lightIcon = "stuff/light_mode.svg"
const darkIcon = "stuff/dark_mode.svg"
const menuToggle = document.querySelector('.menu');
const sideBar = document.querySelector(".sidebar");
const sideBarLinks = document.querySelectorAll(".sidebar a");
const headerHeight = document.querySelector('header').offsetHeight;

sideBarLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = link.getAttribute('href').substring(1);

        const targetElement = document.getElementById(targetId);
        const scrollPoisition = (targetElement.offsetTop - headerHeight) - 10;
        window.scrollTo({
            top: scrollPoisition,
            behavior: 'smooth'
        });
    });
});

function toggleDark() {
    document.body.classList.remove("light-theme");
    document.body.classList.add("dark-theme");
    themeToggle.src = darkIcon;
    themeToggle.setAttribute('title', "Toggle Light Mode")
}

function toggleLight() {
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme")
    themeToggle.src = lightIcon;
    themeToggle.setAttribute('title', "Toggle Dark Mode")
}

window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change',({ matches }) => {
        if (matches) {
            toggleDark();
        } else {
            toggleLight();
        }
    })

body.addEventListener('click', (event) => {
    if (sideBar.classList.contains('sidebarActive') && !event.target.isSameNode(menuToggle)) {
        if (!event.target.closest('.sidebar')) {
            sideBar.classList.remove('sidebarActive');
        }
    }
})


menuToggle.addEventListener('click', (event) => {
    sideBar.classList.toggle('sidebarActive');
})


themeToggle.addEventListener('click', () => {
    if (document.body.classList.contains("dark-theme")) {
        toggleLight();
    } else {
        document.body.classList.toggle('dark-theme')
        toggleDark();
    }
})

window.addEventListener('scroll', function() {
    var sections = document.querySelectorAll('.section,.subsection,.sub-subsection,.sub-sub-section');
    var sidebarLinks = document.querySelectorAll('.sidebar a');

    for (var i = 0; i < sections.length; i++) {
        var section = sections[i];
        var sectionTop = (section.offsetTop - headerHeight) - 15;
        var sectionBottom = sectionTop + section.offsetHeight;  


        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom)  
 {
            var link = sidebarLinks[i];
            link.classList.add('active');
        } else {
            var link = sidebarLinks[i];
            link.classList.remove('active');
        }
    }
});

function copyCode(codeID) {
    var text = document.getElementById(codeID).innerHTML;
    navigator.clipboard.writeText(text);
}