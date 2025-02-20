$(`document`).ready(function () {

    $(`#fbody`).append(
    `<label  class="form-label" for="name">Name</label>
    <input class="form-control" type="text" name="name" id="name"></input>

    <label class="form-label" for="email">Email</label>
    <input class="form-control" type="text" name="email" id="email"></input>
    
    <label class="form-label" for="password">Password</label>
    <input class="form-control" type="text" name="password" id="password"></input>
    <br>`
    )

    $("#cancel").click(function (e) 
    {
        location.replace("http://localhost:3000/admin/admin.html");  
    })

    $("#save").click(function (e) 
    {
        let name = $(`#name`).val();
        let email = $(`#email`).val();
        let password = $(`#password`).val();
        $.post(`http://localhost:3000/createAdmin`, {
            name: name,
            email: email,
            password: password
        })
        .done(function () {
            location.replace("http://localhost:3000/admin/admin.html");
        })
    });

});
