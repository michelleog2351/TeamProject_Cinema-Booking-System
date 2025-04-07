$(document).ready(function () {
	nav();
	footer();
	filmDD();
	dateDD();
	startTimeDD();
});

function filmDD() {
	$.getJSON("http://localhost:3000/films", function (data) {
		// Sort films alphabetically
		data.sort((a, b) => a.Name.localeCompare(b.Name));

		let selectFilm = $("#selectFilm");
		let filmCards = $("#filmCards");

		selectFilm.html('<option value="" selected>Show All Films</option>');
		filmCards.empty();

		$.each(data, function (i, film) {
			selectFilm.append(`<option value="${film.FilmID}">${film.Name}</option>`);

			// Display all film cards initially
			filmCards.append(createFilmCard(film));
		});
	});

	$("#selectDate").prop("disabled", true);
	$("#selectStartTime").prop("disabled", true);

	// Handle dropdown film selection change
	$("#selectFilm").change(function () {
		let filmID = $(this).val();
		let filmCards = $("#filmCards");

		// reset the date and time when new film name is selected, initially set to false until film name selected
		$("#selectDate")
			.html('<option value="" selected>Select Date</option>')
			.prop("disabled", false);
		$("#selectStartTime")
			.html('<option value="" selected>Select Time</option>')
			.prop("disabled", false);

		filmCards.empty(); // Clear existing cards
		if (filmID) {
			$.getJSON(`http://localhost:3000/film/${filmID}`, function (film) {
				$("#filmRows").html(`
				<div class="container mt-4">
						<div class="row">
							<div class="col-md-4">

									<div class="position-relative">
										<img src="/images/${film.CoverImage}"
										class="card-img-top img-fluid rounded shadow" 
										alt="${
											film.Name
										}" style="height: 400px; object-fit: cover; border-radius: 10px;"/>

										<div class="overlay">
											<div class="overlay-content">
												<a href="Customer/Film/filmDetails.html?filmID=${film.FilmID}"
												class="btn btn-primary overlay-button">Watch: ${film.Name} Now</a> 
											</div>           
										</div>
									</div>
							</div>

							<div class="col-md-8">
								<h2 class="fw-bold">${film.Name}</h2>
								<p>
								<img src="http://localhost:3000/images/${film.Genre.replace(/\s+/g, "_")}.jpg" 
									class="img-fluid rounded shadow" 
									alt="${film.Name}" 
									style="height:30px; width:30px;"> | ${film.Category} | ${film.RunningTime} mins
								</p>			
							<div id="screeningsTbody" class="mt-3"></div>
							</div>
					</div>
				</div>
			`);
			});
			// <p>${film.Description}</p>

			fetchScreenings(filmID);
			dateDD(filmID);
		} else {
			$.getJSON("http://localhost:3000/films", function (data) {
				// Show all films again with sorting
				$.each(
					data.sort((a, b) => a.Name.localeCompare(b.Name)),
					function (i, film) {
						filmCards.append(createFilmCard(film));
					}
				);
			});
			$("#screeningsTbody").empty();

			$("#filmRows").html("");
		}
	});
}

// Helper function to create film card
function createFilmCard(film) {
	return `
		<br />
		<div class="col-md-2 col-sm-6 mb-3">
			<div class="card">
				<img src="images/${film.CoverImage}" 
					class="card-img-top img-fluid w-100"
					alt="${film.Name}"
					style="height: 400px; object-fit: cover; border-radius: 10px;"
				/>
				<div class="overlay">
					<div class="overlay-content">
						<a href="Customer/Film/filmDetails.html?filmID=${film.FilmID}"
						class="btn btn-primary overlay-button">Watch: ${film.Name} Now</a> 
					</div>           
				</div>
			</div> 
		</div>`;
}

function dateDD(filmID) {
	if (!filmID) {
		$("#selectDate").html('<option value="" selected>Select Date</option>');
	}

	$.getJSON(`http://localhost:3000/filmScreenings/${filmID}`, function (data) {
		let selectDate = $("#selectDate");
		selectDate.html('<option value="" selected>Select Date</option>');
		let specificDates = [];

		$.each(data, function (i, screening) {
			let screeningDate = new Date(screening.Date);
			let formattedDate = screeningDate.toLocaleString("en-GB", {
				timeZone: "Europe/London",
				year: "numeric",
				month: "numeric",
				day: "numeric",
			});

			// let formattedDate = new Date(screening.Date).toLocaleDateString("en-GB", {
			//   weekday: "long", // Wednesday,
			//   month: "long", // March
			//   day: "numeric", // 26
			// });
			// let formattedDate = new Date(screening.Date).toISOString().split("T")[0];

			//  formattedDate = formattedDate.replace(/^(\w+)(?=\s)/, "$1,");

			// check if its present in the array
			if (!specificDates.includes(formattedDate)) {
				specificDates.push(formattedDate); // add this to the array
				selectDate.append(
					`<option value="${formattedDate}">${formattedDate}</option>`
				);
			}
		});
	});

	// updating available times dynamically based on selected date
	$("#selectDate").change(function () {
		let filmID = $("#selectFilm").val();
		let selectDate = $(this).val();
		startTimeDD(filmID, selectDate);
	});
}

function startTimeDD(filmID, selectDate) {
	if (!filmID || !selectDate) {
		$("#selectStartTime").html(
			'<option value="" selected>Select Time</option>'
		);
		return; // this stops any unnecessary API calls
	}

	$.getJSON(`http://localhost:3000/filmScreenings/${filmID}`, function (data) {
		$("#selectStartTime").html(
			'<option value="" selected>Select Time</option>'
		);
		$.each(data, function (i, screening) {
			let screeningDate = new Date(screening.Date);

			let formattedDate = screeningDate.toLocaleString("en-GB", {
				timeZone: "Europe/London",
				year: "numeric",
				month: "numeric",
				day: "numeric",
			});

			// let screeningDate = new Date(screening.Date).toLocaleDateString("en-GB", {
			//   weekday: "long", // Wednesday
			//   month: "long", // March
			//   day: "numeric", // 26
			// });
			// let screeningDate = new Date(screening.Date).toISOString().split("T")[0];

			//screeningDate = screeningDate.replace(/^(\w+)(?=\s)/, "$1,");

			if (formattedDate === selectDate) {
				$("#selectStartTime").append(
					`<option value="${screening.StartTime}">${screening.StartTime}</option>`
				);
			}
		});
	});
}

function fetchScreenings(filmID) {
	$("#screeningsTbody").empty(); // Clear existing rows

	if (!filmID) {
		$("#filmRows").addClass("d-none"); // Hide table if no film selected
		return;
	}

	$.getJSON(`http://localhost:3000/filmScreenings/${filmID}`, function (data) {
		if (data.length > 0) {
			$("#filmRows").removeClass("d-none");

			// create an object that will store all the screenings grouped by date
			// using an array would be inefficient esp. in cases where there are multiple screenings for the same date,
			// when you can group you have multiple screenings for a single date
			let screeningsByDate = {};

			$.each(data, function (i, value) {
				let screeningDate = new Date(value.Date);
				let formattedDate = screeningDate.toLocaleString("en-GB", {
					timeZone: "Europe/London",
					year: "numeric",
					month: "numeric",
					day: "numeric",
				});

				// let formattedDate = new Date(value.Date).toISOString().split("T")[0];
				// let formattedDate = new Date(value.Date).toLocaleDateString("en-GB", {
				//   weekday: "short", // Wed
				//   month: "short", // Mar
				//   day: "numeric", // 26
				// });
				// formattedDate = formattedDate.replace(/^(\w+)(?=\s)/, "$1,");

				if (!screeningsByDate[formattedDate]) {
					screeningsByDate[formattedDate] = [];
				}
				screeningsByDate[formattedDate].push(value);
			});

			$.each(screeningsByDate, function (date, screening) {
				let timeButtonsHtml = `<div class="d-flex flex-wrap mt-2">`;
				let booksButtonHtml = `<div class="d-flex flex-wrap">`;

				$.each(screening, function (i, value) {
					timeButtonsHtml += `
								<button class="btn btn-outline-primary mx-1 startTime-btn" data-id="${value.ScreeningID}">
										${value.StartTime}
								</button>
						`;

					booksButtonHtml += `
								<button
										type="button"
										class="btn btn-primary book-tickets-btn w-100 mx-1"
										data-id="${value.ScreeningID}"
										title="Click here to book tickets!"
								>
										Book Tickets
								</button>
						`;
				});

				// Move the closing div outside of the loop to keep all buttons in the same flex row
				timeButtonsHtml += `</div>`;
				booksButtonHtml += `</div>`;

				$(".book-tickets-div").html(booksButtonHtml);

				$("#screeningsTbody").append(`
						<tr>
								<td colspan="3"><strong>${date}</strong></td>
						</tr>
						<tr>
								<td colspan="3">Screen ${screening[0].TheatreID}</td>
						</tr>
						<tr>
								<td colspan="3">${timeButtonsHtml}</td>
						</tr>
						<tr>
								<td><hr></td>
						</tr>
				`);
			});
		} else {
			$("#filmRows").addClass("d-none");
		}
	});
}

$(document).on("click", ".book-tickets-btn", function () {
	//let screeningID = $(this).data("id");

	//Post to screeningByFilter. response is the ScreeningID

	//send an object with following
	//May need to change these values in order to post them correctly
	//Take a look through other files to see how they conducted this

	let filmID = $("#selectFilm").val();
	let date = $("#selectDate").val();
	let startTime = $("#selectStartTime").val();
	
	date = new Date(date);
	let formattedDate = date.toISOString().split("T")[0];


	// Debugging logs
	console.log("Film ID:", filmID);
	console.log("Date:", formattedDate);
	console.log("Start Time:", startTime);

	// if (filmID && date && startTime) {
	//   localStorage.setItem("ViewScreeningID", screeningID);
	//   window.location.href = `http://localhost:3000/booking/createBooking.html?screeningID=${screeningID}`;
	//   // console.log($(this).data("id"));
	// } else {
	//   alert("Please select a film, date, and time before booking.");
	// }
	if (!filmID || !formattedDate || !startTime) {
		alert("Please select a film, date, and time before booking.");
		return;
	}
	// let parsedDate = new Date(date);
	// let formattedDate = parsedDate.toISOString().split("T")[0];  // Converts to YYYY-MM-DD format

	// database expects this date format
	//date = new Date(date);

	let ScreeningBooking = {
		filmID: filmID,
		date: formattedDate,
		startTime: startTime,
	};
	console.log(ScreeningBooking)

	$.post(
		"http://localhost:3000/screeningsByFilter",
		ScreeningBooking,
		function (response) {
			console.log("Screening ID received:", response);
			if (response) {
				localStorage.setItem("ViewScreeningID", response);
				window.location.href = `http://localhost:3000/booking/createBooking.html?screeningID=${response}`;
			} else {
				alert("Screening not found. Please check your selection.");
			}
		}
	).fail(function (xhr) {
		console.error("Error:", xhr.responseText);
		alert("Screening not found. Please check your selection.");
	});

	// $.post(`http://localhost:3000/screeningsByFilter`, findScreening).done(
	//   function (ScreeningBooking) {
	//     //EXPRESS ROUTE AND SQL works fine when all values are in correct format!
	//   }
	// );
});

$(document).on("click", ".startTime-btn", function () {
	let screeningID = $(this).data("id");
	localStorage.setItem("ViewScreeningID", screeningID);
	// localStorage.setItem("SelectedFilmID", filmID);
	// localStorage.setItem("SelectedDate", date);
	//localStorage.setItem("SelectedTime", time);
	window.location.href = `http://localhost:3000/booking/createBooking.html?screeningID=${screeningID}`;
});

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
