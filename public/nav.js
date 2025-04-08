function nav() {
  var isLoggedIn = sessionStorage.getItem("login") === "true";
  var role = sessionStorage.getItem("role");

  var navOutPut = `
      <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
          <div class="container-fluid">
            <img src="/images/logoTransparent.png" alt="Cinema Logo" width="6%" class="ms-3">
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"> 
                  <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse" id="navbarNav">
                  <ul class="navbar-nav w-100 d-flex align-items-center list-unstyled" style="padding: 15px;">
                      <li class="nav-item"><a class="nav-link" href="/index.html">Home</a></li>
                      <li class="nav-item"><a class="nav-link" href="/Customer/Film/cFilm.html">Now Showing</a></li>`;

  if (isLoggedIn) {
    if (role === "Admin") {
      navOutPut += `
        <li class="nav-item"><a class="nav-link" href="/film/film.html">Film</a></li>
        <li class="nav-item"><a class="nav-link" href="/booking/booking.html">Booking</a></li>`;
    }

    if (role === "Manager") {
      navOutPut += `
        <li class="nav-item"><a class="nav-link" href="/screening/screening.html">Screening</a></li>
        <li class="nav-item"><a class="nav-link" href="/Theatre/Theatre.html">Theatre</a></li>
`;
    }
  }

  navOutPut += `</ul>
  <ul class="navbar-nav list-unstyled d-flex align-items-center">
    <form class="d-flex align-items-center position-relative w-100" role="search" onsubmit="return false;">
      <div class="position-relative" style="">
          <input id="search-input" class="form-control" type="search" placeholder="Search for films and more!" aria-label="Search">      
          <button id="search-btn" class="btn btn-outline-light ms-2" type="button">
          <img src="/images/search.svg" alt="Search" width="20" height="50">
          </button> 
      </div>
          </div>

            
                <div class="suggestion-item"></div> 

     
          <div id="suggestions" style="
              display: none;
              position: absolute;
              top: 100%; /* right below the input */
              right: 0;
              width: 500px;
              background-color: white;
              border: 1px solid #ddd;
              border-top: none;
              border-radius: 15px 15px 15px 15px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              max-height: 200px;
              overflow-y: auto;
              z-index: 1000;"> 
            </div>
     
    </form>`; 

  if (isLoggedIn) {
    navOutPut += `
                  <li class="nav-item">
                    <a class="nav-link" href="/user/user.html">User</a>
                  </li>

                  <li class="nav-item">
                      <button class="btn btn-danger" id="logout">Logout</button>
                  </li>`;
  } else {
    navOutPut += `
                  <li class="nav-item">
                      <a class="nav-link" href="/login.html" id="login">Login</a>
                  </li>`;
  }

  navOutPut += `</ul></div></div></nav>`;

  $("nav").html(navOutPut);

  $("#logout").click(function (e) {
    e.preventDefault();
    sessionStorage.removeItem("login");
    sessionStorage.removeItem("role");
    localStorage.removeItem("token");
    location.replace("/index.html");
  });

  $(document).ready(function () {
    $("#search-input").on("input", function () {
      let searchQuery = $(this).val().toLowerCase().trim();
      if (!searchQuery) {
        $("#suggestions").empty().hide();
        return;
      }
      $.getJSON("http://localhost:3000/films", function (data) {
        console.log("Films data:", data);
        let matches = data.filter((film) =>
          film.Name.toLowerCase().includes(searchQuery)
        );
        if (matches.length > 0) {
          let suggestionsHTML = matches
            .map(
              (film) =>
                `<div class="suggestion-item" data-id="${film.FilmID}">${film.Name}</div>`
            )
            .join("");
          console.log(suggestionsHTML);
          $("#suggestions").html(suggestionsHTML).show();
        } else {
          $("#suggestions").empty().hide();
        }
      });
    });
  });
}

// Ensures table responsiveness
$(document).ready(function () {
  nav();

  $("table").each(function () {
    if (!$(this).parent().hasClass("table-responsive")) {
      $(this).wrap('<div class="table-responsive"></div>');
    }
  });
});


// Close search when clicking outside of it
$(document).click(function (e) {
  if (!$(e.target).closest("#search-btn, #search-input, #suggestions").length) {
    $("#search-input").removeClass("active");
    $("#suggestions").hide();
  }
});

// styling for highlighting the active page
$(document).ready(function () {
  // Get the current page path from the browser's URL
  let currentPath = window.location.pathname;
  $(".navbar-nav .nav-link").each(function () {
    // Convert relative href to an absolute URL and extract the pathname
    let linkPath = new URL($(this).attr("href"), window.location.origin)
      .pathname;

    // extract the folder of the current path i.e. /Theatre for /Theatre/Theatre.html
    let currentFolder = currentPath.substring(
      0,
      currentPath.lastIndexOf("/") + 1
    );
    let linkFolder = linkPath.substring(0, linkPath.lastIndexOf("/") + 1);

    // Check if the current page exactly matches the link,
    // if the current page is a subpage of the link (e.g., `/Theatre/createTheatre.html` under `/Theatre/`),
    // or if both the current page and the link belong to the same folder.
    // If any of these conditions are met, add the "active" class to highlight the link.
    if (
      currentPath === linkPath ||
      currentPath.startsWith(linkPath) ||
      currentFolder === linkFolder
    ) {
      $(this).addClass("active");
    }
  });

  // when the active link is clicked
  $(".navbar-nav .nav-link").click(function (e) {
    e.preventDefault();
    let newUrl = $(this).attr("href");

    // Remove active from all the links and add to the clicked link
    $(".navbar-nav .nav-link").removeClass("active");
    $(this).addClass("active");

    // Delay navigation to let the sliding underline animation complete
    // makes loading page less shaky
    setTimeout(function () {
      window.location.href = newUrl;
    }, 250);
  });
});

$(document).on("click", ".suggestion-item", function () {
  let filmID = $(this).data("id");
  localStorage.setItem("FilmID", filmID);
  location.href = `/Customer/Film/filmDetails.html?filmID=${filmID}`;
});

// Use this way for dynamically inserted elements
// $(document).on("click", "#search-btn", function () {
//   // Toggle the input's active state if not visible
//   if (!$("#search-input").hasClass("active")) {
//     $("#search-input").addClass("active").focus();
//   } else {
//     searchFromNavbar();
//   }
// });

$(document).on("click", "#search-btn", function (e) {
  e.preventDefault();
  // Only call searchFromNavbar if the input is active
  if ($("#search-input").hasClass("active")) {
    searchFromNavbar();
  } else {
    // Show the input field when the button is clicked
    $("#search-input").addClass("active").focus();
  }
});

$(document).on("click", "#search-btn", function (e) {
  e.preventDefault();
  searchFromNavbar();
});

// Trigger search on Enter key (13)
$(document).on("keypress", "#search-input", function (e) {
  if (e.which === 13) {
    e.preventDefault();
    searchFromNavbar();
  }
});

function searchFromNavbar() {
  console.log("searchFromNavbar called");
  var searchInput = $("#search-input").val().toLowerCase().trim();

  if (searchInput !== "") {
    $.getJSON("http://localhost:3000/films", function (data) {
      let exactMatch = data.find(
        (film) => film.Name.toLowerCase() === searchInput
      );

      if (exactMatch) {
        localStorage.setItem("FilmID", exactMatch.FilmID);
        location.href = `/Customer/Film/filmDetails.html?filmID=${exactMatch.FilmID}`;
      } else {
        location.href = `/SearchErrorDetails.html`;
      }
    }).fail(function () {
      alert("Failed to load film data for search.");
    });
  }
}
