// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   let div=document.getElementById("missionTarget");
div.innerHTML=`    
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter:${diameter} </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth:${distance} </li>
                    <li>Number of Moons:${moons} </li>
                </ol>
                <img src="${imageUrl}">`
   
}

function validateInput(testInput) {
    let testInputNumber= Number(testInput)
    if (testInput === ""){
        return "Empty"; 
        }
    else if (isNaN(testInputNumber)){
        return "Not a Number";
    }
   else if(!isNaN(testInputNumber)) {
       return "Is a Number";
   }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let fuel=document.getElementById("fuelStatus")
   let cargo=document.getElementById("cargoStatus")
   let pilotStatus=document.getElementById("pilotStatus")
   let copilotStatus=document.getElementById("copilotStatus")
   let launchStatus=document.getElementById("launchStatus")

   if (validateInput(pilot)==="Empty" || validateInput(copilot)==="Empty" || validateInput(fuelLevel)==="Empty" || validateInput(cargoLevel)==="Empty"){
    alert("all fields are required")
   }  else if (validateInput(pilot)==="Is a Number" || validateInput(copilot)==="Is a Number" || validateInput(fuelLevel)==="Not a Number" || validateInput(cargoLevel)==="Not a Number"){
    alert("please enter valid information for each field") 
   }
   else {
       list.style.visibility="visible"
       pilotStatus.innerHTML=`${pilot} is ready for launch`
       copilotStatus.innerHTML=`${copilot} is ready for launch`
       if (fuelLevel<10000 && cargoLevel<=10000){
        fuel.innerHTML="fuel level is too low for launch"
        cargo.innerHTML="cargo level is low enough for launch"
        launchStatus.innerHTML="shuttle not ready for launch"
        
        launchStatus.style.color="red"

       }
        else if (fuelLevel>=10000 && cargoLevel>10000){
        fuel.innerHTML="fuel level is high enough for launch"
        cargo.innerHTML="cargo level is too heavy for launch"
        launchStatus.innerHTML="shuttle not ready for launch"
        
        launchStatus.style.color="red"
   }    else if (fuelLevel<10000 && cargoLevel>10000){
        fuel.innerHTML="fuel level is too low for launch"
        cargo.innerHTML="cargo level is too heavy for launch"
        launchStatus.innerHTML="shuttle not ready for launch"
    
        launchStatus.style.color="red"
} else {
  
    fuel.innerHTML="fuel level is high enough for launch"
    cargo.innerHTML="cargo level is low enough for launch"
    launchStatus.innerHTML="shuttle ready for launch"
    launchStatus.style.color="green"

}
   

   }



}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
    if (response.status>=400){
        throw new Error (" Something is wrong")
    }    
    else { 
        return response.json();
    }

});

    return planetsReturned;
}

function pickPlanet(planets) {
    let random=Math.floor(Math.random()*planets.length);
    return planets[random]
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
