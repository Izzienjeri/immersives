document
	.getElementById("reservationForm")
	.addEventListener("submit", (event) => {
		event.preventDefault();
		const name = document.getElementById("name").value;
		const phone = document.getElementById("phone").value;
		const guests = document.getElementById("guests").value;
		const date = document.getElementById("date").value;
		const time = document.getElementById("time").value;
		const reservation = {
			name: name,
			phone: phone,
			guests: guests,
			date: date,
			time: time,
		};

		const reservations =
			JSON.parse(localStorage.getItem("reservations")) || [];
		reservations.push(reservation);
		localStorage.setItem("reservations", JSON.stringify(reservations));

		document.getElementById("reservationForm").reset();
	});