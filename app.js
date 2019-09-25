window.addEventListener("load", () => {

    const apiKey = ""; //secret
    let api = "";

    let temperatureWrapper = document.querySelector(".temperature")
    let temperatureDegree = document.querySelector(".temperature-degree");
    let degreeSection = document.querySelector(".degree-section");
    let temperatureSpan = document.querySelector(".temperature span")
    let locationTimezone = document.querySelector(".location-timezone");
    let weatherDescription = document.querySelector(".temperature-description");

    let coordsLatitude = 0;
    let coordsLongitude = 0;
    let cityName = "";
    let temperatureValue = 0;
    let humidityValue = 0;

    


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {

            coordsLatitude = position.coords.latitude;
            coordsLongitude = position.coords.longitude;

            api = `https://api.openweathermap.org/data/2.5/weather?lat=${coordsLatitude}&lon=${coordsLongitude}&units=metric&appid=${apiKey}`;

            fetch(api).then(response => {
                return response.json();

            }).then(data => {
                console.log(data);

                const {
                    temp,
                    humidity,
                    pressure
                } = data.main;
                const {
                    description
                } = data.weather[0];
                const name = data.name;

                cityName = name;
                temperatureValue = temp;
                humidityValue = humidity;

                temperatureDegree.textContent = temperatureValue;
                locationTimezone.textContent = cityName;
                weatherDescription.textContent = description;

            })

        }, function (e) {
            showAlert(document.body, "Geolocation permission is denied");
        });
    } else {
        showAlert(document.body, "Geolocation is not supported by this browser");
    }

    function showAlert(element, message) {
        var alert = document.createElement('div');
        alert.className = "alert";
        alert.innerText = message;
        element.appendChild(alert);
    }
});