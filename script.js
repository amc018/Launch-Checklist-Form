

window.addEventListener("load", function() {
   this.fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then(function(json) {
         let index = Math.floor(Math.random() * json.length);
         console.log(json[index].name);
         document.getElementById("missionTarget").innerHTML = `
            <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${json[index].name}</li>
               <li>Diameter: ${json[index].diameter}</li>
               <li>Star: ${json[index].star}</li>
               <li>Distance from Earth: ${json[index].distance}</li>
               <li>Number of Moons: ${json[index].moons}</li>
            </ol>
            <img src="${json[index].image}">
         `;
      });
   });


   let form = document.querySelector("form");
   form.addEventListener("submit", function(event) {

      let pilotNameInput = document.querySelector("input[name=pilotName]");
      let coPilotNameInput = document.querySelector("input[name=copilotName]");
      let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
      let cargoMassInput = document.querySelector("input[name=cargoMass]");
      let fieldCheck = false;
      let cargoReady = false;
      let fuelReady = false;

      document.getElementById('launchStatus').innerText = 'Awaiting Information Before Launch';
      document.getElementById('launchStatus').style.color= "black";
      document.getElementById("pilotStatus").innerText = `Pilot ${pilotNameInput.value} is ready for launch`;
      document.getElementById("copilotStatus").innerText = `Co-Pilot ${coPilotNameInput.value} is ready for launch`;
      document.getElementById("fuelStatus").innerText = "Fuel Level high enough for launch";
      document.getElementById("cargoStatus").innerText = "Cargo Mass low enough for launch";

      

      if (pilotNameInput.value.trim() === "" || coPilotNameInput.value.trim() === "" || fuelLevelInput.value.trim() === "" || cargoMassInput.value.trim() === "") {
         alert("All fields are required!");
         event.preventDefault();
         document.getElementById("faultyItems").style.visibility = "hidden";

      //} else if (!isNaN(Number(pilotNameInput.value)) || !isNaN(Number(coPilotNameInput.value)) || typeof Number(fuelLevelInput.value) != "number" || typeof Number(cargoMassInput.value) != "number" ) {
      } else if (!isNaN(Number(pilotNameInput.value)) || !isNaN(Number(coPilotNameInput.value)) || isNaN(Number(fuelLevelInput.value)) || isNaN(Number(cargoMassInput.value))) {

         alert("Make sure to enter valid information for each field!");
         event.preventDefault();
         document.getElementById("faultyItems").style.visibility = "hidden";

      } else {
         fieldCheck = true;
      }


      if (Number(fuelLevelInput.value) < 10000 && fieldCheck) {
         document.getElementById("faultyItems").style.visibility = "visible";
         document.getElementById("fuelStatus").innerText = `Fuel Level too Low for Launch!! Min required is 10000L, currrent level at ${fuelLevelInput.value}L.`
         document.getElementById('launchStatus').innerText = 'Shuttle not ready for launch!';
         document.getElementById('launchStatus').style.color= "red";
         event.preventDefault();
      } else {
         fuelReady = true;
      }


      if (Number(cargoMassInput.value) > 10000 && fieldCheck) {
         document.getElementById("faultyItems").style.visibility = "visible";
         document.getElementById("cargoStatus").innerText = `Cargo mass is too high for launch!! Max allowed is 10000kg, current load is ${cargoMassInput.value}kg.`
         document.getElementById('launchStatus').innerText = 'Shuttle Not Ready for Launch!';
         document.getElementById('launchStatus').style.color= "red";
         event.preventDefault();
      } else {
         cargoReady = true;
      }


      if (fuelReady && cargoReady && fieldCheck) {
         document.getElementById("faultyItems").style.visibility = "visible";
         document.getElementById('launchStatus').innerText = 'Shuttle is Ready for Launch!';
         document.getElementById('launchStatus').style.color= "green";
         event.preventDefault() 
      }

   });

});