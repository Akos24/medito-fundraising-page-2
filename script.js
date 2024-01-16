// JavaScript

// Fundraising details
let currentGoal = "Create Ad Campaign in the Tram";

// Set fundraising details
document.querySelector(".fundraisingTitle").innerHTML = currentGoal;

// Dummy data for fundraising - It is changable dynamically
let currentAmount = 100;
let goalAmount = 150;

// Calculate progress percentage
let progressPercentage = Math.min((currentAmount / goalAmount) * 100, 100);

// Set goal labels in the HTML
document.getElementById("goalLabel").innerText = `$${goalAmount}`;
document.getElementById("halfwayGoal").innerText = `$${goalAmount / 2}`;
document.getElementById("qa1").innerText = `Our fundraising goal is $${goalAmount} to support the creation of an impactful ad campaign for the Medito community.`;

// Set progress details in the HTML
document.querySelector(".progress").innerHTML = `Raised $${currentAmount} of $${goalAmount} goal (${Math.round(progressPercentage, 2)}%)`;

// Animate the progress bar on page load
document.addEventListener("DOMContentLoaded", function () {
    let filler = document.querySelector(".filler");
    filler.style.width = `${progressPercentage}%`;
});

function toggleAnswer(id) {
    let answer = document.getElementById(id);
    answer.style.display = (answer.style.display === "none" || answer.style.display === "") ? "block" : "none";
}

function handleDonation() {
    // Get the donation amount from the input
    let donationAmountInput = document.getElementById("amountInput");
    let donationAmount = parseFloat(donationAmountInput.value);

    // Validate the donation amount
    if (isNaN(donationAmount) || donationAmount <= 0) {
        alert("Please enter a valid donation amount.");
        return;
    }

    // For simplicity, log the donation amount to the console
    console.log(`Donation Amount: $${donationAmount}`);

    // In a real application, you would integrate with Stripe for payment processing here
    // This involves server-side processing for security reasons
    // Refer to the Stripe documentation for the complete integration process
}

function fetchRecentDonations() {
    // Replace the URL with the actual API endpoint
    fetch('https://api.example.com/recent-donations')
        .then(response => response.json())
        .then(data => {
            // Display recent donations in the notification bar
            document.getElementById('recentDonations').innerText = data.join(', ');
            // Show the notification bar
            document.getElementById('notificationBar').style.display = 'block';
        })
        .catch(error => console.error('Error fetching recent donations:', error));
}

// Fetch recent donations every 5 minutes (adjust the interval as needed)
setInterval(fetchRecentDonations, 300000);

function validateForm() {
    // Reset previous error messages
    clearErrors();

    // Get form inputs
    const emailInput = document.getElementById('email');
    const amountInput = document.getElementById('amountInput');

    // Validation flag
    let isValid = true;

    // Email validation
    if (!isValidEmail(emailInput.value)) {
        displayError(emailInput, 'Please enter a valid email address.');
        isValid = false;
    }

    // Amount validation
    const amountValue = parseFloat(amountInput.value);
    if (isNaN(amountValue) || amountValue <= 0) {
        displayError(amountInput, 'Please enter a valid donation amount.');
        isValid = false;
    }

    // Add more validation rules as needed

    return isValid;
}

function isValidEmail(email) {
    // Regular expression for basic email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function displayError(inputElement, errorMessage) {
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = errorMessage;

    // Insert error message after the input element
    inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
}

function clearErrors() {
    // Remove all error messages
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(message => message.remove());
}