document.addEventListener('DOMContentLoaded', () => {
    // App State and DOM Elements
    const chatMessages = document.getElementById('chat-messages');
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const actionButtons = document.querySelectorAll('.action-btn, .link-btn');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    // Safe event listener attachments
    if (mobileMenuBtn && sidebar && overlay) {
        // Mobile menu toggle
        mobileMenuBtn.addEventListener('click', () => {
            sidebar.classList.remove('-translate-x-full');
            overlay.classList.remove('hidden');
        });

        overlay.addEventListener('click', () => {
            sidebar.classList.add('-translate-x-full');
            overlay.classList.add('hidden');
        });
    }

    // Auto-scroll to bottom
    function scrollToBottom() {
        if (chatMessages) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    // Add user message to UI
    function addUserMessage(text) {
        if (!chatMessages) return;
        const msgDiv = document.createElement('div');
        msgDiv.className = 'flex items-start gap-3 flex-row-reverse mb-6';
        msgDiv.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600 flex-shrink-0" aria-hidden="true">U</div>
            <div class="bg-indigo-600 text-white p-4 rounded-2xl rounded-tr-none shadow-sm max-w-[85%] md:max-w-md">
                <p>${escapeHTML(text)}</p>
            </div>
        `;
        chatMessages.appendChild(msgDiv);
        scrollToBottom();
    }

    // Add typing indicator
    function showTypingIndicator() {
        if (!chatMessages) return null;
        const msgDiv = document.createElement('div');
        msgDiv.className = 'flex items-start gap-3 mb-6 typing-msg';
        msgDiv.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-lg flex-shrink-0" aria-hidden="true">🤖</div>
            <div class="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 text-gray-800 flex items-center gap-1">
                <div class="typing-dot w-2 h-2 bg-gray-400 rounded-full"></div>
                <div class="typing-dot w-2 h-2 bg-gray-400 rounded-full"></div>
                <div class="typing-dot w-2 h-2 bg-gray-400 rounded-full"></div>
            </div>
        `;
        chatMessages.appendChild(msgDiv);
        scrollToBottom();
        return msgDiv;
    }

    // Add bot message to UI
    function addBotMessage(htmlContent) {
        if (!chatMessages) return;
        const typingMsg = document.querySelector('.typing-msg');
        if (typingMsg) typingMsg.remove();

        const msgDiv = document.createElement('div');
        msgDiv.className = 'flex items-start gap-3 mb-6 bot-msg';
        
        // Parse markdown formatting to basic HTML (bold, lists)
        let formattedContent = htmlContent;
        if (!htmlContent.includes('<p>') && !htmlContent.includes('<h4>')) {
             // Basic Markdown to HTML conversion for Gemini's raw output
             formattedContent = htmlContent
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/\n\*/g, '<br>•')
                .replace(/\n/g, '<br>');
             formattedContent = `<p class="text-sm md:text-base">${formattedContent}</p>`;
        }

        msgDiv.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-lg flex-shrink-0" aria-hidden="true">🤖</div>
            <div class="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 text-gray-800 max-w-[85%] md:max-w-2xl overflow-hidden text-sm md:text-base">
                ${formattedContent}
            </div>
        `;
        chatMessages.appendChild(msgDiv);
        scrollToBottom();
    }

    // Simple HTML escaper
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }

    // Handle message submission
    async function handleQuery(query) {
        if (!query.trim()) return;
        
        // Add User Message
        addUserMessage(query);
        
        if (sidebar && overlay && window.innerWidth <= 768) {
            sidebar.classList.add('-translate-x-full');
            overlay.classList.add('hidden');
        }

        // Show loading
        showTypingIndicator();

        try {
            const res = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query })
            });
            
            if (!res.ok) throw new Error('Network error or server error');
            
            const data = await res.json();
            addBotMessage(data.response);
        } catch (err) {
            console.warn('Backend unreachable or running locally without server. Using local AI fallback.', err);
            
            if (typeof window.generateResponse === 'function') {
                // Simulate realistic network delay for the bot feel
                setTimeout(() => {
                    const fallbackResponse = window.generateResponse(query);
                    addBotMessage(fallbackResponse);
                }, 600);
            } else {
                addBotMessage('<p class="text-red-600">Sorry, I encountered an error connecting to the server and local fallback failed. Please check your internet connection and try again.</p>');
            }
        }
    }

    // Form Submit Event
    if (chatForm && userInput) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = userInput.value;
            userInput.value = '';
            handleQuery(query);
        });
    }

    // Quick Action Button Events
    if (actionButtons) {
        actionButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const query = btn.getAttribute('data-query');
                handleQuery(query);
            });
        });
    }
});
