if(document.readyState =='loading'){
    document.addEventListener('DOMContentLoaded',ready);
}
else{
    ready();
}

function ready(){
let btn=document.getElementsByClassName('getbtn')[0];

btn.addEventListener('click',fetchdata);
}


function fetchdata(event){
    let input_loc=document.getElementsByTagName('input')[0].value;
    console.log(input_loc);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${input_loc}&APPID=66aec471ccd8d0cd8b17afc9e9c01be2`)
        .then(response=>response.json())
        .then((data)=>{
            console.log(data);
            let currtemp = Math.round((data.main.temp-272.15)*100)/100;
            let temp_min=Math.round((data.main.temp_min-272.15)*100)/100;
            let temp_max=Math.round((data.main.temp_max-272.15)*100)/100;
            let location = data.name;
            let pressure= data.main.pressure;
            let humidity=data.main.humidity;
            let iconid=data.weather[0].icon;
            let description=data.weather[0].description;
            let windspeed=data.wind.speed;
            console.log( currtemp,location,pressure,humidity,iconid );

            let Section=document.getElementsByTagName('section')[0];

            Section.innerHTML=`<div class='container'>
            <div class="block1">
                ${location}
                <div class="currtemp">
                     ${currtemp}&#8451;
                </div>
            </div>
            <div class="midsection">
                <div class="description">
                   ${description}
                </div>
                <img class="tempicon" src="http://openweathermap.org/img/wn/${iconid}@2x.png">

            </div>
            <div class="otherinfo">
                    <span class="min_temp">Min Temprature : ${temp_min}&#8451;</span>
                    <span> Max Temprature : ${temp_max}&#8451;</span> 
                    <br>
                    Pressure : ${pressure}hPa
                    <br>
                    Humidity : ${humidity}%
                    <br>
                    Windspeed : ${windspeed}m/s
                
                
            </div>
        </div>    `;

        change_header();
        

        })
        .catch((err)=>{
            Error_occured();
        })

    
}   

function Error_occured(){
    let errblock=document.createElement('div');
    errblock.classList.add('errblock');
    errblock.innerHTML=`<h2>Error! Enter valid location<\h2>`;
    let section=document.getElementsByTagName('section')[0];
    section.insertBefore(errblock,section.childNodes[0] || null);
}

function change_header(){
    let headerblock=document.getElementsByTagName('header')[0];
    headerblock.innerHTML=`<input type="image" src="backicon.png" class="backicon" onClick="document.location.reload(true)">`+headerblock.innerHTML;
}