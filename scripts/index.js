// function updatePValue() {
//   document.getElementById("homePageP").innerHTML = "New value";
// }

// function logFormInfo(event) {
//   event.preventDefault();

//   let airlineNameValue = document.getElementById("airlineName").value;
//   alert("Airline name: " + airlineNameValue);
// }

// // setTimeout example: Executes only once after 3 seconds
// setTimeout(() => {
//   console.log("This message is shown after 3 seconds.");
// }, 3000);

// // setInterval example: Repeats every 2 seconds
// const intervalId = setInterval(() => {
//   console.log("This message is shown every 2 seconds.");
// }, 2000);

// // Clear the interval after 10 seconds
// setTimeout(() => clearInterval(intervalId), 10000);

// // Update the time every second
// setInterval(() => {
//   const now = new Date();
//   const day = now.getDay() + 1; // Days are 0-based
//   const month = now.getMonth() + 1; // Months are 0-based
//   const year = now.getFullYear();

//   const hour = now.getHours();
//   const minute = now.getMinutes();
//   const second = now.getSeconds();

//   document.getElementById(
//     "currentDate"
//   ).textContent = `${day}/${month}/${year} ${hour}:${minute}:${second}`;
// }, 1000);

// setTimeout example: Executes only once after 3 seconds
// setTimeout(() => {
//   console.log("This message is shown after 3 seconds.");
// }, 3000);

// // setInterval example: Repeats every 2 seconds
// const intervalId = setInterval(() => {
//   console.log("This message is shown every 2 seconds.");
// }, 2000);

// // Clear the interval after 10 seconds
// setTimeout(() => clearInterval(intervalId), 10000);

// // Update the time every second
// setInterval(() => {
//   const now = new Date();
//   const day = now.getDay() + 1; // Days are 0-based
//   const month = now.getMonth() + 1; // Months are 0-based
//   const year = now.getFullYear();

//   const hour = now.getHours();
//   const minute = now.getMinutes();
//   const second = now.getSeconds();

//   $("#currentDate").text(`${day}/${month}/${year} ${hour}:${minute}:${second}`);
// }, 1000);

$(document).ready(function () {
  const intervalId = setInterval(() => {
    getWeatherInTirana();
    $("#lastUpdate").text(new Date().toLocaleString());
  }, 10000);

  function getWeatherInTirana() {
    const settings = {
      async: true,
      crossDomain: true,
      url: "https://open-weather13.p.rapidapi.com/city/tirana/EN",
      method: "GET",
      headers: {
        "x-rapidapi-key": "4899b5a1f2msh3594b57d4f697f7p185222jsne688960537df",
        "x-rapidapi-host": "open-weather13.p.rapidapi.com",
      },
    };

    $.ajax(settings).done(function (response) {
      console.log("ervis ------- ", response);

      console.log("ervis ------- ", response.main?.temp);
      $("#weatherContent").html(response.main?.temp);
    });
  }

  $("#openModal").click(function () {
    $("#modal").show(); // Show modal
  });
  $("#closeModal").click(function () {
    $("#modal").hide(); // Hide modal
  });
});
