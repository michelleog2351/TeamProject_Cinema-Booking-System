$(`document`).ready(function () {
    nav();
    footer();
    getJsonData();
    $(`#add`).append(
      `<button type="button" class="addButton btn btn-primary">Create Users</button>`
    );
  
    $(".addButton").click(function (e) {
      location.replace("http://localhost:3000/user/createUser.html");
    });
  });
  
  function getJsonData() {
    $.getJSON(`http://localhost:3000/users`, function (data) {
      $.each(data, function (i, value) {
        $(`#tbody`).append(
          `<tr>
                  <td id="name${value.Name}" >${value.Name}</td>
                  <td id="email${value.Email}">${value.Email}</td>
                  <td id="email${value.Role}">${value.Role}</td>
                  <td><button type="button" class="updateButton btn btn-secondary" value="${value.EmployeeID}" >Update</button></td>
                  <td><button type="button" class="deleteButton btn btn-danger" value="${value.EmployeeID}">Delete</button></td>
                  </tr>`
        );
      });
      $(".updateButton").click(function (e) {
        let ID = e.target.value;
        localStorage.setItem("ID", ID);
  
        location.replace("http://localhost:3000/user/updateUser.html");
      });
      $(".deleteButton").click(function (e) {
        let ID = e.target.value;
        $.post(`http://localhost:3000/deleteUser/${ID}`, {
          ManagerID: ID,
        }).done(function () {
          location.replace("http://localhost:3000/user/user.html");
        });
      });
    });
  }
  