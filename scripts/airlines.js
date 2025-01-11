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
  // Get airlines from the API
  $.ajax({
    url: "http://localhost:5201/api/Airlines/GetAirlines",
    method: "GET",
    success: function (response) {
      displayAirlines(response);
    },
    error: function (error) {
      console.error(error);
    },
  });
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

  const airlineName = $airlineNameInput.val().trim();

  if ($airlineIndexInput.val()) {
    // Update airline
    const id = $airlineIndexInput.val();

    // Call API EndPoint to update an airline
    $.ajax({
      url: `http://localhost:5201/api/Airlines/UpdateAirlineById?airlineId=${id}`,
      method: "PUT",
      contentType: "application/json",
      data: JSON.stringify({ id, name: airlineName }),
      success: function (response) {
        loadAirlines();
      },
      error: function (error) {
        console.error(error);
      },
    });
  } else {
    // Call API EndPoint to add a new airline

    $.ajax({
      url: "http://localhost:5201/api/Airlines/CreateAirline",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ name: airlineName }),
      success: function (response) {
        loadAirlines();
      },
      error: function (error) {
        console.error(error);
      },
    });
  }
  resetForm();
}

// Edit airline
function editAirline(id) {
  // Call API EndPoint to get airline by ID
  $.ajax({
    url: `http://localhost:5201/api/Airlines/GetAirlineById?airlineId=${id}`,
    method: "GET",
    success: function (response) {
      $airlineNameInput.val(response.name);
      $airlineIndexInput.val(response.id);
      $addBtn.addClass("d-none");
      $updateBtn.removeClass("d-none");
    },
    error: function (error) {
      console.error(error);
    },
  });
}

// Delete airline
function deleteAirline(id) {
  // Call API EndPoint to delete an airline
  $.ajax({
    url: `http://localhost:5201/api/Airlines/DeleteAirlineById?airlineId=${id}`,
    method: "DELETE",
    success: function (response) {
      loadAirlines();
    },
    error: function (error) {
      console.error(error);
    },
  });
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
