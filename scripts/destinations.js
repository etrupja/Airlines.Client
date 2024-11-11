let destinationCityInput = document.getElementById("destinationCity");
let priceInput = document.getElementById("price");
let dateInput = document.getElementById("date");
let airlineSelect = document.getElementById("airline");
let travelTimeInput = document.getElementById("travelTime");
let destinationsList = document.getElementById("destinationsList");
let addDestinationBtn = document.getElementById("addDestinationBtn");
let updateDestinationBtn = document.getElementById("updateDestinationBtn");
let destinationIndexInput = document.getElementById("destinationIndex");

function loadAirlines() {
  const airlines = JSON.parse(localStorage.getItem("airlines")) || [];
  airlineSelect.innerHTML = "";
  airlines.forEach((airline) => {
    const option = document.createElement("option");
    option.value = airline.id;
    option.textContent = airline.name;
    airlineSelect.appendChild(option);
  });
}

function loadDestinations() {
  const destinations = JSON.parse(localStorage.getItem("destinations")) || [];
  displayDestinations(destinations);
}

function displayDestinations(destinations) {
  destinationsList.innerHTML = "";
  destinations.forEach((destination, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${destination.city}</td>
      <td>${destination.airline}</td>
      <td>${destination.price}</td>
      <td>${destination.travelTime}</td>
      <td>${destination.date}</td>
      <td>
        <button class="btn btn-warning btn-sm" onclick="editDestination('${
          destination.id
        }')">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteDestination('${
          destination.id
        }')">Delete</button>
      </td>
    `;
    destinationsList.appendChild(row);
  });
}

function saveDestination(event) {
  event.preventDefault();
  const destinations = JSON.parse(localStorage.getItem("destinations")) || [];
  const id = Math.random().toString(36);
  const destination = {
    id,
    city: destinationCityInput.value.trim(),
    price: priceInput.value,
    date: dateInput.value,
    airline: airlineSelect.value,
    travelTime: travelTimeInput.value,
  };
  destinations.push(destination);
  localStorage.setItem("destinations", JSON.stringify(destinations));
  loadDestinations();
}

function editDestination(id) {
  const destinations = JSON.parse(localStorage.getItem("destinations")) || [];
  const destination = destinations.find((dest) => dest.id === id);
  if (destination) {
    destinationCityInput.value = destination.city;
    priceInput.value = destination.price;
    dateInput.value = destination.date;
    airlineSelect.value = destination.airline;
    travelTimeInput.value = destination.travelTime;
    destinationIndexInput.value = id;
    addDestinationBtn.classList.add("d-none");
    updateDestinationBtn.classList.remove("d-none");
  }
}

function updateDestination(event) {
  event.preventDefault();
  const destinations = JSON.parse(localStorage.getItem("destinations")) || [];
  const destination = destinations.find(
    (dest) => dest.id === destinationIndexInput.value
  );
  if (destination) {
    destination.city = destinationCityInput.value.trim();
    destination.price = priceInput.value;
    destination.date = dateInput.value;
    destination.airline = airlineSelect.value;
    destination.travelTime = travelTimeInput.value;
  }
  localStorage.setItem("destinations", JSON.stringify(destinations));
  loadDestinations();
}

function deleteDestination(id) {
  const destinations = JSON.parse(localStorage.getItem("destinations")) || [];
  const updatedDestinations = destinations.filter(
    (destination) => destination.id !== id
  );
  localStorage.setItem("destinations", JSON.stringify(updatedDestinations));
  loadDestinations();
}

addDestinationBtn.addEventListener("click", saveDestination);
updateDestinationBtn.addEventListener("click", updateDestination);
loadAirlines();
loadDestinations();
