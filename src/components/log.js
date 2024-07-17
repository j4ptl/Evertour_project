document.getElementById('hamburgerMenu').addEventListener('click', function() {
  var navMenu = document.getElementById('navMenu');
  if (navMenu.className === 'nav') {
      navMenu.className += ' responsive';
  } else {
      navMenu.className = 'nav';
  }
});
// Get the modal
var modal = document.getElementById("myModal");

var card = document.getElementById("card");
var video = document.getElementById("video");

var span = document.getElementsByClassName("close")[0];

card.onclick = function() {
  modal.style.display = "block";
  video.play();
}

span.onclick = function() {
  modal.style.display = "none";
  video.pause();
  video.currentTime = 0;
}

window.onclick = function(event) {
  if (event.target == modal) {
      modal.style.display = "none";
      video.pause();
      video.currentTime = 0;
  }
}
// Get all the elements with class name "card"
var cards = document.querySelectorAll(".card");
var modals = document.querySelectorAll(".modal");
var video = document.getElementById("video");
var spans = document.querySelectorAll(".close");

// Loop through each card and add a click event listener
cards.forEach(function(card, index) {
  card.addEventListener("click", function() {
      modals[index].style.display = "block";
      videos[index].play();
  });``
});

// Loop through each close button and add a click event listener
spans.forEach(function(span, index) {
  span.addEventListener("click", function() {
      modals[index].style.display = "none";
      video.pause();
      video.currentTime = 0;
  });
});

// Close modal when clicking outside the modal
window.onclick = function(event) {
  modals.forEach(function(modal, index) {
      if (event.target == modal) {
          modal.style.display = "none";
          video.pause();
          video.currentTime = 0;
      }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
          } else {
              entry.target.classList.remove('in-view');
          }
      });
  }, {
      threshold: 0.1 // Trigger the animation when 10% of the element is in view
  });

  cards.forEach(card => {
      observer.observe(card);
  });

  // Modal functionality
  const modals = document.querySelectorAll('.modal');
  const closeButtons = document.querySelectorAll('.close');
  const arrowButtons = document.querySelectorAll('.arrow-button');

  arrowButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
          modals[index].style.display = "block";
      });
  });

  closeButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
          modals[index].style.display = "none";
      });
  });

  window.addEventListener('click', (event) => {
      if (event.target.classList.contains('modal')) {
          event.target.style.display = "none";
      }
  });
});

