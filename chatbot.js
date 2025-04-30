// Ahaar - AI-Powered Nutrition & Meal Planning Assistant
// Chatbot functionality

document.addEventListener('DOMContentLoaded', function() {
    const chatbotButton = document.getElementById('chatbotButton');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSendButton = document.getElementById('chatbotSendButton');
    
    let isChatbotOpen = false;
    
    // Initial welcome message
    const welcomeMessages = [
        "Hi there! I'm Ahaar's AI nutritionist. How can I help you today?",
        "I can suggest recipes, create meal plans, or answer nutrition questions specific to Indian cuisine!"
    ];
    
    // Toggle chatbot window
    if (chatbotButton) {
        chatbotButton.addEventListener('click', function() {
            if (isChatbotOpen) {
                chatbotWindow.style.display = 'none';
            } else {
                chatbotWindow.style.display = 'flex';
                
                // Add welcome message if it's the first time opening
                if (chatbotMessages.children.length === 0) {
                    setTimeout(() => {
                        addBotMessage(welcomeMessages[0]);
                        
                        setTimeout(() => {
                            addBotMessage(welcomeMessages[1]);
                        }, 1000);
                    }, 500);
                }
            }
            
            isChatbotOpen = !isChatbotOpen;
        });
    }
    
    // Send message on button click
    if (chatbotSendButton) {
        chatbotSendButton.addEventListener('click', function() {
            sendMessage();
        });
    }
    
    // Send message on Enter key
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Function to send message
    function sendMessage() {
        const message = chatbotInput.value.trim();
        
        if (message.length === 0) return;
        
        // Add user message to chat
        addUserMessage(message);
        
        // Clear input
        chatbotInput.value = '';
        
        // Show typing indicator
        addTypingIndicator();
        
        // Send message to server
        fetch('/api/chatbot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        })
        .then(response => response.json())
        .then(data => {
            // Remove typing indicator
            removeTypingIndicator();
            
            // Add bot response to chat
            addBotMessage(data.response);
        })
        .catch(error => {
            // Remove typing indicator
            removeTypingIndicator();
            
            // Add error message
            addBotMessage("I'm having trouble connecting right now. Please try again later.");
            console.error('Error:', error);
        });
    }
    
    // Function to add user message to chat
    function addUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'user-message');
        messageElement.textContent = message;
        chatbotMessages.appendChild(messageElement);
        scrollToBottom();
    }
    
    // Function to add bot message to chat
    function addBotMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'bot-message');
        messageElement.textContent = message;
        chatbotMessages.appendChild(messageElement);
        scrollToBottom();
    }
    
    // Function to add typing indicator
    function addTypingIndicator() {
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('message', 'bot-message', 'typing-indicator');
        typingIndicator.innerHTML = '<span></span><span></span><span></span>';
        typingIndicator.id = 'typingIndicator';
        chatbotMessages.appendChild(typingIndicator);
        scrollToBottom();
    }
    
    // Function to remove typing indicator
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    // Function to scroll to bottom of chat
    function scrollToBottom() {
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Suggested questions
    const suggestedQuestions = [
        "What are some high-protein vegetarian Indian dishes?",
        "Can you suggest a meal plan for weight loss?",
        "What's a good breakfast for diabetics?",
        "What nutrition is important during pregnancy?"
    ];
    
    // Add suggested questions to the bot after initial welcome
    setTimeout(() => {
        if (chatbotMessages) {
            const suggestionsElement = document.createElement('div');
            suggestionsElement.classList.add('suggested-questions');
            
            let html = '<div class="message bot-message">Here are some questions you might want to ask:</div>';
            
            suggestedQuestions.forEach(question => {
                html += `<button class="suggested-question">${question}</button>`;
            });
            
            suggestionsElement.innerHTML = html;
            chatbotMessages.appendChild(suggestionsElement);
            
            // Add click event to suggested questions
            const questionButtons = document.querySelectorAll('.suggested-question');
            questionButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const question = this.textContent;
                    chatbotInput.value = question;
                    sendMessage();
                });
            });
            
            scrollToBottom();
        }
    }, 2500);
});
