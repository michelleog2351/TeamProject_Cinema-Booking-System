$(`document`).ready(function () {
    nav();
    footer();
    var ID = localStorage.getItem("ScreeningID");
    $(`#fbody`).append(

        `
        <div class="mb-3">
            <label  class="form-label" for="startTime">Start Time</label>
            <select class="form-select" id="startTime" name="startTime">
            
            </select>
        </div>

        <div class="mb-3">
            <label class="form-label" for="date">Date</label>
            <input class="form-control" type="date" name="date" id="date"></input>
            <small id="dateWarningMessage" style="color: red; display: none;">Please enter a valid date</small>
        </div>

        <div class="mb-3">
            <label class="form-label" for="seatsRemaining">Seats Remaining</label>
            <input class="form-control" type="text" name="seatsRemaining" id="seatsRemaining"></input>
            <small id="warningMessage" style="color: red; display: none;">Please enter a value</small>
        </div>

        <div class="mb-3">
            <label class="form-label" for="theatre">Select Theatre</label>
            <select class="form-select" id="theatreSelect" name="theatre">
            
            </select>
        </div>

        
        <div class="mb-3">
            <label class="form-label" for="films">Select Film</label>
            <select class="form-select" id="filmSelect" name="films">
            </select>
        </div>
        `
    );



    getJsonData(ID);
    let today = new Date().toISOString().split('T')[0];
    $("#date").attr("min", today);

    $("#cancel").click(function (e) {
        location.replace("http://localhost:3000/screening/screening.html");
    })

    $("#update").click(function (e) {
        var inputValidation = true;
        $("#warningMessage").hide(); 
        $("#dateWarningMessage").hide();

        if ($(`#seatsRemaining`).val() == '') {
            $("#warningMessage").show();
            inputValidation = false;
        }
        if ($(`#date`).val() == '' || $(`#date`).val() < today) {
            $("#dateWarningMessage").show();
            inputValidation = false;
        }
        if (!inputValidation) {
            return;
        }

        let bookedScreening = {
            theatreID: $(`#theatreSelect`).val(),
            date: $(`#date`).val(),
            startTime: $(`#startTime`).val()

        };

        $.post(`http://localhost:3000/checkScreeningAvailability`, bookedScreening).done(
            function (data) {
                if (data.length > 0)
                    alert("Scrrening already booked try again")
                else {
                    let startTime = $(`#startTime`).val();
                    let date = $(`#date`).val();
                    let seatsRemaining = $(`#seatsRemaining`).val();
                    let theatreID = $(`#theatreSelect`).val();
                    let filmID = $(`#filmSelect`).val();

                    $.post(`http://localhost:3000/updateScreening/${ID}`, {
                        startTime: startTime,
                        date: date,
                        seatsRemaining: seatsRemaining,
                        theatreID: theatreID,
                        filmID: filmID
                    })
                        .done(function () {
                            location.replace("http://localhost:3000/screening/screening.html");
                        })
                }
            }
        );
    });

});

function getJsonData(ID) {
    $.getJSON(`http://localhost:3000/screening/${ID}`, function (data) {
        // Ensure data is an object, and access it directly
        let screeningDate = new Date(data.Date);
        let formattedDate = screeningDate.toISOString().split('T')[0];

        // Populate the input fields with the data
        $(`#date`).val(formattedDate);
        $(`#seatsRemaining`).val(data.SeatsRemaining);
        //Populate the drop down boxes with the correct film and theatre displayed
        getFilmData(data.FilmID);
        getTheatreData(data.TheatreID);
        getStartTime(data.StartTime);


    });
}

function getFilmData(FilmID) {
    //Retrive the data from the film
    $.getJSON(`http://localhost:3000/films`, function (data) {
        $.each(data, function (i, value) {
            // IF Else to check film and select the one that is currently part of the screening
            let isSelected = (value.FilmID === FilmID) ? 'selected' : '';
            $(`#filmSelect`).append(`<option value="${value.FilmID}" ${isSelected}>${value.Name}</option>`);
        });
    });
}

function getTheatreData(TheatreID) {
    $.getJSON(`http://localhost:3000/Theatres`, function (data) {
        $.each(data, function (i, value) {
            let isSelected = (value.TheatreID === TheatreID) ? 'selected' : '';
            $(`#theatreSelect`).append(`<option value="${value.TheatreID}" ${isSelected}>${value.TheatreID}</option>`);
        });
    });
}

function getStartTime(StartTime) {
    $.getJSON(`http://localhost:3000/startTimes`, function (data) {
        $.each(data, function (i, value) {
            let isSelected = (value.StartTime === StartTime) ? 'selected' : '';
            $(`#startTime`).append(`<option value="${value.StartTime}" ${isSelected}>${value.StartTime}</option>`);
        });
    });
}