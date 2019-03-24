// after the page loads
window.addEventListener('load', () => {

    //longitude and latitude
    let long;
    let lat;

    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    let temperatureSpan = document.querySelector(".temperature span");

    //if geolocation is enabled
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            //the proxy is because darksky doesn't allow cors from localhost
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/d42286d4ec65d7c314a225071fcbf439/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const currently = data.currently;
                    const temperature = currently.temperature;
                    const summary = currently.summary;
                    const icon = currently.icon;

                    //set DOM elements
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                    //calculation for celsius
                    let celsius = (temperature - 32) * (5 / 9);

                    //set icon
                    setIcons(icon, document.querySelector(".icon"));

                    //change temperature to celsius/fahrenheit
                    temperatureSection.addEventListener("click", () => {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    });
                });
        });

    } else {
        //say that geolocation is off and cannot do stuff
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({
            color: "white"
        });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

});