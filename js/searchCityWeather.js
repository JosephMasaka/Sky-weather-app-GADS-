$(document).ready(function () {
    $('#submit').click(function () {
        var city = $('#search_city').val();
        
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=7a88df754fa4869b2e32df8f2905389f"
        }).done(function (responseCity){
            console.log(responseCity);

            var farhenheit = responseCity.main.temp;
            var iconcode = responseCity.weather[0].icon;
            var iconUrl = "http://openweathermap.org/img/wn/" + iconcode + "@2x.png";

            function formatAMPM(date) {
                var hours = date.getHours();
                var minutes = date.getMinutes();
                var ampm = hours >= 12 ? 'pm' : 'am';
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? '0'+minutes : minutes;
                var strTime = hours + ':' + minutes + ' ' + ampm;
                return strTime;
            };

            function celcius(farhenheit){
                farhenheit1 = parseInt(farhenheit);
                temps = (farhenheit1 - 273);

                return temps;
            };
            
            $('#weatherPosts').html(
                `<div class="current-weather-coords well px-5 py-3 col-7">
                    <div class="mt-3">
                        <h6 class="d-inline">${responseCity.name}, </h6>
                        <h6 class="d-inline">${responseCity.sys.country} Weather</h6>
                    </div>
                    <p>as of <span class="font-weight-bold"> ${formatAMPM(new Date)}</span></p>
                    <div class="row p-0 m-0">
                        <div class="col-6 p-0">
                            <h1 class="font-weight-bold d-inline">${celcius(farhenheit)}<sup>&#176;</sup></h1>
                            <p class="text-capitalize font-weight-bold">${responseCity.weather[0].description}</p>
                        </div>
                        <div class="d-inline">
                            <img class="img-custom" src="${iconUrl}" alt="current_weather_icon">
                        </div>
                    </div>
                </div>
                <div class="col-4 aside px-5">
                    <h6 class="font-weight-bold mt-4 mb-2">Other atmospheric conditions</h6>
                    <p class="mb-1"><span class="font-weight-bold">Pressure:</span> ${responseCity.main.pressure}pa</p>
                    <p class="mb-1"><span class="font-weight-bold">Wind speed:</span> ${responseCity.wind.speed}Km/h</p>
                    <p class="mb-1"><span class="font-weight-bold">Humidity:</span> ${responseCity.main.humidity} %</p>
                    <p class="mb-1"><span class="font-weight-bold">Visibility:</span> ${responseCity.visibility}mtrs</p>
                </div>
            `)

            $('#today-forecast').html(
                `<h5 class="font-weight-bold px-4 my-3">Average Daily Temperature for ${responseCity.name}, ${responseCity.sys.country}</h5>
                <div class="row daily-forecast text-center">
                    <div class="col">
                        <h6 class="font-weight-bold mb-3">Current Temp</h6>
                        <h1>${parseInt(responseCity.main.temp) - 273}<sup>&#176;</sup>C </h1>
                    </div>
                    <div class="col">
                        <h6 class="font-weight-bold mb-3">Max Temp</h6>
                        <h1>${parseInt(responseCity.main.temp_max) - 273}<sup>&#176;</sup>C </h1>
                    </div>
                    <div class="col">
                        <h6 class="font-weight-bold mb-3">Min Temp</h6>
                        <h1>${parseInt(responseCity.main.temp_min) - 273}<sup>&#176;</sup>C </h1>
                    </div>
                    <div class="col">
                        <h6 class="font-weight-bold mb-3">Average Temp</h6>
                        <h1>${parseInt(responseCity.main.feels_like) - 273}<sup>&#176;</sup>C </h1>
                    </div>
                </div>
                <div class="col-6 ml-4">
                    <img class="" src="${iconUrl}" alt="current_weather_icon">
                    <p class="mb-1"><span class="font-weight-bold">Main:</span> ${responseCity.weather[0].main}</p>
                    <p><span class="font-weight-bold">Description:</span> ${responseCity.weather[0].description}</p>
                </div>`
            )
        });
    });  
});