
$(function(){
    $("#header").load("src/components/header.html"); 
});

localforage.config({
    driver      : localforage.LOCALSTORAGE, // Force WebSQL; same as using setDriver()
    name        : 'ChillTracker',
    version     : 1.0,
    storeName   : 'keyvaluepairs', // Should be alphanumeric, with underscores.
    description : 'some description'
  });

function Login(){
    // retrieve the values
    let userName = document.getElementById('txtUsername').value;
    let passWord = document.getElementById('txtPassword').value;
    // debugging
    console.log('username: ' + userName + ', password: ' + passWord);

    fetch('https://chillitrackerapi.azurewebsites.net/api/Token/Login', options = {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            username: userName,
            password: passWord
          })
    }).then(response => response.json())
    .then(jsonData => {
        if(!jsonData.success == false)
        {   
            localforage.config();

            var keyExists = true;

            localforage.getItem('Expiry').then(c => {
                if(c === null)
                {
                    console.log('No Key');
                    keyExists = false;
                } else {
                    if(Date.parse(c) < Date.now())
                    {
                        console.log('Token Expired');
                        keyExists = false;
                    }
                }
            }).then(function(){
                if(!keyExists)
                {
                    console.log('writing new data to localstorage')
                    localforage.setItem('Token', jsonData.token);
                    localforage.setItem('RefreshToken', jsonData.refreshToken);
                    localforage.setItem('Expiry', jsonData.expiry);
                } else {
                    console.log('No new data written to local storage')
                }
                LoadPage('menu');
            }).catch(err => console.log(err));
        }
    })
    .catch(error => console.log(error));

}

function LoadPage(pageName){
    $("#main").load('src/pages/' + pageName + '.html'); 
};