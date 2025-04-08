function footer() {
  var footerOutPut = `
    <hr>

            <div id="email_box" class="justify-content-between align-items-left text-white py-3 px-4 bg-primary" style="padding-left:20%;">
            <p>Sign up for our Newsletter!</p>
                <input type="email" id="user_email" placeholder="Enter your email" class="p-1" 
                    style="width: 100%; font-size: 14px; position: left;">
                <button onclick="sendEmail()" class="btn btn-dark" 
                    style="padding: 4px 8px; font-size: 12px;">Sign up</button>
                    <div id="error-message" style="color: red; display: none; margin-top: 10px;"></div>
            </div>
<div class="d-flex justify-content-between align-items-center text-white py-3 px-4 bg-primary">
      &copy; Applied Computing Group 1
    </div>`;
  $("#footer").addClass("bg-primary").html(footerOutPut);
}
function sendEmail() {
  let email = document.getElementById("user_email").value;
  let errormsg = document.getElementById("error-message");
  
  if (!email || !email.includes("@")) {
    errormsg.style.display = "block";
    errormsg.style.color = "white";
    errormsg.textContent = "Please enter a valid email.";
    return;
  }

  fetch("http://localhost:3000/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email })
  })
  .then(response => response.text())
  .then(data => {errormsg.textContent = data;})
  .catch(error => {errormsg.textContent = "Error"+error;});
}