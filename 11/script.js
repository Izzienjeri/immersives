let events = [];

const eventNameInput = document.getElementById("eventName");
const eventDateInput = document.getElementById("eventDate");
const eventTimeInput = document.getElementById("eventTime");
const eventDescriptionInput = document.getElementById("eventDescription");
const addEventButton = document.getElementById("addEvent");

const filterDateInput = document.getElementById("filterDate");
const filterKeywordInput = document.getElementById("filterKeyword");

const eventList = document.getElementById("eventList");

function addEvent() {
  const eventName = eventNameInput.value.trim();
  const eventDate = eventDateInput.value.trim();
  const eventTime = eventTimeInput.value.trim();
  const eventDescription = eventDescriptionInput.value.trim();

  if (!eventName || !eventDate || !eventTime || !eventDescription) {
    alert("Please fill out all fields.");
    return;
  }

  const event = {
    name: eventName,
    date: eventDate,
    time: eventTime,
    description: eventDescription,
  };

  events.push(event);

  eventNameInput.value = "";
  eventDateInput.value = "";
  eventTimeInput.value = "";
  eventDescriptionInput.value = "";

  displayEvents();
}

function convertTo12HourFormat(time) {
  const [hours, minutes] = time.split(":");
  const period = hours >= 12 ? "PM" : "AM";
  const adjustedHours = hours % 12 || 12;
  return `${adjustedHours}:${minutes} ${period}`;
}

function displayEvents() {
  const eventList = document.querySelector("#eventList ul");
  eventList.innerHTML = "";

  const filteredEvents = filterEvents();
  filteredEvents.forEach((event) => {
    const eventItem = document.createElement("li");
    const formattedTime = convertTo12HourFormat(event.time);
    eventItem.innerHTML = `
        <strong>${event.name}</strong><br>
        ${event.date} ${formattedTime}<br>
        ${event.description}
      `;
    eventList.appendChild(eventItem);
  });
}

function filterEvents() {
  const filterDate = filterDateInput.value.trim();
  const filterKeyword = filterKeywordInput.value.trim().toLowerCase();

  return events.filter((event) => {
    const matchesDate = !filterDate || event.date === filterDate;
    const matchesKeyword =
      !filterKeyword ||
      event.name.toLowerCase().includes(filterKeyword) ||
      event.description.toLowerCase().includes(filterKeyword);

    return matchesDate && matchesKeyword;
  });
}

addEventButton.addEventListener("click", addEvent);
filterDateInput.addEventListener("change", displayEvents);
filterKeywordInput.addEventListener("input", displayEvents);

displayEvents();
