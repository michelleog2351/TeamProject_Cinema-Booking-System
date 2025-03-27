$(document).ready(function () {
    nav();
    footer();
    getJsonData()
})
function getJsonData() {
    d3.json("http://localhost:3000/ticketsSoldDaily").then(async function (dataset) {
        var width = 500;
        var height = 400;
        var radius = 4;

        //Get a Unique Collection of
        //FilmIDS
        let filmIDs = _.uniq(_.pluck(dataset, 'FilmID'));
  
        //FOR EVERY FilmID
        _.each(filmIDs, function (filmID) 
        {   //ADD ALL RECORDS TO filmRecords WHERE IDs are ==
            let filmRecords = _.filter(dataset, function(d) {
                return d.FilmID == filmID;
            });
            _.each(filmRecords, function (d) {
                d.Date = new Date(d.Date);
                d.TicketsSold = +d.TicketsSold;
            });
            //THE FIRST RECORD WILL ALWAYS HAVE CORRECT NAME
            let filmName = filmRecords[0].Name;
            var totalTicketsSold = TotalTicketsSold(_.pluck(filmRecords, 'TicketsSold'))

            $(`#graphs`).append(`
            <h3>${filmName} Tickets Sold This Week ${totalTicketsSold}</h3>
            <svg class="svg" id="svg${filmID}" height="${height}" width="${width}"></svg>
            <hr>
            `);
            var svg = d3.select(`#svg${filmID}`)
            var lineGraphs = svg.append("g")

            var y = d3.scaleLinear()
                .domain([0, 100])//FOR DATA VALUES MaximumTickets(filmRecords)
                .range([height-20, 30]);//FOR SVG height and width
            var yAxis = d3.axisLeft(y)

            var x = d3.scaleTime()
                .domain([Minimumdataset(filmRecords), Maximumdataset(filmRecords)])
                .range([0, width-100]);
            var xAxis = d3.axisBottom(x)
            .ticks(d3.timeDay.every(1))
            .tickFormat(d3.timeFormat("%b %d"));

            var line = d3.line()
            .x(d => x(new Date(d.Date)))
            .y(d => y(d.TicketsSold));

            
            lineGraphs.selectAll("circle")
                .data(filmRecords)
                .enter()
                .append("circle")
                .attr("cy", function (d) {
                    return (y(d.TicketsSold))
                })
                .attr("cx", function (d) {
                    return x(new Date(d.Date))+ 40
                    
                })
                .attr("r", radius)
                .attr("fill", "red");

            svg.append("path")
                .attr('d', line(filmRecords))
                .attr('fill', 'none')
                .attr('stroke', 'blue')
                .attr('stroke-width', 2)
                .attr("transform", "translate(40, 0)");;

                svg.append("g")
                .attr("transform", "translate(40, 0)")
                .call(yAxis);
            
                svg.append("g")
                .attr("transform", `translate(40, ${height - 20})`)
                .call(xAxis);


        });
    });
}


function Maximumdataset(dataset) {
    return new Date(Math.max(...dataset.map(d => d.Date)));
}

function TotalTicketsSold(dailyTickets) {
    var totalTicketsSold = 0;
    _.each(dailyTickets, function (dailyTickets) 
    { 
        totalTicketsSold += dailyTickets
    })
    return totalTicketsSold
}

function Maximumdataset(dataset) {
    return new Date(Math.max(...dataset.map(d => d.Date)));
}

function Minimumdataset(dataset) {
    return new Date(Math.min(...dataset.map(d => d.Date)));
}

function MaximumTickets(dataset) {
    return Math.max(...dataset.map(d => Number(d.TicketsSold)))
}

function MinimumTickets(dataset) {
    return Math.min(...dataset.map(d => Number(d.TicketsSold)))
}
