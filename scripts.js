// Create a function to generate and append the HTML content and CSS to the DOM
function createCalendar() {
    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en" dir="ltr">
        <head>
            <meta charset="utf-8">
            <title>Calendar</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200">
        </head>
        <body>
            <div class="calendar-container">
                <header class="calendar-header">
                    <p class="calendar-current-date"></p>
                    <div class="calendar-navigation">
                        <span id="calendar-prev" class="material-symbols-rounded">
                            chevron_left
                        </span>
                        <span id="calendar-next" class="material-symbols-rounded">
                            chevron_right
                        </span>
                    </div>
                </header>
                <div class="calendar-body">
                    <ul class="calendar-weekdays">
                        <li>Sun</li>
                        <li>Mon</li>
                        <li>Tue</li>
                        <li>Wed</li>
                        <li>Thu</li>
                        <li>Fri</li>
                        <li>Sat</li>
                    </ul>
                    <ul class="calendar-dates"></ul>
                </div>
            </div>
        </body>
        </html>
    `;
    const cssContent = `
        <style>
            * {
                margin: 0;
                padding: 0;
                font-family: 'Poppins', sans-serif;
            }
            body {
                display: flex;
                background: lightgreen;
                min-height: 100vh;
                padding: 0 10px;
                align-items: center;
                justify-content: center;
            }
            .calendar-container {
                background: #fff;
                width: 450px;
                border-radius: 10px;
                box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
            }
            .calendar-container header {
                display: flex;
                align-items: center;
                padding: 25px 30px 10px;
                justify-content: space-between;
            }
            header .calendar-navigation {
                display: flex;
            }
            header .calendar-navigation span {
                height: 38px;
                width: 38px;
                margin: 0 1px;
                cursor: pointer;
                text-align: center;
                line-height: 38px;
                border-radius: 50%;
                user-select: none;
                color: #AEABAB;
                font-size: 1.9rem;
            }
            .calendar-navigation span:last-child {
                margin-right: -10px;
            }
            header .calendar-navigation span:hover {
                background: #F2F2F2;
            }
            header .calendar-current-date {
                font-weight: 500;
                font-size: 1.45rem;
            }
            .calendar-body {
                padding: 20px;
            }
            .calendar-body ul {
                list-style: none;
                flex-wrap: wrap;
                display: flex;
                text-align: center;
            }
            .calendar-body .calendar-dates {
                margin-bottom: 20px;
            }
            .calendar-body li {
                width: calc(100% / 7);
                font-size: 1.07rem;
                color: #414141;
            }
            .calendar-body .calendar-weekdays li {
                cursor: default;
                font-weight: 500;
            }
            .calendar-body .calendar-dates li {
                margin-top: 30px;
                position: relative;
                z-index: 1;
                cursor: pointer;
            }
            .calendar-dates li.inactive {
                color: #aaa;
            }
            .calendar-dates li.active {
                color: #fff;
            }
            .calendar-dates li::before {
                position: absolute;
                content: "";
                z-index: -1;
                top: 50%;
                left: 50%;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                transform: translate(-50%, -50%);
            }
             .calendar-dates li.active::before {
                background: #6332C5;
            }
            .calendar-dates li:not(.active):hover::before {
                background: #E4E1E1;
            }
        </style>
    `;
    // Create a new div element and set its innerHTML to the HTML content and CSS
    const container = document.createElement('div');
    container.innerHTML = htmlContent + cssContent;
    // Append the content to the document's body
    document.body.appendChild(container);
}
createCalendar()
// Call the function to generate and append the HTML content and CSS
// Add the provided JavaScript code
function JScript(bgcolor, activecolor = "pink") {
    var body = document.getElementsByTagName("body")[0];
    body.style.backgroundColor = bgcolor;
    var styleElement = document.createElement('style');
    document.head.appendChild(styleElement);
    // Define the CSS rule to change the background color
    var newRule = `.calendar-dates li.active::before { background: ${activecolor} !important; }`; // Change to your desired color
    // Add the rule to the style element's stylesheet
    styleElement.sheet.insertRule(newRule, 0);
    // Change the background color of the ::before pseudo-element
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    const day = document.querySelector(".calendar-dates");
    const currdate = document.querySelector(".calendar-current-date");
    const prenexIcons = document.querySelectorAll(".calendar-navigation span");
    // Array of month names
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    // Function to generate the calendar
    const manipulate = () => {
        // Get the first day of the month
        let dayone = new Date(year, month, 1).getDay();
        // Get the last date of the month
        let lastdate = new Date(year, month + 1, 0).getDate();
        // Get the day of the last date of the month
        let dayend = new Date(year, month, lastdate).getDay();
        // Get the last date of the previous month
        let monthlastdate = new Date(year, month, 0).getDate();
        // Variable to store the generated calendar HTML
        let lit = "";
        // Loop to add the last dates of the previous month
        for (let i = dayone; i > 0; i--) {
            lit +=
                `<li class="inactive">${monthlastdate - i + 1}</li>`;
        }
        // Loop to add the dates of the current month
        for (let i = 1; i <= lastdate; i++) {
            // Check if the current date is today
            let isToday = i === date.getDate()
                && month === new Date().getMonth()
                && year === new Date().getFullYear()
                ? "active"
                : "";
            lit += `<li class="${isToday}">${i}</li>`;
        }
        // Loop to add the first dates of the next month
        for (let i = dayend; i < 6; i++) {
            lit += `<li class="inactive">${i - dayend + 1}</li>`;
        }
        // Update the text of the current date element
        // with the formatted current month and year
        currdate.innerText = `${months[month]} ${year}`;
        // update the HTML of the dates element
        // with the generated calendar
        day.innerHTML = lit;
    }
    manipulate();
    // Attach a click event listener to each icon
    prenexIcons.forEach(icon => {
        // When an icon is clicked
        icon.addEventListener("click", () => {
            // Check if the icon is "calendar-prev"
            // or "calendar-next"
            month = icon.id === "calendar-prev" ? month - 1 : month + 1;
            // Check if the month is out of range
            if (month < 0 || month > 11) {
                // Set the date to the first day of the
                // month with the new year
                date = new Date(year, month, new Date().getDate());
                // Set the year to the new year
                year = date.getFullYear();
                // Set the month to the new month
                month = date.getMonth();
            }
            else {
                // Set the date to the current date
                date = new Date();
            }
            // Call the manipulate function to
            // update the calendar display
            manipulate();
        });
    });
}