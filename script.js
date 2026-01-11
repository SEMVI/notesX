// Claude Code Mobile UX - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const menuBtn = document.getElementById('menuBtn');
    const closeSidebar = document.getElementById('closeSidebar');
    const sidebar = document.getElementById('sidebar');
    const newChatBtn = document.getElementById('newChatBtn');
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const messages = document.getElementById('messages');
    const attachBtn = document.getElementById('attachBtn');

    // Create overlay for sidebar
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    // Sidebar toggle
    function openSidebar() {
        sidebar.classList.add('open');
        overlay.classList.add('visible');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebarFunc() {
        sidebar.classList.remove('open');
        overlay.classList.remove('visible');
        document.body.style.overflow = '';
    }

    menuBtn.addEventListener('click', openSidebar);
    closeSidebar.addEventListener('click', closeSidebarFunc);
    overlay.addEventListener('click', closeSidebarFunc);

    // Auto-resize textarea
    messageInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 120) + 'px';

        // Enable/disable send button
        sendBtn.disabled = this.value.trim() === '';
    });

    // Send message
    function sendMessage() {
        const text = messageInput.value.trim();
        if (!text) return;

        // Add user message
        addMessage(text, 'user');

        // Clear input
        messageInput.value = '';
        messageInput.style.height = 'auto';
        sendBtn.disabled = true;

        // Show typing indicator
        const typingId = showTypingIndicator();

        // Simulate assistant response
        setTimeout(() => {
            hideTypingIndicator(typingId);
            addMessage(getAssistantResponse(text), 'assistant');
        }, 1500 + Math.random() * 1000);
    }

    sendBtn.addEventListener('click', sendMessage);

    messageInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;

        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        const avatarIcon = document.createElement('span');
        avatarIcon.className = 'avatar-icon';
        avatarIcon.textContent = sender === 'user' ? 'U' : 'C';
        avatarDiv.appendChild(avatarIcon);

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';

        const headerDiv = document.createElement('div');
        headerDiv.className = 'message-header';
        const senderSpan = document.createElement('span');
        senderSpan.className = 'message-sender';
        senderSpan.textContent = sender === 'user' ? 'You' : 'Claude';
        headerDiv.appendChild(senderSpan);

        if (sender === 'assistant') {
            const modelSpan = document.createElement('span');
            modelSpan.className = 'message-model';
            modelSpan.textContent = 'Sonnet 4.5';
            headerDiv.appendChild(modelSpan);
        }

        const textDiv = document.createElement('div');
        textDiv.className = 'message-text';

        // Parse and render message content
        textDiv.innerHTML = parseMessageContent(text);

        contentDiv.appendChild(headerDiv);
        contentDiv.appendChild(textDiv);

        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);

        messages.appendChild(messageDiv);
        messages.scrollTop = messages.scrollHeight;

        // Add copy functionality to code blocks
        const copyButtons = messageDiv.querySelectorAll('.code-copy-btn');
        copyButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const codeBlock = this.closest('.code-block');
                const code = codeBlock.querySelector('code').textContent;
                copyToClipboard(code);

                // Visual feedback
                const originalHTML = this.innerHTML;
                this.innerHTML = '<span style="font-size: 12px;">✓</span>';
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                }, 1500);
            });
        });
    }

    // Parse message content (simple markdown-like parsing)
    function parseMessageContent(text) {
        // Convert newlines to paragraphs
        const paragraphs = text.split('\n\n');
        let html = '';

        paragraphs.forEach(para => {
            if (para.trim().startsWith('```')) {
                // Code block
                const codeMatch = para.match(/```(\w*)\n([\s\S]*?)```/);
                if (codeMatch) {
                    const lang = codeMatch[1] || 'text';
                    const code = codeMatch[2];
                    html += `
                        <div class="code-block">
                            <div class="code-header">
                                <span class="code-filename">${lang}</span>
                                <button class="code-copy-btn">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                    </svg>
                                </button>
                            </div>
                            <pre><code>${escapeHtml(code)}</code></pre>
                        </div>
                    `;
                }
            } else if (para.trim().startsWith('- ')) {
                // List
                const items = para.split('\n').filter(line => line.trim().startsWith('- '));
                html += '<ul>';
                items.forEach(item => {
                    html += `<li>${escapeHtml(item.substring(2))}</li>`;
                });
                html += '</ul>';
            } else {
                // Regular paragraph
                html += `<p>${escapeHtml(para)}</p>`;
            }
        });

        return html;
    }

    // Escape HTML
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Typing indicator
    function showTypingIndicator() {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message assistant-message';
        messageDiv.id = 'typing-indicator';

        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        const avatarIcon = document.createElement('span');
        avatarIcon.className = 'avatar-icon';
        avatarIcon.textContent = 'C';
        avatarDiv.appendChild(avatarIcon);

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';

        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';

        contentDiv.appendChild(typingDiv);
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);

        messages.appendChild(messageDiv);
        messages.scrollTop = messages.scrollHeight;

        return 'typing-indicator';
    }

    function hideTypingIndicator(id) {
        const indicator = document.getElementById(id);
        if (indicator) {
            indicator.remove();
        }
    }

    // Get assistant response (simulated)
    function getAssistantResponse(userMessage) {
        const responses = [
            "I'd be happy to help! Let me analyze that for you.\n\nHere's what I found:\n\n- This is a mobile UX demonstration\n- It features Claude Code's distinctive dark theme\n- The interface is fully responsive",

            "Great question! Here's a code example:\n\n```javascript\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet('World'));\n```\n\nThis function demonstrates a simple greeting pattern.",

            "I can help you with that! The key considerations are:\n\n- User experience on mobile devices\n- Touch-optimized controls\n- Responsive layout design\n- Performance optimization\n\nWould you like me to elaborate on any of these points?",

            "Let me create that for you:\n\n```css\n.container {\n  display: flex;\n  flex-direction: column;\n  background: #1a1a1a;\n  color: #e8e8e8;\n}\n```\n\nThis CSS creates a dark-themed container with flexbox layout."
        ];

        return responses[Math.floor(Math.random() * responses.length)];
    }

    // Copy to clipboard
    function copyToClipboard(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text);
        } else {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }
    }

    // New chat
    newChatBtn.addEventListener('click', function() {
        if (confirm('Start a new chat? This will clear the current conversation.')) {
            messages.innerHTML = `
                <div class="message assistant-message">
                    <div class="message-avatar">
                        <span class="avatar-icon">C</span>
                    </div>
                    <div class="message-content">
                        <div class="message-header">
                            <span class="message-sender">Claude</span>
                            <span class="message-model">Sonnet 4.5</span>
                        </div>
                        <div class="message-text">
                            <p>Hi! I'm Claude Code, your AI pair programmer. I can help you write code, debug issues, explain complex concepts, and build applications.</p>
                            <p>What would you like to work on today?</p>
                        </div>
                    </div>
                </div>
            `;
        }
    });

    // Chat list items
    const chatItems = document.querySelectorAll('.chat-item');
    chatItems.forEach(item => {
        item.addEventListener('click', function() {
            chatItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');

            // Close sidebar on mobile
            if (window.innerWidth < 768) {
                closeSidebarFunc();
            }
        });
    });

    // Attach button (placeholder)
    attachBtn.addEventListener('click', function() {
        alert('File attachment feature - Coming soon!');
    });

    // Initialize
    sendBtn.disabled = true;
});
