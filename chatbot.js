// ===== CHATBOT INJECTION & LOGIC =====
document.addEventListener("DOMContentLoaded", function () {
    // Inject Chatbot HTML dynamically on every page
    const chatbotHTML = `
        <div class="chatbot-btn" id="chatbot-btn" title="Chat with us!">💬</div>
        <div class="chatbot-window" id="chatbot-window">
            <div class="chatbot-header">
                <span>EventZone Assistant</span>
                <span class="chatbot-close" id="chatbot-close" title="Close chat">&times;</span>
            </div>
            <div class="chatbot-body" id="chatbot-body">
                <div class="chat-msg bot">Hi there! 👋 I'm your EventZone Assistant. How can I help you today?</div>
            </div>
            <form class="chatbot-input" id="chatbot-form">
                <input type="text" id="chatbot-input-field" placeholder="Type a message..." required autocomplete="off">
                <button type="submit">✈️</button>
            </form>
        </div>
    `;
    
    document.body.insertAdjacentHTML("beforeend", chatbotHTML);

    const chatBtn = document.getElementById("chatbot-btn");
    const chatWindow = document.getElementById("chatbot-window");
    const chatClose = document.getElementById("chatbot-close");
    const chatForm = document.getElementById("chatbot-form");
    const chatInput = document.getElementById("chatbot-input-field");
    const chatBody = document.getElementById("chatbot-body");

    // Toggle Chat Window
    chatBtn.addEventListener("click", () => {
        chatWindow.classList.toggle("active");
        if(chatWindow.classList.contains("active")) {
            setTimeout(() => {
                chatInput.focus();
            }, 300); // small delay to wait for animation
        }
    });

    chatClose.addEventListener("click", () => {
        chatWindow.classList.remove("active");
    });

    // Auto-scroll to bottom Function
    const scrollToBottom = () => {
        chatBody.scrollTop = chatBody.scrollHeight;
    };

    // Add Message to Chat
    const appendMessage = (text, sender) => {
        const msgDiv = document.createElement("div");
        msgDiv.className = `chat-msg ${sender}`;
        msgDiv.innerText = text;
        chatBody.appendChild(msgDiv);
        scrollToBottom();
    };

    // Bot Response Logic
    const getBotResponse = (userText) => {
        const text = userText.toLowerCase().trim();

        if (text.includes("hi") || text.includes("hello") || text.includes("hey")) {
            return "Hello! How can I assist you with events today?";
        }

        if (text.includes("event") || text.includes("concert") || text.includes("comedy")) {
            // Find events from DB if eventDB exists in scope
            if (typeof eventDB !== 'undefined') {
                let eventNames = [];
                for (let key in eventDB) {
                    eventNames.push('"' + eventDB[key].title + '"');
                }
                return "We have exciting events going on! Like " + eventNames.slice(0, 3).join(", ") + " and more! You can learn more on our Events page.";
            } else {
                return "We have many exciting events! Check out our Events page for more details.";
            }
        }

        if (text.includes("book") || text.includes("ticket") || text.includes("buy")) {
            return "You can easily book tickets by going to the Events page, selecting an event, and clicking 'Book Tickets'. Remember to log in first!";
        }

        if (text.includes("pricing") || text.includes("cost") || text.includes("price") || text.includes("how much")) {
            return "Our event tickets range from ₹150 to ₹999 depending on the event. Check the specific event details for exact pricing.";
        }

        if (text.includes("contact") || text.includes("support")) {
            return "You can reach out to us via the Contact page or email us directly at support@eventzone.com.";
        }
        
        if (text.includes("login") || text.includes("sign")) {
            return "Click 'Login' on the top right navigation bar to log into your account, or to sign up if you don't have one.";
        }

        return "I'm sorry, I didn't quite catch that. Could you ask about our events, bookings, pricing, or contact support?";
    };

    // Form Submission
    chatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const msg = chatInput.value;
        if (!msg.trim()) return;

        // User message
        appendMessage(msg, "user");
        chatInput.value = "";

        // Bot response after short delay
        setTimeout(() => {
            const botMsg = getBotResponse(msg);
            appendMessage(botMsg, "bot");
        }, 600);
    });
});
