function nav() {
  var navOutPut = `
    <div class="container d-flex justify-content-center"> 
        <ul class="navbar-nav" style="padding: 15px 15px 15px 15px">
            <li class="nav-item">
                <a class="nav-link" href="/index.html">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/Customer/Film/cFilm.html">Now Showing</a>
            </li> 
            <li class="nav-item">
                <a class="nav-link" href="/film/film.html">Film</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/screening/screening.html">Screening</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/theatre/theatre.html">Theatre</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/admin/admin.html">Admin</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/manager/manager.html">Manager</a>
            </li>   
            
    `;
  if (sessionStorage.getItem("login") == "true") {
    navOutPut += `
        <li class="nav-item">
        <a class="nav-link" href="/admin.html">Admin</a>
        </li> |
        <li class="nav-item">
        <a class="nav-link" href="/logout.html">Logout</a>
        </li> |`;
  } else {
    navOutPut += `<li class="nav-item">
        <a class="nav-link" href="/login.html">Login</a> 
        </li>`;
  }
  navOutPut += `</ul></div>`;
  $("nav").html(navOutPut);
    var navOutPut = `
      <div class="container d-flex justify-content-center"> 
          <ul class="navbar-nav w-100 d-flex" style="padding: 15px 15px 15px 15px">
              <li class="nav-item">
                  <a class="nav-link" href="/index.html">Home</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="/Customer/Film/cFilm.html">Now Showing</a>
              </li> 
              
    `;

    if (sessionStorage.getItem("login") === "true") {

        if (role === "Admin") {
            navOutPut += `
                <li class="nav-item">
                  <a class="nav-link" href="/film/film.html">Film</a>
                </li>`;
        } else if (role === "Manager") {
            navOutPut += `
                <li class="nav-item">
                    <a class="nav-link" href="/user/user.html">Users</a>
                    <li class="nav-item">
                  <a class="nav-link" href="/screening/screening.html">Screening</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/theatre/theatre.html">Theatre</a>
                </li>
                </li>`;
        }

        navOutPut += `
            <li class="nav-item ms-auto">
                <a class="nav-link" href="#" id="logout">Logout</a>
            </li>`;
    } else {
        navOutPut += `
            <li class="nav-item ms-auto">
                <a class="nav-link" href="/login.html">Login</a> 
            </li>`;
    }

    navOutPut += `</ul></div>`;
    $("nav").html(navOutPut);

    $("#logout").click(function (e) {
        e.preventDefault();
        sessionStorage.removeItem("login");

        location.replace("/index.html");
    });
}
