document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const sections = sidebar.querySelectorAll('section');
    const mainContent = document.getElementById('mainContent');
    const imgCompContainer = document.querySelector('.img-comp-container');
    const imageContent = document.getElementById('imageContent');

    const magnifyContainer = document.getElementById('magnifyContainer');
    const magnifier = document.getElementById('magnifier');
    const magnifiedTemperature = document.getElementById('magnifiedTemperature');

    const legendImage = document.getElementById('legendImage');

    const centerContainer = document.querySelector('.centerContainer');

    const sectionFiles = {
        section1: 'qgis2web_lst\\index.html',
        section2: 'qgis2web_ndvi\\index.html',
        section4: '/images/graph.png',
        section6: '/images/green_roof.jpg'
        // Add more mappings as needed
    };

    let currentHighlightedSection = null;
    let sliderInitialized = false;

    const highlightSection = (section) => {
        if (currentHighlightedSection !== section) {
            sections.forEach(sec => {
                sec.style.color = sec === section ? '#000000' : '#c7c7c7';
            });

            const sectionId = section.id;
            if (sectionId === 'section3') {
                mainContent.style.display = 'none';
                imageContent.style.display = 'none';
                magnifyContainer.style.display = 'none';
                centerContainer.style.display = 'flex';
                imgCompContainer.style.display = 'block';
                legendImage.style.display = 'none';
                if (!sliderInitialized) {
                  initComparisons();
                  sliderInitialized = true;
              }
            } else if (sectionId === 'section4' || sectionId === 'section6') {
                mainContent.style.display = 'none';
                imgCompContainer.style.display = 'none';
                magnifyContainer.style.display = 'none';
                legendImage.style.display = 'none';
                centerContainer.style.display = 'flex';
                imageContent.style.display = 'block';
                imageContent.src = sectionFiles[sectionId];
            } else if (sectionId === 'section5') {
              mainContent.style.display = 'none';
              imgCompContainer.style.display = 'none';
              imageContent.style.display = 'none';
              legendImage.style.display = 'none';
              centerContainer.style.display = 'flex';
              magnifyContainer.style.display = 'block';
              // Initial position of the magnifier
              setInitialMagnifierPosition();
            } else {
                mainContent.style.display = 'block';
                imgCompContainer.style.display = 'none';
                imageContent.style.display = 'none';
                magnifyContainer.style.display = 'none';
                legendImage.style.display = 'none';
                centerContainer.style.display = 'none';
                if (sectionFiles[sectionId]) {
                    mainContent.setAttribute('data', sectionFiles[sectionId]);
                }
                if (sectionId === 'section1') {
                  legendImage.src = '/images/lst_legend.png'
                  legendImage.style.display = 'block';
                }
                if (sectionId === 'section2' || sectionId === 'section7') {
                  legendImage.src = '/images/ndvi_legend.png'
                  legendImage.style.display = 'block';
                }
            }

            currentHighlightedSection = section;
        }
    };

    // Initial highlight of the first section
    if (sections.length > 0) {
        highlightSection(sections[0]);
    }

    const checkScroll = () => {
        let newCurrentSection = null;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                if (!newCurrentSection || rect.top < newCurrentSection.getBoundingClientRect().top) {
                    newCurrentSection = section;
                }
            }
        });

        if (newCurrentSection && newCurrentSection !== currentHighlightedSection) {
            highlightSection(newCurrentSection);
        }
    };

    sidebar.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    // Initial check
    setTimeout(checkScroll, 100); // Delay the initial check to ensure the first section is highlighted

    // Magnifying glass effect
    magnifyContainer.addEventListener('mousemove', (e) => {
      const rect = magnifyContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      magnifier.style.left = `${x - magnifier.offsetWidth / 2}px`;
      magnifier.style.top = `${y - magnifier.offsetHeight / 2}px`;
      magnifier.style.display = 'block';

      const magnifiedX = (x / rect.width) * magnifiedTemperature.width - magnifier.offsetWidth / 2;
      const magnifiedY = (y / rect.height) * magnifiedTemperature.height - magnifier.offsetHeight / 2;

      magnifiedTemperature.style.left = `-${magnifiedX}px`;
      magnifiedTemperature.style.top = `-${magnifiedY}px`;
  });

  magnifyContainer.addEventListener('mouseleave', () => {
      magnifier.style.display = 'none';
  });

  // Function to set the initial position of the magnifier
  function setInitialMagnifierPosition() {
    const rect = magnifyContainer.getBoundingClientRect();
    const initialX = rect.width / 2;
    const initialY = rect.height / 2;

    magnifier.style.left = `${initialX - magnifier.offsetWidth / 2}px`;
    magnifier.style.top = `${initialY - magnifier.offsetHeight / 2}px`;
    magnifier.style.display = 'block';

    const magnifiedX = (initialX / rect.width) * magnifiedTemperature.width - magnifier.offsetWidth / 2;
    const magnifiedY = (initialY / rect.height) * magnifiedTemperature.height - magnifier.offsetHeight / 2;

    magnifiedTemperature.style.left = `-${magnifiedX}px`;
    magnifiedTemperature.style.top = `-${magnifiedY}px`;
  }
});

function initComparisons() {
    var x, i;
    /* Find all elements with an "overlay" class: */
    x = document.getElementsByClassName("img-comp-overlay");
    for (i = 0; i < x.length; i++) {
      /* Once for each "overlay" element:
      pass the "overlay" element as a parameter when executing the compareImages function: */
      compareImages(x[i]);
    }
    function compareImages(img) {
      var slider, img, clicked = 0, w, h;
      /* Get the width and height of the img element */
      w = img.offsetWidth;
      h = img.offsetHeight;
      /* Set the width of the img element to 50%: */
      img.style.width = (w / 2) + "px";
      /* Create slider: */
      slider = document.createElement("DIV");
      slider.setAttribute("class", "img-comp-slider");
      /* Insert slider */
      img.parentElement.insertBefore(slider, img);
      /* Position the slider in the middle: */
      slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
      slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";
      /* Execute a function when the mouse button is pressed: */
      slider.addEventListener("mousedown", slideReady);
      /* And another function when the mouse button is released: */
      window.addEventListener("mouseup", slideFinish);
      /* Or touched (for touch screens: */
      slider.addEventListener("touchstart", slideReady);
       /* And released (for touch screens: */
      window.addEventListener("touchend", slideFinish);
      function slideReady(e) {
        /* Prevent any other actions that may occur when moving over the image: */
        e.preventDefault();
        /* The slider is now clicked and ready to move: */
        clicked = 1;
        /* Execute a function when the slider is moved: */
        window.addEventListener("mousemove", slideMove);
        window.addEventListener("touchmove", slideMove);
      }
      function slideFinish() {
        /* The slider is no longer clicked: */
        clicked = 0;
      }
      function slideMove(e) {
        var pos;
        /* If the slider is no longer clicked, exit this function: */
        if (clicked == 0) return false;
        /* Get the cursor's x position: */
        pos = getCursorPos(e)
        /* Prevent the slider from being positioned outside the image: */
        if (pos < 0) pos = 0;
        if (pos > w) pos = w;
        /* Execute a function that will resize the overlay image according to the cursor: */
        slide(pos);
      }
      function getCursorPos(e) {
        var a, x = 0;
        e = (e.changedTouches) ? e.changedTouches[0] : e;
        /* Get the x positions of the image: */
        a = img.getBoundingClientRect();
        /* Calculate the cursor's x coordinate, relative to the image: */
        x = e.pageX - a.left;
        /* Consider any page scrolling: */
        x = x - window.pageXOffset;
        return x;
      }
      function slide(x) {
        /* Resize the image: */
        img.style.width = x + "px";
        /* Position the slider: */
        slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
      }
    }
  }