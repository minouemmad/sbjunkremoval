let contactForm = document.querySelector(".contact-form");
let name = document.getElementById("name");
let email = document.getElementById("email");
let zip = document.getElementById("zip");
let message = document.getElementById("message");
let send = document.getElementById("send-btn");

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let formData = {
        name: name.value,
        email: email.value,
        zip: zip.value,
        message: message.value
    };
    send.value = "Sending Message...";
    console.log('Form Data:', formData);
    
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/"); // Ensure this points to your hosted domain if needed
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
        console.log('Server Response:', xhr.responseText);
        if (xhr.responseText === "success") {
            name.value = "";
            email.value = "";
            zip.value = "";
            message.value = "";
            send.value = "Message Sent Successfully!";
        } else {
            send.value = "Something Went Wrong!";
        }
    };
    xhr.onerror = () => {
        console.error('Request Error:', xhr.statusText);
        send.value = "Something Went Wrong!";
    };
    xhr.send(JSON.stringify(formData));
});
