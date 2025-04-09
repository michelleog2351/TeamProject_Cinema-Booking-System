$(document).ready(function () {
  nav();
  footer();

  // Load the SVG dynamically, easier this way than just plain css
  $.get("../images/cinema-seat-plan.svg", function (data) {
    let svg = $(data).find("svg");
    svg.attr("id", "seatMap");

    svg.find("rect.highcharts-background").attr("fill", "#f3fcff");

    $(".SeatsDiv").append(svg);
    $(".highcharts-point").on("click", function () {
      alert($(this).attr("aria-label"));
    });
  });
});