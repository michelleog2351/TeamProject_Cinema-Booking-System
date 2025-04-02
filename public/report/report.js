$(document).ready(function () {
    nav();
    footer();
    getJsonData()
})
function getJsonData() {
    d3.json("http://localhost:3000/ticketsSoldDaily").then(async function (dataset) {
        var width = 800;
        var height = 800;
        var barwidth = 40;
        var spacing =70;
        var heightSpacing = 20;

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
                .domain([0, 50])//FOR DATA VALUES MaximumTickets(filmRecords)
                .range([height-20, 30]);//FOR SVG height and width
            var yAxis = d3.axisLeft(y)

            var x = d3.scaleTime()
                .domain([Minimumdataset(filmRecords), Maximumdataset(filmRecords)])
                .range([0, width - 150 - barwidth]);
            var xAxis = d3.axisBottom(x)
            .ticks(d3.timeDay.every(1))
            .tickFormat(d3.timeFormat("%b %d"));


            
lineGraphs.selectAll("rect")
                .data(filmRecords)
                .enter().append("rect")
                .attr('x', d => x(d.Date))
                .attr('y', d => y(d.TicketsSold))
                .attr('width', barwidth)
                .attr('height', d => Math.max(1, height - 20 - y(d.TicketsSold)))
                .attr('fill', 'steelblue')
                .attr("transform", `translate(40, 0)`);

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
