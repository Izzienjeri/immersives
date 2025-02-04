const reservations = JSON.parse(localStorage.getItem("reservations")) || [];

document.addEventListener("DOMContentLoaded", () => {
  const reservationList = document.getElementById("reservationList");

  if (reservations.length === 0) {
    const noReservations = document.createElement("p");
    noReservations.textContent = "No reservations found.";
    reservationList.appendChild(noReservations);
  }
  reservations.forEach((reservation) => {
    const reservationItem = document.createElement("div");
    reservationItem.classList.add("reservation-item");
    reservationItem.innerHTML = `
            <h3>${reservation.name}</h3>
            <p>${reservation.phone}</p>
            <p>${reservation.guests} guests</p>
            <p>${reservation.date} at ${reservation.time}</p>
        `;
    reservationList.appendChild(reservationItem);
  });
});
