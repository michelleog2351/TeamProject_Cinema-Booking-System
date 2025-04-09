$(document).ready(function () {
  nav();
  footer();
  getJsonData();
});

function getJsonData() {
  d3.json("http://localhost:3000/ticketsSoldDaily").then(async function (
    dataset
  ) {
    var width = 800;
    var height = 800;
    var barwidth = 40;

    //Get a Unique Collection of
    //FilmIDS
    let filmIDs = _.uniq(_.pluck(dataset, "FilmID"));

    //FOR EVERY FilmID
    _.each(filmIDs, function (filmID) {
      //ADD ALL RECORDS TO filmRecords WHERE IDs are ==
      let filmRecords = _.filter(dataset, function (d) {
        return d.FilmID == filmID;
      });
      _.each(filmRecords, function (d) {
        d.Date = new Date(d.Date);
        d.TicketsSold = +d.TicketsSold;
      });
      //THE FIRST RECORD WILL ALWAYS HAVE CORRECT NAME
      let filmName = filmRecords[0].Name;
      var totalTicketsSold = TotalTicketsSold(
        _.pluck(filmRecords, "TicketsSold")
      );

      $(`#graphs`).append(`
            <h1 style="text-align:center"><b>${filmName}</b></h1>
            <h3 style="text-align:center">Tickets Sold This Week: <b>${totalTicketsSold}</b></h3>
            <svg class="svg" id="svg${filmID}" height="${height}" width="${width}"></svg>
            <br>
            <br>
            <hr>
            <br>
            `);
      var svg = d3.select(`#svg${filmID}`);
      var lineGraphs = svg.append("g");

      var y = d3
        .scaleLinear()
        .domain([0, 50]) //FOR DATA VALUES MaximumTickets(filmRecords)
        .range([height - 20, 30]); //FOR SVG height and width
      var yAxis = d3.axisLeft(y);

      var x = d3
        .scaleTime()
        .domain([Minimumdataset(filmRecords), Maximumdataset(filmRecords)])
        .range([0, width - 150 - barwidth]);
      var xAxis = d3
        .axisBottom(x)
        .ticks(d3.timeDay.every(1))
        .tickFormat(d3.timeFormat("%b %d"));

      lineGraphs
        .selectAll("rect")
        .data(filmRecords)
        .enter()
        .append("rect")
        .attr("x", (d) => x(d.Date) - barwidth / 2)
        .attr("y", (d) => y(d.TicketsSold))
        .attr("width", barwidth)
        .attr("height", (d) => Math.max(1, height - 20 - y(d.TicketsSold)))
        .attr("fill", "steelblue")
        .attr("transform", `translate(80, 0)`);

      svg.append("g").attr("transform", "translate(40, 0)").call(yAxis);

      svg
        .append("g")
        .attr("transform", `translate(80, ${height - 20})`)
        .call(xAxis);

      svg
        .append("line")
        .attr("x1", 40)
        .attr("x2", width - 90)
        .attr("y1", height - 20)
        .attr("y2", height - 20)
        .attr("stroke-width", 2)
        .attr("stroke", "black");

      svg
        .append("line")
        .attr("x1", 40)
        .attr("x2", 40)
        .attr("y1", 30)
        .attr("y2", height - 20)
        .attr("stroke-width", 2)
        .attr("stroke", "black");
    });
  });
}

function Maximumdataset(dataset) {
  return new Date(Math.max(...dataset.map((d) => d.Date)));
}

function Minimumdataset(dataset) {
  let minDate = new Date(Math.min(...dataset.map((d) => d.Date)));
  minDate.setDate(minDate.getDate() - 1);
  return new Date(Math.min(...dataset.map((d) => d.Date)));
}

function TotalTicketsSold(dailyTickets) {
  var totalTicketsSold = 0;
  _.each(dailyTickets, function (dailyTickets) {
    totalTicketsSold += dailyTickets;
  });
  return totalTicketsSold;
}
$(document).ready(function () {
  var scrollTopBtn = $(".scroll-to-top-btn");

  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 50) {
      scrollTopBtn.fadeIn().css("visibility", "visible");
    } else {
      scrollTopBtn.fadeOut().css("visibility", "hidden");
    }
  });

  scrollTopBtn.click(function () {
    $("html, body").animate({ scrollTop: 0 }, 120);
  });
});
