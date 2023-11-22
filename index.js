// app.js

const express = require('express');
const app = express();

// Serve static files from the 'my-website' folder
app.use(express.static('my-website'));
// app.get('/', (req, res) => res.json({message: 'Hello there!'}));


app.listen(process.env.PORT || 80, () => {
    console.log(`Server running at http://localhost:${process.env.PORT || 80}/`);
});
