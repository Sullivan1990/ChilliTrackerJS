// use the token to send a request to the Container List
localforage.getItem('Token').then(token => {
    fetch('https://chillitrackerapi.azurewebsites.net/api/plant/getall', {
        headers: new Headers({
            'Authorization': 'bearer ' + token
        }), 
    }).then(data => data.json()).then(c => RenderTable(c))
})

function RenderTable(plantList){
    console.log('the plantList @ RenderTable' + plantList)
    const table = document.getElementById("plantTableBody");
    plantList.forEach( function(plant){

        console.log(plant)

        let row = table.insertRow();

        let id = row.insertCell(0);
        id.innerHTML = plant.plantID;
        
        let plantedData = row.insertCell(1);
        plantedData.innerHTML = plant.planted

        let soilMix = row.insertCell(2);
        soilMix.innerHTML = plant.initialSoilMix

        let germNotes = row.insertCell(3);
        germNotes.innerHTML = plant.germinationNotes
    })

}


