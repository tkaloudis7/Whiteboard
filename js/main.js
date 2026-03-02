//weather API
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

//dark mode button
const toggleBtn = document.getElementById("darkModeToggle");

//local storage check for previous data
const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") {
  document.documentElement.setAttribute("data-bs-theme", "dark");
  if (toggleBtn) toggleBtn.innerText = "Light Mode";
}


if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    const htmlElement = document.documentElement;

    if (htmlElement.getAttribute("data-bs-theme") === "dark") {
      //change to light mode
      htmlElement.setAttribute("data-bs-theme", "light");
      localStorage.setItem("theme", "light");
      toggleBtn.innerText = "Dark Mode";
    } else {
      //change to dark mode
      htmlElement.setAttribute("data-bs-theme", "dark");
      localStorage.setItem("theme", "dark");
      toggleBtn.innerText = "Light Mode";
    }
  });
}
