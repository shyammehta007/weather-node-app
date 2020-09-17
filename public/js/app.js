console.log("client side javascript");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message1 = document.querySelector(" #message1");
const message2 = document.querySelector(" #message2");

weatherForm.addEventListener("submit", (e) => {
  message1.textContent = "loading.....";
  e.preventDefault();
  const location = search.value;
  if (!location) {
    console.log("need location");
    return;
  }
  fetch(`/weather?address=${location}`).then((res) => {
    res.json().then((res) => {
      if (res.error) {
        message1.innerHTML = res.error;
        return;
      } else {
        message1.textContent = res.response.location.name;
        message2.textContent = `temerature = ${res.response.current.temperature}`;
      }
    });
  });
});
