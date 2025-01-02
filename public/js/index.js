console.log("Client side JS loaded!!");



const form = document.querySelector("form");
const search = document.querySelector("input")

const msg1 = document.getElementById("message-1");
const msg2 = document.getElementById("message-2");

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    console.log(search.value);
    msg1.innerHTML = "Loading"
    msg2.innerHTML = '';
    fetch(`http://localhost:3000/weather?location=${search.value}`).then((response) => {
        response.json().then((data) => {
            msg1.innerHTML = '';
            if(data.error) msg2.innerHTML = (data.error);
            else {
                // console.log("data"+JSON.stringify(data));
                msg2.innerHTML = `Location : ${data.Location}<br>Forecast : ${data.Forecast}`;
            }
        })
    })
})