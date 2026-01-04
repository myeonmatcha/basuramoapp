document.addEventListener('DOMContentLoaded', function() {
    // --- 1. User Authentication ---
    const userNumber = localStorage.getItem('userNumber');
    if (!userNumber) {
        // Redirect to login page if user is not authenticated
        window.location.href = 'login.html';
        return; // Prevent further execution
    }
    // Display the user number in the top bar and user profile
    document.getElementById('userId').textContent = `User #${userNumber}`;
    document.getElementById('userNumberDisplay').textContent = userNumber;

    // --- 2. Dark Mode Toggle ---
    const darkModeToggle = document.querySelector('.toggle-switch input[type="checkbox"]');

    // Function to enable dark mode
    function enableDarkMode() {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled'); // Store the state in localStorage
    }

    // Function to disable dark mode
    function disableDarkMode() {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled'); // Store the state in localStorage
    }

    // Check if dark mode was previously enabled
    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode();
        darkModeToggle.checked = true;
    }

    // Add event listener to the dark mode toggle
    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    });

    // --- 3. Collection Reminders Settings ---
    const dayBeforeCheckbox = document.querySelector('.setting-item input[type="checkbox"][name="dayBefore"]');
    const morningOfCheckbox = document.querySelector('.setting-item input[type="checkbox"][name="morningOf"]');
    const reminderTimeInput = document.querySelector('.reminder-time input[type="time"]');

    // Load saved settings from localStorage (if any)
    if (localStorage.getItem('dayBefore') === 'checked') {
        dayBeforeCheckbox.checked = true;
    }
    if (localStorage.getItem('morningOf') === 'checked') {
        morningOfCheckbox.checked = true;
    }
    if (localStorage.getItem('reminderTime')) {
        reminderTimeInput.value = localStorage.getItem('reminderTime');
    }

    // Save settings to localStorage when they change
    dayBeforeCheckbox.addEventListener('change', function() {
        localStorage.setItem('dayBefore', this.checked ? 'checked' : 'unchecked');
    });

    morningOfCheckbox.addEventListener('change', function() {
        localStorage.setItem('morningOf', this.checked ? 'checked' : 'unchecked');
    });

    reminderTimeInput.addEventListener('change', function() {
        localStorage.setItem('reminderTime', this.value);
    });

    // --- 4. Scan Results and Weekly Report Toggles (Example) ---
    // You can add similar code for the Scan Results and Weekly Report toggles
    // to save and load their states from localStorage.

    // --- 5. Sign Out Button ---
    const signOutButton = document.querySelector('.sign-out');
    signOutButton.addEventListener('click', function() {
        // Clear user data from localStorage
        localStorage.removeItem('userNumber');
        localStorage.removeItem('darkMode');
        localStorage.removeItem('dayBefore');
        localStorage.removeItem('morningOf');
        localStorage.removeItem('reminderTime');

        // Redirect to the login page
        window.location.href = 'login.html';
    });
});