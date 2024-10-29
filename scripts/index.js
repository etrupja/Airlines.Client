function navbarClicked() {
    alert('Navbar clicked - external file');
}

function updatePValue(){
    document.getElementById('homePageP').innerHTML = 'New value';
}

function logFormInfo(event){

    event.preventDefault();

    let airlineNameValue = document.getElementById('airlineName').value;
    alert('Airline name: ' + airlineNameValue);
}