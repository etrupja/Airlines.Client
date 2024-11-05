setInterval(() => {
  //Get the current date time
  let date = new Date();

  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  let fullDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  document.getElementById("currentDate").innerText = fullDateTime;
}, 1000);

// setTimeout(() => {
//   alert("Hello World");
// }, 10000);
