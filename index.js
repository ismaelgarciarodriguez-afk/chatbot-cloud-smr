const chatContainer = document.getElementById("chat-container");

function addMessage(text, className) {
    const message = document.createElement("div");
    message.className = className;
    message.innerText = text;
    chatContainer.appendChild(message);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function sendMessage() {
    const input = document.getElementById("user-input");
    const userText = input.value;

    if (userText === "") return;

    addMessage(userText, "user-message");
    input.value = "";

    callAPI(userText);
}

function callAPI(message) {
    fetch("https://chatgpt-api8.p.rapidapi.com/", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "X-RapidAPI-Key": "TU_API_KEY_AQUI",
            "X-RapidAPI-Host": "chatgpt-api8.p.rapidapi.com"
        },
        body: JSON.stringify([
            {
                role: "user",
                content: message
            }
        ])
    })
    .then(response => response.json())
    .then(data => {
        addMessage(data.text, "bot-message");
    })
    .catch(error => {
        addMessage(
            "⚠️ Error al conectar con el servicio. Inténtalo más tarde.",
            "bot-message"
        );
    });
}
