document.addEventListener("DOMContentLoaded", () => {
    const buttonContainer = document.querySelector(".button-container");

    window.addEventListener("scroll", () => {
        let scrollTop = window.scrollY || document.documentElement.scrollTop;

        if (scrollTop > 50) {
            // Trigger fade-out effect when scrolling
            buttonContainer.style.animation = "fadeOutContainer 0.3s ease-out forwards";
        } else {
            // Reset to fade-in effect when at the top
            buttonContainer.style.animation = "fadeInContainer 0.6s ease-out 0.4s forwards";
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    let lastScrollY = window.scrollY; // Store last scroll position

    function revealOnScroll() {
        let elements = document.querySelectorAll(
            ".testimonial-heading, .testimonial-subhead, .testimonial-text, .testimonial-container, .testimonial-box, .testimonial-profile, .testimonial-info"
        );

        let windowHeight = window.innerHeight;
        let currentScrollY = window.scrollY;

        // Check if user is scrolling up or down
        elements.forEach((element, index) => {
            let position = element.getBoundingClientRect().top;

            if (position < windowHeight - 50 || currentScrollY < lastScrollY) { // Trigger reveal when scrolling up
                setTimeout(() => {
                    element.classList.add("reveal");
                }, index * 100); // Optional stagger effect
            }
        });

        lastScrollY = currentScrollY; // Update the scroll position for the next scroll event
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Run once on page load
});

/*--------------------
Vars
--------------------*/
let progress = 50
let startX = 0
let active = 0
let isDown = false

/*--------------------
Contants
--------------------*/
const speedWheel = 0.02
const speedDrag = -0.1

/*--------------------
Get Z
--------------------*/
const getZindex = (array, index) => (array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i)))

/*--------------------
Items
--------------------*/
const $items = document.querySelectorAll('.carousel-item')
const $cursors = document.querySelectorAll('.cursor')

const displayItems = (item, index, active) => {
    const zIndex = getZindex([...$items], active)[index]
    item.style.setProperty('--zIndex', zIndex)
    item.style.setProperty('--active', (index - active) / $items.length)
}

/*--------------------
Animate
--------------------*/
const animate = () => {
    progress = Math.max(0, Math.min(progress, 100))
    active = Math.floor(progress / 100 * ($items.length - 1))

    $items.forEach((item, index) => displayItems(item, index, active))
}
animate()

/*--------------------
Click on Items
--------------------*/
$items.forEach((item, i) => {
    item.addEventListener('click', () => {
        progress = (i / $items.length) * 100 + 10
        animate()
    })
})

/*--------------------
Handlers
--------------------*/
const handleWheel = e => {
    const wheelProgress = e.deltaY * speedWheel
    progress = progress + wheelProgress
    animate()
}

const handleMouseMove = (e) => {
    if (e.type === 'mousemove') {
        $cursors.forEach(($cursor) => {
            $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
        })
    }
    if (!isDown) return
    const x = e.clientX || (e.touches && e.touches[0].clientX) || 0
    const mouseProgress = (x - startX) * speedDrag
    progress = progress + mouseProgress
    startX = x
    animate()
}

const handleMouseDown = e => {
    isDown = true
    startX = e.clientX || (e.touches && e.touches[0].clientX) || 0
}

const handleMouseUp = () => {
    isDown = false
}

/*--------------------
Listeners
--------------------*/
document.addEventListener('mousewheel', handleWheel)
document.addEventListener('mousedown', handleMouseDown)
document.addEventListener('mousemove', handleMouseMove)
document.addEventListener('mouseup', handleMouseUp)
document.addEventListener('touchstart', handleMouseDown)
document.addEventListener('touchmove', handleMouseMove)
document.addEventListener('touchend', handleMouseUp)