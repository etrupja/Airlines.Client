let flightDateInput = document.getElementById("flightDate");
let passengerNameInput = document.getElementById("passengerName");
let destinationSelect = document.getElementById("destination");
let bookingForm = document.getElementById("bookingForm");
let bookingsList = document.getElementById("bookingsList");
let confirmBookingBtn = document.getElementById("confirmBooking");

function loadDestinations() {
  const destinations = JSON.parse(localStorage.getItem("destinations")) || [];
  destinationSelect.innerHTML = "";
  destinations.forEach((destination) => {
    const option = document.createElement("option");
    option.value = destination.id;
    option.textContent = destination.city;
    destinationSelect.appendChild(option);
  });
}

function showAppropriateModal() {
  new bootstrap.Modal(document.getElementById("confirmationModal")).show();
}

function addBooking(passengerName, destinationId, airline, price) {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  const id = Math.random().toString(36);
  bookings.push({ id, passengerName, destinationId, airline, price });
  localStorage.setItem("bookings", JSON.stringify(bookings));
  loadBookings();
}

function loadBookings() {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookingsList.innerHTML = "";
  bookings.forEach((booking, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${booking.passengerName}</td>
      <td>${booking.destinationId}</td>
      <td>${booking.airline}</td>
      <td>${booking.price}</td>
      <td>
        <button class="btn btn-danger btn-sm" onclick="deleteBooking('${
          booking.id
        }')">Delete</button>
      </td>
    `;
    bookingsList.appendChild(row);
  });
}

function deleteBooking(id) {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  const updatedBookings = bookings.filter((booking) => booking.id !== id);
  localStorage.setItem("bookings", JSON.stringify(updatedBookings));
  loadBookings();
}

confirmBookingBtn.addEventListener("click", () => {
  const passengerName = passengerNameInput.value.trim();
  const destinationId = destinationSelect.value;
  const selectedDestination = destinations.find(
    (dest) => dest.id === destinationId
  );

  addBooking(
    passengerName,
    destinationId,
    selectedDestination.airline,
    selectedDestination.price
  );
});

loadDestinations();
loadBookings();
