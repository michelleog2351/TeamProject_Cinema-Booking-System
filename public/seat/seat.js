$(document).ready(function () {
    nav();
    footer();
  
    // Load SVG dynamically
    $.get("../images/cinema-seat-plan.svg", function (data) {
      let svg = $(data).find("svg"); // Extract SVG from file
      svg.attr("id", "seatMap"); // Optional: Add an ID for reference
      $("body").append(svg); // Embed SVG into the page
  
      // Now apply event listeners
      $(".highcharts-point").on("mouseenter", function () {
        $(this).css("fill", "#ffcc00"); // Highlight seat on hover
      });
  
      $(".highcharts-point").on("mouseleave", function () {
        $(this).css("fill", ""); // Reset to original color
      });
  
      $(".highcharts-point").on("click", function () {
        alert($(this).attr("aria-label")); // Show seat details on click
      });
    });
  });
  