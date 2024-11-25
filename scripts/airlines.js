// Get references to elements using jQuery
const $airlineForm = $("#airlineForm");
const $airlineNameInput = $("#airlineName");
const $airlineIndexInput = $("#airlineIndex");
const $addBtn = $("#addBtn");
const $updateBtn = $("#updateBtn");
const $airlinesList = $("#airlinesList");

// Generate a unique ID using Math
function generateUniqueId() {
  return Math.random().toString(36).substring(2, 15);
}

// Load airlines from Local Storage
function loadAirlines() {
  const airlines = JSON.parse(localStorage.getItem("airlines")) || [];
  displayAirlines(airlines);
}

// Display airlines in the table
function displayAirlines(airlines) {
  $airlinesList.empty();
  airlines.forEach((airline) => {
    const $row = $("<tr></tr>");

    $row.html(`
      <td>${airline.id}</td>
      <td>${airline.name}</td>
      <td>
        <button class="btn btn-warning btn-sm edit-btn" data-id="${airline.id}">Edit</button>
        <button class="btn btn-danger btn-sm delete-btn" data-id="${airline.id}">Delete</button>
      </td>
    `);

    $airlinesList.append($row);
  });
}

// Save a new or updated airline
function saveAirline(event) {
  event.preventDefault();
  const airlines = JSON.parse(localStorage.getItem("airlines")) || [];
  const airlineName = $airlineNameInput.val().trim();
  const id = $airlineIndexInput.val() || generateUniqueId();

  if ($airlineIndexInput.val()) {
    // Update existing airline by ID
    const airline = airlines.find((airline) => airline.id === id);
    if (airline) {
      airline.name = airlineName;
    }
  } else {
    // Add new airline with a unique ID generated by Math
    airlines.push({ id, name: airlineName });
  }

  localStorage.setItem("airlines", JSON.stringify(airlines));
  loadAirlines();
  resetForm();
}

// Edit airline
function editAirline(id) {
  const airlines = JSON.parse(localStorage.getItem("airlines")) || [];
  const airline = airlines.find((airline) => airline.id === id);
  if (airline) {
    $airlineNameInput.val(airline.name);
    $airlineIndexInput.val(id);
    $addBtn.addClass("d-none");
    $updateBtn.removeClass("d-none");
  }
}

// Delete airline
function deleteAirline(id) {
  const airlines = JSON.parse(localStorage.getItem("airlines")) || [];
  const updatedAirlines = airlines.filter((airline) => airline.id !== id);
  localStorage.setItem("airlines", JSON.stringify(updatedAirlines));
  loadAirlines();
}

// Reset form after updating
function resetForm() {
  $airlineNameInput.val("");
  $airlineIndexInput.val("");
  $addBtn.removeClass("d-none");
  $updateBtn.addClass("d-none");
}

// Event handlers using jQuery
$airlineForm.on("submit", saveAirline);
$updateBtn.on("click", saveAirline);

// Event delegation for dynamically created buttons
$airlinesList.on("click", ".edit-btn", function () {
  const id = $(this).data("id");
  editAirline(id);
});

$airlinesList.on("click", ".delete-btn", function () {
  const id = $(this).data("id");
  deleteAirline(id);
});

// Load airlines on page load
$(document).ready(function () {
  loadAirlines();
});

// Note: Make sure to include jQuery and Bootstrap in your HTML:
// <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
// <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
// <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
