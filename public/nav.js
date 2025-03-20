function nav() {
  let navOutput = `
    <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarColor01">
          <ul class="navbar-nav me-auto">
            <li class="nav-item"><a class="nav-link" href="/index.html">Home</a></li>
            <li class="nav-item"><a class="nav-link" href="/Customer/Film/cFilm.html">Now Showing</a></li>          </ul>
          <ul class="navbar-nav ms-auto" id="userNav">
          </ul>
        </div>
      </div>
    </nav>`;

  $("body").prepend(navOutput); 

  setTimeout(() => {
    let userNav = "";

    if (sessionStorage.getItem("login") === "true") {
      const role = sessionStorage.getItem("role");

      if (role === "Admin") {
        userNav = `
            <li class="nav-item"><a class="nav-link" href="/film/film.html">Film</a></li>
          <li class="nav-item">
            <button class="btn btn-danger" id="logout">Logout</button>
          </li>`;
      } else if (role === "Manager") {
        userNav = `
            <li class="nav-item"><a class="nav-link" href="/theatre/theatre.html">Theatre</a></li>
            <li class="nav-item"><a class="nav-link" href="/screening/screening.html">Screening</a></li>

          <li class="nav-item">
            <button class="btn btn-danger" id="logout">Logout</button>
          </li>`;
      }
    } else {
      userNav = `<li class="nav-item"><a class="nav-link" href="/login.html">Login</a></li>`;
    }

    $("#userNav").html(userNav);

    $(document).on("click", "#logout", function (e) {
      e.preventDefault();
      sessionStorage.removeItem("login");
      sessionStorage.removeItem("role");
      location.replace("/index.html"); 
    });

  }); 
}
