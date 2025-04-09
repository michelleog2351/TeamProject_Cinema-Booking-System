$(document).ready(function () {
  footer();
  $("#fbody").append(`
    <div class="d-flex flex-column align-items-center justify-content-center" style="min-height: 50vh;">
      <img src="images/popcorn.gif" alt="Descriptive Alt Text" class="img-fluid" style="max-width: 600px; height: 500px;">

    </div>      
    <div class="mt-3">
        <button id="cancel" class="btn btn-secondary">&lt; Back Home</button>
      </div>
  `);
});

$(document).on("click", "#cancel", function (e) {
  e.preventDefault();
  location.href = "/index.html";
});


