// jQuery element references (unchanged)
const $destinationCityInput = $("#destinationCity");
const $priceInput = $("#price");
const $dateInput = $("#date");
const $airlineSelect = $("#airline");
const $travelTimeInput = $("#travelTime");
const $destinationsList = $("#destinationsList");
const $addDestinationBtn = $("#addDestinationBtn");
const $updateDestinationBtn = $("#updateDestinationBtn");
const $destinationIndexInput = $("#destinationIndex");

// Document ready handler (unchanged)
$(document).ready(function () {
  loadAirlines();
  loadDestinations();

  $addDestinationBtn.on("click", saveDestination);
  $updateDestinationBtn.on("click", updateDestination);
});

// Helper function to get airline name by ID (existing function)
function getAirlineName(airlineId) {
  const airlines = JSON.parse(localStorage.getItem("airlines")) || [];
  const airline = airlines.find((airline) => airline.id === airlineId);
  return airline ? airline.name : "Unknown Airline";
}

// Helper function to get destination by ID
function getDestinationName(destinationId) {
  const destinations = JSON.parse(localStorage.getItem("destinations")) || [];
  const destination = destinations.find((dest) => dest.id === destinationId);
  return destination ? destination.city : "Unknown Destination";
}

function loadAirlines() {
  const airlines = JSON.parse(localStorage.getItem("airlines")) || [];
  $airlineSelect.empty();

  airlines.forEach((airline) => {
    const $option = $("<option></option>").val(airline.id).text(airline.name);
    $airlineSelect.append($option);
  });
}

function loadDestinations() {
  const destinations = JSON.parse(localStorage.getItem("destinations")) || [];
  displayDestinations(destinations);
}

function displayDestinations(destinations) {
  $destinationsList.empty();

  destinations.forEach((destination, index) => {
    // Get the airline name for display
    const airlineName = getAirlineName(destination.airline);
    // const destinationName = getDestinationName(destination.id);

    const $row = $(`
      <tr>
        <td>${index + 1}</td>
        <td>${destination.city}</td>
        <td>${airlineName}</td>
        <td>$${parseFloat(destination.price).toFixed(2)}</td>
        <td>${destination.travelTime} hrs</td>
        <td>${new Date(destination.date).toLocaleDateString()}</td>
        <td>
          <button class="btn btn-warning btn-sm edit-destination" data-id="${
            destination.id
          }">Edit</button>
          <button class="btn btn-danger btn-sm delete-destination" data-id="${
            destination.id
          }">Delete</button>
        </td>
      </tr>
    `);

    $destinationsList.append($row);
  });
}

// Save destination (store ID but display name)
function saveDestination(event) {
  event.preventDefault();
  const destinations = JSON.parse(localStorage.getItem("destinations")) || [];
  const id = Math.random().toString(36);

  const destination = {
    id,
    city: $destinationCityInput.val().trim(),
    price: parseFloat($priceInput.val()).toFixed(2),
    date: $dateInput.val(),
    airline: $airlineSelect.val(), // Store airline ID
    travelTime: parseFloat($travelTimeInput.val()).toFixed(1),
  };

  destinations.push(destination);
  localStorage.setItem("destinations", JSON.stringify(destinations));
  loadDestinations();
}

function editDestination(id) {
  const destinations = JSON.parse(localStorage.getItem("destinations")) || [];
  const destination = destinations.find((dest) => dest.id === id);

  if (destination) {
    $destinationCityInput.val(destination.city);
    $priceInput.val(destination.price);
    $dateInput.val(destination.date);
    $airlineSelect.val(destination.airline); // Use airline ID for select
    $travelTimeInput.val(destination.travelTime);
    $destinationIndexInput.val(id);
    $addDestinationBtn.addClass("d-none");
    $updateDestinationBtn.removeClass("d-none");
  }
}

function updateDestination(event) {
  event.preventDefault();
  const destinations = JSON.parse(localStorage.getItem("destinations")) || [];
  const destination = destinations.find(
    (dest) => dest.id === $destinationIndexInput.val()
  );

  if (destination) {
    destination.city = $destinationCityInput.val().trim();
    destination.price = parseFloat($priceInput.val()).toFixed(2);
    destination.date = $dateInput.val();
    destination.airline = $airlineSelect.val(); // Store airline ID
    destination.travelTime = parseFloat($travelTimeInput.val()).toFixed(1);
  }

  localStorage.setItem("destinations", JSON.stringify(destinations));
  loadDestinations();
}

// Delete destination (unchanged)
function deleteDestination(id) {
  const destinations = JSON.parse(localStorage.getItem("destinations")) || [];
  const updatedDestinations = destinations.filter(
    (destination) => destination.id !== id
  );
  localStorage.setItem("destinations", JSON.stringify(updatedDestinations));
  loadDestinations();
}

// Event delegation (unchanged)
$destinationsList.on("click", ".edit-destination", function () {
  const id = $(this).data("id");
  editDestination(id);
});

$destinationsList.on("click", ".delete-destination", function () {
  const id = $(this).data("id");
  deleteDestination(id);
});
