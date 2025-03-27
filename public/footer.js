function footer() {
  var footerOutPut = `
    <hr>

    <div class="d-flex justify-content-between align-items-center text-white py-3 px-4 bg-primary">
            <div>
                <input type="email" id="user_email" placeholder="Enter your email" class="p-1" 
                    style="width: 150px; font-size: 12px; position: left;">
                <button onclick="sendEmail()" class="btn btn-dark" 
                    style="padding: 4px 8px; font-size: 12px;">Send</button>
            </div>

    <div class="text-center text-white py-5"> 
      &copy; Applied Computing Group 1
    </div>;`;
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