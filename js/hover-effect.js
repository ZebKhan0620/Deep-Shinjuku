// Integrate with existing functionality
function initializeHoverEffects() {
  // Section 1 hover effect
  const rightImageContainer = document.querySelector(".right-image-container");
  const section1TextElements = document.querySelectorAll(".section-1-hover .text-container [class*='group-hover']");
  const readMoreButton1 = rightImageContainer?.querySelector("a");

  // Section 2 hover effect
  const leftImageContainer = document.querySelector(".left-image-container");
  const section2TextElements = document.querySelectorAll(".section-2-hover .text-container [class*='group-hover']");
  const readMoreButton2 = leftImageContainer?.querySelector("a");

  // Section 3 hover effect
  const rightImageContainer2 = document.querySelector(".right-image-container-2");
  const section3TextElements = document.querySelectorAll(".section-3-hover .text-container [class*='group-hover']");
  const readMoreButton3 = rightImageContainer2?.querySelector("a");

  // Section 4 hover effect
  const leftImageContainer2 = document.querySelector(".left-image-container-2");
  const section4TextElements = document.querySelectorAll(".section-4-hover .text-container [class*='group-hover']");
  const readMoreButton4 = leftImageContainer2?.querySelector("a");

  // Section 5 hover effect
  const rightImageContainer3 = document.querySelector(".right-image-container-3");
  const section5TextElements = document.querySelectorAll(".section-5-hover .text-container [class*='group-hover']");
  const readMoreButton5 = rightImageContainer3?.querySelector("a");

  function createHoverHandlers(textElements, readMoreButton) {
    function handleMouseEnter() {
      textElements.forEach(el => {
        // Remove any existing classes first
        el.classList.remove("group-hover:bg-white", "group-hover:text-[#003BFF]");
        // Add hover styles
        el.style.backgroundColor = "white";
        el.style.color = "#003BFF";
      });

      // Handle read more button
      if (readMoreButton) {
        readMoreButton.style.backgroundColor = "white";
        readMoreButton.style.color = "#003BFF";
      }
    }

    function handleMouseLeave() {
      textElements.forEach(el => {
        // Reset styles
        el.style.backgroundColor = "";
        el.style.color = "";
        // Restore original classes
        el.classList.add("group-hover:bg-white", "group-hover:text-[#003BFF]");
      });

      // Reset read more button
      if (readMoreButton) {
        readMoreButton.style.backgroundColor = "";
        readMoreButton.style.color = "";
      }
    }

    return { handleMouseEnter, handleMouseLeave };
  }

  // Initialize Section 1 hover
  if (rightImageContainer && section1TextElements.length > 0) {
    const { handleMouseEnter, handleMouseLeave } = createHoverHandlers(section1TextElements, readMoreButton1);
    rightImageContainer.removeEventListener("mouseenter", handleMouseEnter);
    rightImageContainer.removeEventListener("mouseleave", handleMouseLeave);
    rightImageContainer.addEventListener("mouseenter", handleMouseEnter);
    rightImageContainer.addEventListener("mouseleave", handleMouseLeave);
  }

  // Initialize Section 2 hover
  if (leftImageContainer && section2TextElements.length > 0) {
    const { handleMouseEnter, handleMouseLeave } = createHoverHandlers(section2TextElements, readMoreButton2);
    leftImageContainer.removeEventListener("mouseenter", handleMouseEnter);
    leftImageContainer.removeEventListener("mouseleave", handleMouseLeave);
    leftImageContainer.addEventListener("mouseenter", handleMouseEnter);
    leftImageContainer.addEventListener("mouseleave", handleMouseLeave);
  }

  // Initialize Section 3 hover
  if (rightImageContainer2 && section3TextElements.length > 0) {
    const { handleMouseEnter, handleMouseLeave } = createHoverHandlers(section3TextElements, readMoreButton3);
    rightImageContainer2.removeEventListener("mouseenter", handleMouseEnter);
    rightImageContainer2.removeEventListener("mouseleave", handleMouseLeave);
    rightImageContainer2.addEventListener("mouseenter", handleMouseEnter);
    rightImageContainer2.addEventListener("mouseleave", handleMouseLeave);
  }

  // Initialize Section 4 hover
  if (leftImageContainer2 && section4TextElements.length > 0) {
    const { handleMouseEnter, handleMouseLeave } = createHoverHandlers(section4TextElements, readMoreButton4);
    leftImageContainer2.removeEventListener("mouseenter", handleMouseEnter);
    leftImageContainer2.removeEventListener("mouseleave", handleMouseLeave);
    leftImageContainer2.addEventListener("mouseenter", handleMouseEnter);
    leftImageContainer2.addEventListener("mouseleave", handleMouseLeave);
  }

  // Initialize Section 5 hover
  if (rightImageContainer3 && section5TextElements.length > 0) {
    const { handleMouseEnter, handleMouseLeave } = createHoverHandlers(section5TextElements, readMoreButton5);
    rightImageContainer3.removeEventListener("mouseenter", handleMouseEnter);
    rightImageContainer3.removeEventListener("mouseleave", handleMouseLeave);
    rightImageContainer3.addEventListener("mouseenter", handleMouseEnter);
    rightImageContainer3.addEventListener("mouseleave", handleMouseLeave);
  }
}

// Initialize on DOMContentLoaded
document.addEventListener("DOMContentLoaded", initializeHoverEffects);

// Re-initialize when menu is closed
document.addEventListener("menuClosed", initializeHoverEffects);

// Backup initialization
window.addEventListener("load", initializeHoverEffects);

// Re-initialize after any potential dynamic content changes
const observer = new MutationObserver(() => {
  initializeHoverEffects();
});

// Start observing the document for any changes in the DOM
observer.observe(document.body, {
  childList: true,
  subtree: true
}); 