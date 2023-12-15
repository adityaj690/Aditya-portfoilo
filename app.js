const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const db = require('./database');
const app = express();
const PORT = process.env.PORT || 3000; // Choose a port number

// Enable CORS for all routes
app.use(cors());

// Serve static files (your HTML, CSS, JS) from a directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Initialize MongoDB connection
db.initialize()
  .then(() => {
    // Start the server after successfully connecting to MongoDB
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(`Failed to connect to MongoDB: ${err}`);
  });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','index.html'));
  });

app.post('/add-data',  async (req, res) => {

    try {
        console.log(req.body.name);
        const result = await db.addData(req.body); 
    // Display an alert for success
   
    res.redirect('/?success=' + encodeURIComponent(result.message)
    );
        
    } catch (error) {
      
        res.redirect('/?error='+encodeURIComponent(error.message));
    }
});