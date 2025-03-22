// function nav() {
//   var isLoggedIn = sessionStorage.getItem("login") === "true";
//   var userType = sessionStorage.getItem("userType");

//   var navOutPut = `
//       <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
//           <div class="container-fluid">
//               <a class="navbar-brand" href="/index.html">Our Cinema</a>
//               <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"> Menu
//                   <span class="navbar-toggler-icon"></span>
//               </button>

//                 <div class="collapse navbar-collapse" id="navbarNav">
//               <ul class="navbar-nav w-100 d-flex align-items-center list-unstyled" style="padding: 15px;">
//                       <li class="nav-item">
//                           <a class="nav-link" href="/index.html">Home</a>
//                       </li>
//                       <li class="nav-item">
//                           <a class="nav-link" href="/Customer/Film/cFilm.html">Now Showing</a>
//                       </li>`;

//   if (isLoggedIn) {
//     if (userType === "admin") {
//       navOutPut += `
//                   <li class="nav-item">
//                       <a class="nav-link" href="/film/film.html">Film</a>
//                   </li>`;
//     } else if (userType === "manager") {
//       navOutPut += `
//                   <li class="nav-item">
//                       <a class="nav-link" href="/screening/screening.html">Screening</a>
//                   </li>
//                   <li class="nav-item">
//                     <a class="nav-link" href="/theatre/theatre.html">Theatre</a>
//                   </li>`;
//     }
//   }

//   navOutPut += `</ul>
//                   <ul class="navbar-nav list-unstyled d-flex align-items-center">
//                     <form class="d-flex align-items-center position-relative" role="search">
//                       <button id="search-btn" class="btn btn-outline-light rounded-circle p-2" type="button">
//                           <img src="/images/search.svg" alt="Search" width="20" height="50">
//                       </button>
//                     <input id="search-input" class="form-control" type="search" placeholder="Search for films and more!" aria-label="Search">
//                     </form> `;

//   if (isLoggedIn) {
//     navOutPut += `
//                   <li class="nav-item">
//                       <a class="nav-link" href="#" id="logout">Logout</a>
//                   </li>
//               </ul>`;
//   } else {
//     navOutPut += `
//                 <ul class="navbar-nav">
//                   <li class="nav-item">
//                       <a class="nav-link" href="/login.html" id="login">Login</a>
//                   </li>
//                 </ul>`;
//   }

//   navOutPut += `</div></div></nav>`;
//   $("nav").html(navOutPut);

//   // Logout functionality
//   $("#logout").click(function (e) {
//     e.preventDefault();
//     sessionStorage.removeItem("login");
//     sessionStorage.removeItem("userType");
//     localStorage.removeItem("token");
//     location.replace("/index.html");
//   });
// }

// // added this function here rather than going thru all the files to add this to all tables
// // allow only the table to scroll horizontally without affecting navbar
// // keep the navbar fixed at the top
// $(document).ready(function () {
//   $("table").each(function () {
//     if (!$(this).parent().hasClass("table-responsive")) {
//       $(this).wrap('<div class="table-responsive"></div>');
//     }
//   });

//   $("#search-btn").click(function () {
//     let input = $("#search-input");
//     if (!input.hasClass("active")) {
//       input.addClass("active");
//     } else {
//       input.removeClass("active");
//     }
//   });

//   $(document).click(function (e) {
//     if (!$(e.target).closest("#search-btn, #search-input").length) {
//       $("#search-input").removeClass("active");
//     }
//   });
// });
// // // let navOutput = `
// // //   <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
// // //     <div class="container-fluid">
// // //       <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
// // //         <span class="navbar-toggler-icon"></span>
// // //       </button>
// // //       <div class="collapse navbar-collapse" id="navbarColor01">
// // //         <ul class="navbar-nav me-auto">
// // //           <li class="nav-item"><a class="nav-link" href="/index.html">Home</a></li>
// // //           <li class="nav-item"><a class="nav-link" href="/Customer/Film/cFilm.html">Now Showing</a></li>          </ul>
// // //         <ul class="navbar-nav ms-auto" id="userNav">
// // //         </ul>
// // //       </div>
// // //     </div>
// // //   </nav>`;

// // $("body").prepend(navOutput);

// // setTimeout(() => {
// //   let userNav = "";

// //   if (sessionStorage.getItem("login") === "true") {
// //     const role = sessionStorage.getItem("role");

// //     if (role === "Admin") {
// //       userNav = `
// //               <li class="nav-item"><a class="nav-link" href="/film/film.html">Film</a></li>
// //               <li class="nav-item"><a class="nav-link" href="/user/user.html">User</a></li>

// //             <li class="nav-item">
// //               <button class="btn btn-danger" id="logout">Logout</button>
// //             </li>`;
// //     } else if (role === "Manager") {
// //       userNav = `
// //               <li class="nav-item"><a class="nav-link" href="/theatre/theatre.html">Theatre</a></li>
// //               <li class="nav-item"><a class="nav-link" href="/screening/screening.html">Screening</a></li>
// //               <li class="nav-item"><a class="nav-link" href="/user/user.html">User</a></li>

// //             <li class="nav-item">
// //               <button class="btn btn-danger" id="logout">Logout</button>
// //             </li>`;
// //     }
// //   } else {
// //     userNav = `<li class="nav-item"><a class="nav-link" href="/login.html">Login</a></li>`;
// //   }

// //   $("#userNav").html(userNav);

// //   $(document).on("click", "#logout", function (e) {
// //     e.preventDefault();
// //     sessionStorage.removeItem("login");
// //     sessionStorage.removeItem("role");
// //     location.replace("/index.html");
// //   });
// // });
// setTimeout(() => {
//   let userNav = "";

//   if (sessionStorage.getItem("login") === "true") {
//     // Fetch user role
//     const role = sessionStorage.getItem("role");

//     // All user roles now redirect to user.html
//     userNav = `
//       <li class="nav-item"><a class="nav-link" href="/user/user.html">User</a></li>`;

//     // Admin-Specific Links
//     if (role === "Admin") {
//       userNav += `
//         <li class="nav-item"><a class="nav-link" href="/film/film.html">Film</a></li>
//         <li class="nav-item"><a class="nav-link" href="/booking/booking.html">Booking</a></li>`;
//     }

//     // Manager-Specific Links
//     if (role === "Manager") {
//       userNav += `
//         <li class="nav-item"><a class="nav-link" href="/theatre/theatre.html">Theatre</a></li>
//         <li class="nav-item"><a class="nav-link" href="/screening/screening.html">Screening</a></li>`;
//     }

//     // Logout Button (common for all logged-in users)
//     userNav += `
//       <li class="nav-item">
//         <button class="btn btn-danger" id="logout">Logout</button>
//       </li>`;
//   } else {
//     // If user is not logged in, show Login link
//     userNav = `<li class="nav-item"><a class="nav-link" href="/login.html">Login</a></li>`;
//   }

//   // Update the navigation menu dynamically
//   $("#userNav").html(userNav);

//   // Logout functionality
//   $(document).on("click", "#logout", function (e) {
//     e.preventDefault();
//     sessionStorage.removeItem("login");
//     sessionStorage.removeItem("role");
//     location.replace("/index.html");
//   });
// });
function nav() {
  var isLoggedIn = sessionStorage.getItem("login") === "true";
  var role = sessionStorage.getItem("role"); // Use "role" consistently

  var navOutPut = `
      <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
          <div class="container-fluid">
              <a class="navbar-brand" href="/index.html">Our Cinema</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"> 
                  <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse" id="navbarNav">
                  <ul class="navbar-nav w-100 d-flex align-items-center list-unstyled" style="padding: 15px;">
                      <li class="nav-item"><a class="nav-link" href="/index.html">Home</a></li>
                      <li class="nav-item"><a class="nav-link" href="/Customer/Film/cFilm.html">Now Showing</a></li>`;

  if (isLoggedIn) {
    navOutPut += `<li class="nav-item"><a class="nav-link" href="/user/user.html">User</a></li>`;

    if (role === "Admin") {
      navOutPut += `
        <li class="nav-item"><a class="nav-link" href="/film/film.html">Film</a></li>
        <li class="nav-item"><a class="nav-link" href="/booking/booking.html">Booking</a></li>`;
    }

    if (role === "Manager") {
      navOutPut += `
        <li class="nav-item"><a class="nav-link" href="/theatre/theatre.html">Theatre</a></li>
        <li class="nav-item"><a class="nav-link" href="/screening/screening.html">Screening</a></li>`;
    }
  }

  navOutPut += `</ul>
                  <ul class="navbar-nav list-unstyled d-flex align-items-center">
                    <form class="d-flex align-items-center position-relative" role="search">
                      <button id="search-btn" class="btn btn-outline-light rounded-circle p-2" type="button">
                          <img src="/images/search.svg" alt="Search" width="20" height="50">
                      </button>
                      <input id="search-input" class="form-control" type="search" placeholder="Search for films and more!" aria-label="Search">
                    </form>`;

  if (isLoggedIn) {
    navOutPut += `
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

  // Logout functionality
  $("#logout").click(function (e) {
    e.preventDefault();
    sessionStorage.removeItem("login");
    sessionStorage.removeItem("role");
    localStorage.removeItem("token");
    location.replace("/index.html");
  });
}

// Ensure table responsiveness
$(document).ready(function () {
  nav(); // Call navigation function

  $("table").each(function () {
    if (!$(this).parent().hasClass("table-responsive")) {
      $(this).wrap('<div class="table-responsive"></div>');
    }
  });

  // Search button toggle
  $("#search-btn").click(function () {
    let input = $("#search-input");
    input.toggleClass("active");
  });

  // Close search when clicking outside
  $(document).click(function (e) {
    if (!$(e.target).closest("#search-btn, #search-input").length) {
      $("#search-input").removeClass("active");
    }
  });
});
