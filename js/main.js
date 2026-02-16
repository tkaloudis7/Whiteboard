document.addEventListener("DOMContentLoaded", () => {

  const tempElement = document.querySelector("#temp-display");


  if (!tempElement) return;


  fetch("https://api.open-meteo.com/v1/forecast?latitude=37.98&longitude=23.72&current_weather=true")
    .then(response => response.json())
    .then(data => {
      const temp = data.current_weather.temperature;


      tempElement.innerText = `${temp} °C`;
    })
    .catch(error => {
      console.error("Error:", error);
      tempElement.innerText = "N/A";
    });
});
