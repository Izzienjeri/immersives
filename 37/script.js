const events = [];

const eventList = document.getElementById('event-items');
const addEventButton = document.getElementById('add-event');

function displayEvents() {
  const searchTerm = document.getElementById('search-input').value.toLowerCase();
  const startDateInput = document.getElementById('start-date');
  const startDate = startDateInput.value ? new Date(startDateInput.value) : null;
  const endDateInput = document.getElementById('end-date');
  const endDate = endDateInput.value ? new Date(endDateInput.value) : null;

  eventList.innerHTML = '';

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return (
      (!startDate || eventDate >= startDate) &&
      (!endDate || eventDate <= endDate) &&
      event.name.toLowerCase().includes(searchTerm)
    );
  });

  filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

  for (const event of filteredEvents) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span>${event.name}</span>
      <span>${event.date}</span>
    `;
    eventList.appendChild(listItem);
  }
}

addEventButton.addEventListener('click', () => {
  const eventName = document.getElementById('event-name').value.trim();
  const eventDate = document.getElementById('event-date').value;

  if (eventName && eventDate) {
    events.push({ name: eventName, date: eventDate });
    displayEvents();
    alert('Event successfully added!');
    document.getElementById('event-name').value = '';
    document.getElementById('event-date').value = '';
  } else {
    alert('Please fill in both event name and date.');
  }
});

document.getElementById('search-input').addEventListener('input', displayEvents);
document.getElementById('start-date').addEventListener('change', displayEvents);
document.getElementById('end-date').addEventListener('change', displayEvents);

displayEvents();