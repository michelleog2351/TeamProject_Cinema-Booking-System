function footer() {
  var footerOutPut = `
    <hr>
    <div class="text-center text-white py-5"> 
      &copy; Applied Computing Group 1
    </div>;

    <input type="email" id="user_email" placeholder="Enter your email" class="p-1" width: 150px; font-size: 12px;>
            <button onclick="sendEmail()" class="btn btn-dark mt-5" style="padding: 4px 8px; font-size: 12px;">Sign up</button>
        </div>`;
  $("#footer").addClass("bg-primary").html(footerOutPut);
}
function sendEmail() {
  let email = document.getElementById("user_email").value;
  
  fetch("http://localhost:3000/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email })
  })
  .then(response => response.text())
  .then(data => alert(data))
  .catch(error => alert("Error: " + error));
}