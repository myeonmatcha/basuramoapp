document.addEventListener('DOMContentLoaded', function() {
    // --- 1. User Authentication ---
    const userNumber = localStorage.getItem('userNumber');
    if (!userNumber) {
        // Redirect to login page if user is not authenticated
        window.location.href = 'login.html';
        return; // Prevent further execution
    }
    // Display the user number
    document.getElementById('userId').textContent = `User #${userNumber}`;

    // --- 2. Calendar Elements ---
    const currentMonthElement = document.querySelector('.current-month');
    const calendarDaysElement = document.querySelector('.calendar-days');
    const prevMonthButton = document.querySelector('.prev-month');
    const nextMonthButton = document.querySelector('.next-month');

    let currentDate = new Date(); // Start with the current date

    // --- 3. Function to Update the Calendar Display ---
    function updateCalendar() {
        try {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();

            const firstDayOfMonth = new Date(year, month, 1);
            const lastDayOfMonth = new Date(year, month + 1, 0);
            const daysInMonth = lastDayOfMonth.getDate();

            // Determine the day of the week for the first day of the month (0 = Sunday, 1 = Monday, etc.)
            let paddingDays = firstDayOfMonth.getDay();

            // Update the month display
            currentMonthElement.textContent = currentDate.toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric'
            });

            // Clear existing days
            calendarDaysElement.innerHTML = '';

            // Add padding days (empty divs for days before the 1st)
            for (let i = 0; i < paddingDays; i++) {
                const dayDiv = document.createElement('div');
                dayDiv.classList.add('padding');
                calendarDaysElement.appendChild(dayDiv);
            }

            // Add the days of the month
            for (let i = 1; i <= daysInMonth; i++) {
                const dayDiv = document.createElement('div');
                dayDiv.textContent = i;
                dayDiv.classList.add('day');

                // Add click event listener to each day
                dayDiv.addEventListener('click', () => {
                    alert(`Clicked on ${i}/${month + 1}/${year}`); // Replace with your desired action
                });

                calendarDaysElement.appendChild(dayDiv);
            }
        } catch (error) {
            console.error("Error updating calendar:", error);
            alert("An error occurred while generating the calendar. Please check the console.");
        }
    }

    // --- 4. Event Listeners for Month Navigation ---
    prevMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendar();
    });

    nextMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendar();
    });

    // --- 5. Initial Calendar Render ---
    updateCalendar();
});