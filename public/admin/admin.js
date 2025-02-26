$(`document`).ready(function () {
  nav();
  footer();
  getJsonData();
  $(`#add`).append(
    `<button type="button" class="addButton btn btn-primary">Add</button>`
  );


    $(".addButton").click(function (e) 
    {
        location.replace("http://localhost:3000/admin/createAdmin.html");  
    });
});

function getJsonData() {
  $.getJSON(`http://localhost:3000/admins`, function (data) {
    $.each(data, function (i, value) {
      $(`#tbody`).append(
        `<tr>
				<td id="name${value.Name}" >${value.Name}</td>
                <td id="email${value.Email}">${value.Email}</td>
				<td id="password${value.Password}">${value.Password}</td>
                <td><button type="button" class="updateButton btn btn-secondary" value="${value.AdminID}" >Update</button></td>
                <td><button type="button" class="deleteButton btn btn-danger" value="${value.AdminID}">Delete</button></td>
				</tr>`
      );
    });
    $(".updateButton").click(function (e) {
      let ID = e.target.value;
      localStorage.setItem("ID", ID);

                location.replace("http://localhost:3000/admin/updateAdmin.html");
            });
            $(".deleteButton").click(function (e) 
            {
                let ID = e.target.value;
                $.post(`http://localhost:3000/deleteAdmin/${ID}`, {
                    AdminID: ID
                })
                .done(function () {
                    location.replace("http://localhost:3000/admin/admin.html");
                })
            });
	});
} 