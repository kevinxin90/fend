/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 *
*/
const navbar_list = document.querySelector("#navbar__list")
const sections = document.querySelectorAll("section");

/**
 * End Global Variables
 * Start Helper Functions
 *
*/
const fetchNavigationItems = () => {
    let items = {};
    sections.forEach((section) => {
        items[section.getAttribute("id")] = section.getAttribute("data-nav");
    })
    return items;
};

// Get an element's distance from the top of the page
const getElemDistanceToTop = (elem) => {
    let location = 0;
    if (elem.offsetParent) {
        do {
            location += elem.offsetTop;
            elem = elem.offsetParent;
        } while (elem);
    }
    return location >= 0 ? location - window.pageYOffset : 0;
};

const getSectionClosestToTop = () => {
    let minY = Infinity;
    let activeSection;
    sections.forEach((section) => {
        if (getElemDistanceToTop(section) > 0 && getElemDistanceToTop(section) < minY) {
            minY = getElemDistanceToTop(section);
            activeSection = section;
        }
    })
    return activeSection;
}


/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
const populateNavigationMenu = () => {
    let items = fetchNavigationItems();
    let frag = document.createDocumentFragment();
    Object.keys(items).map(id => {
        let li = document.createElement('li');
        li.className = "menu__link";
        let a = document.createElement('a');
        a.textContent = items[id];
        a.href = "#" + id;
        li.appendChild(a);
        frag.appendChild(li);
    });
    navbar_list.appendChild(frag);
}


// Add class 'active' to section when near top of viewport
const setSectionActive = () => {
    let activeSection = getSectionClosestToTop();
    let currentActiveSections = document.querySelectorAll(".your-active-class");
    currentActiveSections.forEach((item) => {
        item.classList.remove('your-active-class');
    })
    activeSection.classList.add('your-active-class');
}


// Scroll to anchor ID using scrollTO event
const scrollToSection = (e) => {
    if (e.srcElement.nodeName === 'A') {
        e.preventDefault();
        let selectedSection = document.querySelector(e.srcElement.getAttribute("href"));
        selectedSection.scrollIntoView();
    }
}


/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu 
window.addEventListener('DOMContentLoaded', (event) => {
    populateNavigationMenu();
});
// Scroll to section on link click
navbar_list.addEventListener('click', scrollToSection)

// Set sections as active
document.addEventListener('scroll', setSectionActive)

