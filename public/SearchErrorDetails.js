$(document).ready(function () {
  footer();
  $(`#fbody`).append(
    `
          <div class="mb-3" style="display: flex; align-items:center; margin-top: 150px;">
            <button id="cancel" class="btn btn-secondary">< Back Home</button>
          </div>`
  );
});

$(document).on("click", "#cancel", function (e) {
  e.preventDefault();
  location.href = `/index.html`;
});
