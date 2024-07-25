document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('message-input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

async function sendMessage() {
  const input = document.getElementById('message-input');
  const message = input.value.trim();
  if (!message) return;

  appendMessage('user-message', message);
  input.value = '';

  try {
    const response = await fetch('/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    
    // Log the full response for debugging
    console.log('API Response:', result);

    // Extract the bot response from the result property
    if (result && result.result) {
      const botResponse = result.result;
      const botIdentity = result.botIdentity || 'Asad Bot';
      appendMessage('bot-response', `${botIdentity}: ${botResponse}`);
    } else {
      throw new Error('Unexpected response structure');
    }
  } catch (error) {
    console.error('Error:', error);
    appendMessage('bot-response', 'Sorry, something went wrong.');
  }
}

function appendMessage(className, message) {
  const chatWindow = document.getElementById('chat-window');
  const messageElement = document.createElement('div');
  messageElement.className = `message ${className}`;
  messageElement.textContent = message;
  chatWindow.appendChild(messageElement);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}
