function nav() {
   /*`
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
            
    `*/
    
        let navOutPut = `
          <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
            <div class="container-fluid">
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarColor01">
                <ul class="navbar-nav me-auto">
                  <li class="nav-item"><a class="nav-link" href="/index.html">Home</a></li>
                  <li class="nav-item"><a class="nav-link" href="/Customer/Film/cFilm.html">Now Showing</a></li>
                  <li class="nav-item"><a class="nav-link" href="/film/film.html">Film</a></li>
                  <li class="nav-item"><a class="nav-link" href="/screening/screening.html">Screening</a></li>
                  <li class="nav-item"><a class="nav-link" href="/theatre/theatre.html">Theatre</a></li>
                </ul>
              </div>
            </div>
          </nav>`;
    
        if (sessionStorage.getItem("login") === "true") {
            const role = sessionStorage.getItem("role"); // Get the stored role
            if (role === "Admin") {
                navOutPut += `
                  <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link" href="/admin.html">Admin</a></li>
                    <li class="nav-item"><a class="nav-link" href="#" id="logout">Logout</a></li>
                  </ul>`;
            } else if (role === "Manager") {
                navOutPut += `
                  <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link" href="/manager/manager.html">Manager</a></li>
                    <li class="nav-item"><a class="nav-link" href="#" id="logout">Logout</a></li>
                  </ul>`;
            }
        } else {
            navOutPut += `
              <ul class="navbar-nav ms-auto">
                <li class="nav-item"><a class="nav-link" href="/login.html">Login</a></li>
              </ul>`;
        }
    
        $("nav").html(navOutPut);
    
        // Logout action
        $("#logout").click(function (e) {
            e.preventDefault();
            sessionStorage.removeItem("login");
            sessionStorage.removeItem("role"); // Remove role on logout
            location.replace("/index.html");
        });
    }
    