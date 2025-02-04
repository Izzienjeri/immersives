const calendarEl = document.getElementById("calendar");
const monthSelect = document.getElementById("monthSelect");
const yearSelect = document.getElementById("yearSelect");

const events = [
  {
    title: "International Art Exhibition",
    date: "2025-01-27",
    submissionDeadline: "2025-01-20",
    description: "Submit your artwork for a chance to be featured...",
  },
  {
    title: "International Music Festival",
    date: "2025-01-31",
    submissionDeadline: "2025-01-25",
    description: "Submit your video performance for a chance to be featured...",
  },
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

for (let i = 0; i < monthNames.length; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.text = monthNames[i];
  monthSelect.appendChild(option);
}

const thisYear = new Date().getFullYear();
for (let i = thisYear - 5; i <= thisYear + 5; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.text = i;
  yearSelect.appendChild(option);
}

function createCalendar(month, year) {
  const calendarEl = document.getElementById("calendar");
  const today = new Date();
  const currentMonth = month;
  const currentYear = year;
  calendarEl.innerHTML = "";

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const firstDayWeekIndex = firstDayOfMonth.getDay();

  const numDaysInMonth = lastDayOfMonth.getDate();

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let calendarHeader = "";
  for (const day of daysOfWeek) {
    calendarHeader += `<div class="day">${day}</div>`;
  }
  calendarEl.innerHTML = calendarHeader;

  let dayCounter = 1;
  let dayIndex = firstDayWeekIndex;

  for (let i = 0; i < firstDayWeekIndex; i++) {
    calendarEl.innerHTML += `<div class="day"></div>`;
    dayIndex++;
  }

  monthSelect.value = month;
  yearSelect.value = year;

  while (dayCounter <= numDaysInMonth) {
    const date = new Date(currentYear, currentMonth, dayCounter + 1);
    const dateString = date.toISOString().slice(0, 10);

    const eventsOnDate = events.filter((event) => event.date === dateString);

    let dayContent = `<div class="day text-bold">${dayCounter}`;
    for (const event of eventsOnDate) {
      dayContent += `
        <div class="event">
          <div class="event-title">${event.title}</div>
          <div class="event-details" hidden>
            <p class="lead">${event.description}</p>

            <p class="lead">
            ${
              event.submissionDeadline
                ? `<br>Deadline: ${event.submissionDeadline}`
                : ""
            }
            </p>
          </div>
        </div>`;
    }
    dayContent += `</div>`;

    calendarEl.innerHTML += dayContent;

    dayCounter++;
    dayIndex = (dayIndex + 1) % 7;
  }
}

function updateCalendar() {
  const selectedMonth = parseInt(monthSelect.value);
  const selectedYear = parseInt(yearSelect.value);
  createCalendar(selectedMonth, selectedYear);
}

monthSelect.addEventListener("change", updateCalendar);
yearSelect.addEventListener("change", updateCalendar);

createCalendar(new Date().getMonth(), new Date().getFullYear());

document.addEventListener("DOMContentLoaded", () => {
  const knowMore = document.querySelectorAll(".event");
  const modal = new bootstrap.Modal(document.getElementById("eventModal"));
  const modalTitle = document.querySelector("#eventModal .modal-title");
  const modalBody = document.querySelector("#eventModal .modal-body");

  knowMore.forEach((button) => {
    button.addEventListener("click", (event) => {
      const cardTitle = event.target
        .closest(".event")
        .querySelector(".event-title").textContent;
      const cardText = event.target
        .closest(".event")
        .querySelector(".event-details").textContent;
      modalTitle.textContent = cardTitle;
      modalBody.innerHTML = cardText;
      modal.show();
    });
  });
});
