let pendingBooking = null;

// Load Destinations based on selected date
const loadDestinationsForDate = (event) => {
  event.preventDefault();
  const selectedDate = document.getElementById("flightDate").value;
  const destinations = JSON.parse(localStorage.getItem("destinations")) || [];
  const destinationSelect = document.getElementById("destination");
  destinationSelect.innerHTML = "";

  const filteredDestinations = destinations.filter(
    (dest) => dest.date === selectedDate
  );

  filteredDestinations.forEach((destination, index) => {
    const option = document.createElement("option");
    option.text = `${destination.city} (${destination.airline}) - $${destination.price}, ${destination.travelTime} hrs`;
    option.value = index; // Set value to index to uniquely identify
    destinationSelect.add(option);
  });

  document.getElementById("bookingForm").classList.remove("d-none");
};

// Directly confirm and add booking
const confirmBookingDirectly = () => {
  const passengerName = document.getElementById("passengerName").value;
  const selectedDestinationIndex = document.getElementById("destination").value;
  const destinations = JSON.parse(localStorage.getItem("destinations")) || [];

  const selectedDestination = destinations[selectedDestinationIndex]; // Find by index
  if (!selectedDestination) {
    console.error("Selected destination not found.");
    return;
  }

  pendingBooking = { passengerName, destination: selectedDestination };

  // Log a message if the price is above 500
  if (pendingBooking.destination.price > 500) {
    alert("The price of this flight is above $500. Proceeding with booking...");
  } else {
    alert("Proceeding with booking...");
  }

  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings.push({
    passengerName: pendingBooking.passengerName,
    destination: pendingBooking.destination,
  });
  localStorage.setItem("bookings", JSON.stringify(bookings));

  document.getElementById("passengerName").value = "";
  loadBookings();
};

// Load bookings from localStorage
const loadBookings = () => {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  const bookingsList = document.getElementById("bookingsList");
  bookingsList.innerHTML = "";

  bookings.forEach((booking, index) => {
    bookingsList.innerHTML += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${booking.passengerName}</td>
                        <td>${booking.destination.city}</td>
                        <td>${booking.destination.airline}</td>
                        <td>$${booking.destination.price}</td>
                        <td>
                            <button class="btn btn-sm btn-danger" onclick="deleteBooking(${index})">Delete</button>
                        </td>
                    </tr>
                `;
  });
};

// Delete booking
const deleteBooking = (index) => {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings.splice(index, 1);
  localStorage.setItem("bookings", JSON.stringify(bookings));
  loadBookings();
};

// Initialize page
document
  .getElementById("dateForm")
  .addEventListener("submit", loadDestinationsForDate);
loadBookings();
