const slides = document.querySelectorAll(".card");
const next = document.querySelectorAll(".next");
const prev = document.querySelectorAll(".prev");
const interval = 5000;
let slideInterval;

const nextSlide = subject => {
  //Get current class
  let name = `.${subject} .current`;
  let currentItems = document.querySelectorAll(name);
  let slides = document.querySelectorAll(`.${subject} .card`);
  //Remove current class
  if (currentItems.length > 4) {
    currentItems[0].classList.remove("current");
  }
  //Check for next slide
  if (
    currentItems[currentItems.length - 1].nextElementSibling &&
    currentItems[
      currentItems.length - 1
    ].nextElementSibling.classList[0].indexOf("card") != -1
  ) {
    //Add current to next element sibling
    currentItems[currentItems.length - 1].nextElementSibling.classList.add(
      "current"
    );
  } else {
    //Remove current from all
    currentItems.forEach(element => {
      element.classList.remove("current");
    });
    // Add current to start
    slides[0].classList.add("current");
    slides[1].classList.add("current");
    slides[2].classList.add("current");
    slides[3].classList.add("current");
    slides[4].classList.add("current");
  }
};

const prevSlide = subject => {
  ///Get current class
  let name = `.${subject} .current`;
  let currentItems = document.querySelectorAll(name);
  let slides = document.querySelectorAll(`.${subject} .card`);
  //Remove current class
  if (currentItems.length > 4) {
    currentItems[currentItems.length - 1].classList.remove("current");
  }
  //Check for prev slide
  if (currentItems[0].previousElementSibling) {
    //Add current to prev element sibling
    currentItems[0].previousElementSibling.classList.add("current");
  } else {
    //Remove current from all
    currentItems.forEach(element => {
      element.classList.remove("current");
    });
    // Add current to last
    slides[slides.length - 1].classList.add("current");
    slides[slides.length - 2].classList.add("current");
    slides[slides.length - 3].classList.add("current");
    slides[slides.length - 4].classList.add("current");
    slides[slides.length - 5].classList.add("current");
  }
};

// Button events
next.forEach(element => {
  element.addEventListener("click", e => {
    let selection = e.target.id;
    let arr = selection.split("_");
    let selectedId = arr.length == 2 ? arr[0] : "";
    if (selectedId) {
      nextSlide(selectedId);
    }
  });
});

prev.forEach(element => {
  element.addEventListener("click", e => {
    let selection = e.target.id;
    let arr = selection.split("_");
    let selectedId = arr.length == 2 ? arr[0] : "";
    if (selectedId) {
      prevSlide(selectedId);
    }
  });
});

/* Search Feature*/

// const search = document.getElementById("search");
// const matchList = document.getElementById("match-list");

// //Search states.json and filter it
// const searchStates = async searchText => {
//   const res = await fetch("../data/states.json");
//   const states = await res.json();

//   //Get matches to current match input
//   let matches = states.filter(state => {
//     const regex = new RegExp(`^${searchText}`, "gi");
//     return state.name.match(regex) || state.abbr.match(regex);
//   });
//   if (searchText.length === 0) {
//     matches = [];
//     matchList.innerHTML = "";
//   }
//   outputHtml(matches);
// };

// const outputHtml = matches => {
//   if (matches.length > 0) {
//     const html = matches
//       .map(
//         match => `
//         <div class="card card-body mb-1">
//         <h4>${match.name} (${match.abbr}) <span class="text-primary">${
//           match.capital
//         }</span></h4>
//       <small>Lat: ${match.lat} / Long: ${match.long}</small>
//         </div>
//       `
//       )
//       .join("");
//     matchList.innerHTML = html;
//   }
// };
// search.addEventListener("input", () => searchStates(search.value));
