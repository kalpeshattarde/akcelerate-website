require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/case-studies', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/case-studies.html'));
});

app.get('/founder', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/founder.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/contact.html'));
});

// API endpoint for contact form (placeholder - integrate with EmailJS on frontend)
app.post('/api/contact', (req, res) => {
    const { name, email, company, message } = req.body;
    
    // Log the contact form submission
    console.log('Contact Form Submission:', { name, email, company, message });
    
    // In production, you might want to store this in a database or send an email
    res.json({ 
        success: true, 
        message: 'Thank you for your inquiry. We will be in touch shortly.' 
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`\n🚀 AKcelerate website running on http://localhost:${PORT}`);
    console.log(`   Environment: ${process.env.NODE_ENV || 'development'}\n`);
});
