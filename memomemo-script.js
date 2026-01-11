// MemoMemo Mockup JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);

    // Screen Navigation
    const navButtons = document.querySelectorAll('.mockup-nav button');
    const screens = document.querySelectorAll('.screen');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const screenId = button.getAttribute('data-screen');

            // Update active button
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Show corresponding screen
            screens.forEach(screen => screen.classList.remove('active'));
            document.getElementById(screenId).classList.add('active');
        });
    });

    // Capture Tabs
    const captureTabs = document.querySelectorAll('.capture-tab');
    captureTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            captureTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // Filter Chips
    const filterChips = document.querySelectorAll('.filter-chip');
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            chip.classList.toggle('active');
        });
    });

    // Memory Cards Hover Effect
    const memoryCards = document.querySelectorAll('.memory-card');
    memoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--memo-primary-light)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.borderColor = 'var(--memo-border)';
        });
    });

    // Icon buttons feedback
    const iconBtns = document.querySelectorAll('.icon-btn');
    iconBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });

    // Quick Capture Input Auto-expand
    const captureInput = document.querySelector('.capture-input');
    if (captureInput) {
        captureInput.addEventListener('focus', function() {
            this.parentElement.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.1)';
        });

        captureInput.addEventListener('blur', function() {
            this.parentElement.style.boxShadow = 'none';
        });
    }

    // Simulate save action
    const saveButtons = document.querySelectorAll('.btn-primary');
    saveButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Add success feedback
            const originalText = this.textContent;
            this.textContent = '✓ Saved!';
            this.style.background = 'var(--memo-success)';

            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = 'var(--memo-primary)';
            }, 1500);
        });
    });

    // Search input real-time feedback
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const value = this.value;
            // In a real app, this would trigger search
            console.log('Searching for:', value);
        });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Cmd/Ctrl + Shift + M to focus quick capture
        if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'M') {
            e.preventDefault();
            const captureInput = document.querySelector('.capture-input');
            if (captureInput) {
                captureInput.focus();
            }
        }

        // Cmd/Ctrl + K for search
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            // Switch to search screen
            navButtons.forEach(btn => {
                if (btn.getAttribute('data-screen') === 'search') {
                    btn.click();
                    setTimeout(() => {
                        const searchInput = document.querySelector('.search-input');
                        if (searchInput) searchInput.focus();
                    }, 100);
                }
            });
        }

        // Escape to close/reset
        if (e.key === 'Escape') {
            document.activeElement.blur();
        }
    });

    // Add tooltips on hover (simple implementation)
    const tooltips = {
        '🔔': 'Notifications',
        '⚙️': 'Settings',
        '🎤': 'Voice Record',
        '📎': 'Attach File',
        '⭐': 'Add to Favorites',
        '⋮': 'More Options',
        '▦': 'Grid View',
        '☰': 'List View',
        '✏️': 'Edit',
        '🗑️': 'Delete',
        '🔗': 'Share Link',
        '←': 'Back'
    };

    iconBtns.forEach(btn => {
        const icon = btn.textContent.trim();
        if (tooltips[icon]) {
            btn.title = tooltips[icon];
        }
    });

    console.log('🎨 MemoMemo mockup loaded!');
    console.log('💡 Keyboard shortcuts:');
    console.log('   Cmd/Ctrl + Shift + M: Focus quick capture');
    console.log('   Cmd/Ctrl + K: Open search');
    console.log('   ESC: Close/blur');
});
