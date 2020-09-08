$(document).ready(function () {
    //Get Current Location
    var getIP = 'https://ip-api.com/json/';

    $.getJSON(getIP).done(function (location) {
        console.log(location);
        var latitude = location.lat;
        var longitude = location.lon;
        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&appid=7a88df754fa4869b2e32df8f2905389f'
        }).done(function (weatherResponse) {
            console.log(weatherResponse);
            var farhenheit = weatherResponse.current.temp;
            var iconcode = weatherResponse.current.weather[0].icon;
            var iconUrl = "http://openweathermap.org/img/wn/" + iconcode + "@2x.png";
            var iconDailycode = weatherResponse.daily[0].weather[0].icon;
            var iconDailyUrl = "http://openweathermap.org/img/wn/" + iconDailycode + "@2x.png";
            function formatAMPM(date) {
                var hours = date.getHours();
                var minutes = date.getMinutes();
                var ampm = hours >= 12 ? 'pm' : 'am';
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? '0'+minutes : minutes;
                var strTime = hours + ':' + minutes + ' ' + ampm;
                return strTime;
            }

            function celcius(farhenheit){
                farhenheit1 = parseInt(farhenheit);
                temps = (farhenheit1 - 273);

                return temps;
            }

            $('#weatherPosts').append(
                `<div class="current-weather-coords well px-5 py-3 col-7">
                    <div class="mt-3">
                        <h6 class="d-inline">${location.city}, </h6>
                        <h6 class="d-inline">${location.country} Weather</h6>
                    </div>
                    <p>as of <span class="font-weight-bold"> ${formatAMPM(new Date)}</span></p>
                    <div class="row p-0 m-0">
                        <div class="col-6 p-0">
                            <h1 class="font-weight-bold d-inline">${celcius(farhenheit)}<sup>&#176;</sup></h1>
                            <p class="text-capitalize font-weight-bold">${weatherResponse.current.weather[0].description}</p>
                        </div>
                        <div class="d-inline">
                            <img class="img-custom" src="${iconUrl}" alt="current_weather_icon">
                        </div>
                    </div>
                </div>
                <div class="col-4 aside px-5">
                    <h6 class="font-weight-bold mt-4 mb-2">Other atmospheric conditions</h6>
                    <p class="mb-1"><span class="font-weight-bold">Pressure:</span> ${weatherResponse.current.pressure}pa</p>
                    <p class="mb-1"><span class="font-weight-bold">Wind speed:</span> ${weatherResponse.current.wind_speed}Km/h</p>
                    <p class="mb-1"><span class="font-weight-bold">Humidity:</span> ${weatherResponse.current.humidity} %</p>
                    <p class="mb-1"><span class="font-weight-bold">Visibility:</span> ${weatherResponse.current.visibility}mtrs</p>
                </div>
            `)
        
        $('#today-forecast').append(
            `<h5 class="font-weight-bold px-4 my-3">Average Daily Temperature for ${location.city}, ${location.country}</h5>
            <div class="row daily-forecast text-center">
                <div class="col">
                    <h6 class="font-weight-bold mb-3">Day</h6>
                    <h1>${parseInt(weatherResponse.daily[0].feels_like.day) - 273}<sup>&#176;</sup>C </h1>
                </div>
                <div class="col">
                    <h6 class="font-weight-bold mb-3">Night</h6>
                    <h1>${parseInt(weatherResponse.daily[0].feels_like.night) - 273}<sup>&#176;</sup>C </h1>
                </div>
                <div class="col">
                    <h6 class="font-weight-bold mb-3">Morning</h6>
                    <h1>${parseInt(weatherResponse.daily[0].feels_like.eve) - 273}<sup>&#176;</sup>C </h1>
                </div>
                <div class="col">
                    <h6 class="font-weight-bold mb-3">Evening</h6>
                    <h1>${parseInt(weatherResponse.daily[0].feels_like.morn) - 273}<sup>&#176;</sup>C </h1>
                </div>
            </div>
            <div class="col-6 ml-4">
                <img class="" src="${iconUrl}" alt="current_weather_icon">
                <p class="mb-1"><span class="font-weight-bold">Main:</span> ${weatherResponse.daily[0].weather[0].main}</p>
                <p><span class="font-weight-bold">Description:</span> ${weatherResponse.daily[0].weather[0].description}</p>
            </div>`
        )
        });
    });

    $('#submit').click(function () {
        var city = $('#search_city').val();
        
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=7a88df754fa4869b2e32df8f2905389f"
        }).done(function (responseCity){
            console.log(responseCity);
            

        });
    });  
});