window.addEventListener("load", () => {

    const apiKey = ""; //secret
    const updateInterval = 900000; // 15 min
    let api = "";

    let temperatureWrapper = document.querySelector(".temperature")
    let temperatureDegree = document.querySelector(".temperature-degree");
    let degreeSection = document.querySelector(".degree-section");
    let temperatureSpan = document.querySelector(".temperature span")
    let locationTimezone = document.querySelector(".location-timezone");
    let weatherDescription = document.querySelector(".temperature-description");
    let iconSpan = document.querySelector(".icon");
    let footer = document.querySelector("#footer");

    let coordsLatitude = 0;
    let coordsLongitude = 0;
    let cityName = "";
    let temperatureValue = 0;
    let humidityValue = 0;


    //Flip section event functionality
    degreeSection.addEventListener("click", () => {

        temperatureWrapper.classList.toggle("flipped");

        if (temperatureSpan.textContent === "C") {
            temperatureDegree.textContent = humidityValue;
            temperatureSpan.textContent = "%";
        } else {
            temperatureDegree.textContent = temperatureValue;
            temperatureSpan.textContent = "C";
        }

    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {

            coordsLatitude = position.coords.latitude;
            coordsLongitude = position.coords.longitude;

            api = `https://api.openweathermap.org/data/2.5/weather?lat=${coordsLatitude}&lon=${coordsLongitude}&units=metric&lang=PL&appid=${apiKey}`;

            consumeApi(api);

            setInterval(r => {
                consumeApi(api);
            },updateInterval);

        }, function (e) {
            showAlert(document.body, "Geolocation permission is denied");
        });
    } else {
        showAlert(document.body, "Geolocation is not supported by this browser");
    }

    function consumeApi(api){

        fetch(api).then(response => {
            return response.json();
        }).then(data => {
            console.log(data);

            const { temp, humidity, pressure } = data.main;
            const {
                description, icon
            } = data.weather[0];
            const name = data.name;

            cityName = name;
            temperatureValue = temp;
            humidityValue = humidity;

            temperatureDegree.textContent = temperatureValue;
            locationTimezone.textContent = cityName;
            weatherDescription.textContent = description;

            iconSpan.innerHTML = ` <span><img src="http://openweathermap.org/img/w/${icon}.png" alt="Alternate Text" /></span>`;
            footer.innerText = `Last update: ${new Date().toLocaleString("pl-PL")}`;
        });

    }

    function showAlert(element, message) {
        var alert = document.createElement('div');
        alert.className = "alert";
        alert.innerText = message;
        element.appendChild(alert);
    }
});

