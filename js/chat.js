document.addEventListener('DOMContentLoaded', function() {
    const chatBox = document.getElementById('chatBox');
    const chatForm = document.getElementById('chatForm');
    const chatMessage = document.getElementById('chatMessage');
    let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];

    // Menampilkan pesan yang ada
    chatHistory.forEach(message => {
        addMessageToChatBox(message);
    });

    // Menangani pengiriman pesan
    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (chatMessage.value.trim() !== "") {
            const message = {
                sender: currentUser.username,
                timestamp: new Date().toLocaleString(),
                text: chatMessage.value
            };
            chatHistory.push(message);
            localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
            addMessageToChatBox(message);
            chatMessage.value = '';
        }
    });

    function addMessageToChatBox(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message';
        if (message.sender === currentUser.username) {
            messageElement.classList.add('right');
        } else {
            messageElement.classList.add('left');
        }
        messageElement.innerHTML = `
            <strong>${message.sender}</strong>
            <p>${message.text}</p>
            <small>${message.timestamp}</small>
        `;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight; // Agar otomatis scroll ke bawah
    }
});
