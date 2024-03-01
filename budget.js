document.addEventListener("DOMContentLoaded", function () {
    const featuresSection = document.querySelector('.features');
    const featuresOffset = featuresSection.offsetTop - window.innerHeight + 100; // Adjust the offset as needed

    function toggleFeatures() {
        if (window.scrollY > featuresOffset) {
            featuresSection.classList.add('visible');
        } else {
            featuresSection.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', toggleFeatures);

    // Initial check in case the user starts below the offset
    toggleFeatures();
});
