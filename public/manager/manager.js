$(`document`).ready(function () {
    nav();
    footer();
    getJsonData();
    $(`#add`).append(
      `<button type="button" class="addButton btn btn-primary">Add</button>`
    );
  
    $(".addButton").click(function (e) {
      location.replace("http://localhost:3000/manager/createManager.html");
    });
  });
  
  function getJsonData() {
    $.getJSON(`http://localhost:3000/managers`, function (data) {
      $.each(data, function (i, value) {
        $(`#tbody`).append(
          `<tr>
                  <td id="name${value.Name}" >${value.Name}</td>
                  <td id="email${value.Email}">${value.Email}</td>
                  <td><button type="button" class="updateButton btn btn-secondary" value="${value.ManagerID}" >Update</button></td>
                  <td><button type="button" class="deleteButton btn btn-danger" value="${value.ManagerID}">Delete</button></td>
                  </tr>`
        );
      });
      $(".updateButton").click(function (e) {
        let ID = e.target.value;
        localStorage.setItem("ID", ID);
  
        location.replace("http://localhost:3000/manager/updateManager.html");
      });
      $(".deleteButton").click(function (e) {
        let ID = e.target.value;
        $.post(`http://localhost:3000/deleteManager/${ID}`, {
          ManagerID: ID,
        }).done(function () {
          location.replace("http://localhost:3000/manager/manager.html");
        });
      });
    });
  }
  