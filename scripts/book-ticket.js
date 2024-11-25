let pendingBooking = null;

// jQuery document ready
$(document).ready(function () {
  // Initialize page
  $("#dateForm").on("submit", loadDestinationsForDate);
  loadBookings();
});

// Load Destinations based on selected date
const loadDestinationsForDate = (event) => {
  event.preventDefault();
  const selectedDate = $("#flightDate").val();
  const destinations = JSON.parse(localStorage.getItem("destinations")) || [];
  const $destinationSelect = $("#destination");
  $destinationSelect.empty();

  const filteredDestinations = destinations.filter(
    (dest) => dest.date === selectedDate
  );

  filteredDestinations.forEach((destination, index) => {
    const $option = $("<option></option>")
      .text(
        `${destination.city} (${destination.airline}) - $${destination.price}, ${destination.travelTime} hrs`
      )
      .val(index); // Set value to index to uniquely identify
    $destinationSelect.append($option);
  });

  $("#bookingForm").removeClass("d-none");
};

// Directly confirm and add booking
const confirmBookingDirectly = () => {
  const passengerName = $("#passengerName").val();
  const selectedDestinationIndex = $("#destination").val();
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

  $("#passengerName").val("");
  loadBookings();
};

// Load bookings from localStorage
const loadBookings = () => {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  const $bookingsList = $("#bookingsList");
  $bookingsList.empty();

  bookings.forEach((booking, index) => {
    const $row = $(`
      <tr>
        <td>${index + 1}</td>
        <td>${booking.passengerName}</td>
        <td>${booking.destination.city}</td>
        <td>${booking.destination.airline}</td>
        <td>$${booking.destination.price}</td>
        <td>
          <button class="btn btn-sm btn-danger delete-booking" data-index="${index}">Delete</button>
        </td>
      </tr>
    `);
    $bookingsList.append($row);
  });
};

// Delete booking
const deleteBooking = (index) => {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings.splice(index, 1);
  localStorage.setItem("bookings", JSON.stringify(bookings));
  loadBookings();
};

// Event delegation for delete buttons
$("#bookingsList").on("click", ".delete-booking", function () {
  const index = $(this).data("index");
  deleteBooking(index);
});

// Note: Make sure to include jQuery and Bootstrap in your HTML:
// <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
// <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
// <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
