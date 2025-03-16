function nav() {
  var isLoggedIn = sessionStorage.getItem("login") === "true";
  var userType = sessionStorage.getItem("userType");

  var navOutPut = `
      <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
          <div class="container-fluid">
              <a class="navbar-brand" href="/index.html">Our Cinema</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
              </button>
              <div class="container d-flex justify-content-center"> 
                  <ul class="navbar-nav w-100 d-flex" style="padding: 15px 15px 15px 15px">`;

  navOutPut += `
              <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav me-auto">
                  <li class="nav-item">
                      <a class="nav-link" href="/index.html">Home</a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link" href="/Customer/Film/cFilm.html">Now Showing</a>
                  </li>`;

  if (isLoggedIn) {
    if (userType === "admin") {
      navOutPut += `
                  <li class="nav-item">
                      <a class="nav-link" href="/admin/admin.html">Admin</a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link" href="/film/film.html">Film</a>
                  </li>`;
    } else if (userType === "manager") {
      navOutPut += `
                  <li class="nav-item">
                      <a class="nav-link" href="/manager/manager.html">Manager</a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link" href="/screening/screening.html">Screening</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/theatre/theatre.html">Theatre</a>
                  </li>`;
    }

    navOutPut += `
              </ul>
              <ul class="navbar-nav ms-auto">
                  <li class="nav-item">
                      <a class="nav-link" href="#" id="logout">Logout</a>
                  </li>
              </ul>`;
  } else {
    navOutPut += `
              <ul class="navbar-nav ms-auto">
                  <li class="nav-item">
                      <a class="nav-link" href="/login.html" id="login">Login</a>
                  </li>
              </ul>`;
  }

  navOutPut += `</ul></div></div></nav>`;
  $("nav").html(navOutPut);

  // Logout functionality
  $("#logout").click(function (e) {
    e.preventDefault();
    sessionStorage.removeItem("login");
    sessionStorage.removeItem("userType"); 
    localStorage.removeItem("token"); 
    location.replace("/index.html");
  });
}
