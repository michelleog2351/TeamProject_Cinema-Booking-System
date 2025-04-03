function footer() {
  var footerOutPut = `
    <hr>
    
    <div id="email_box" class="justify-content-between align-items-left text-white py-3 px-4 bg-primary" style="padding-left:20%; text-align: left;">
      <p>Sign up for our Newsletter!</p>
      <input type="email" id="user_email" placeholder="Enter your email" class="p-1" 
        style="width: 100%; font-size: 14px;">
      <button onclick="sendEmail()" class="btn btn-dark" 
        style="padding: 4px 8px; font-size: 12px;">Sign up</button>
    </div>

    <div class="d-flex justify-content-left text-white py-3 px-4 bg-primary" style="padding-left: 20px;">
      <a href="#" class="fa fa-facebook"></a>
      <a href="#" class="fa fa-twitter"></a>
      <a href="#" class="fa fa-instagram"></a>
    </div>

    <div  class="copyright d-flex justify-content-center align-items-center text-white py-3 px-4 bg-primary">
      &copy; Applied Computing Group 1
    </div>
  `;

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