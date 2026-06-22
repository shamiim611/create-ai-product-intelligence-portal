const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Serve static files from the root directory
app.use(express.static(__dirname, {
  setHeaders: (res, filepath) => {
    // Cache static assets for 1 week
    if (filepath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 hour for HTML
    } else {
      res.setHeader('Cache-Control', 'public, max-age=604800'); // 1 week for assets
    }
  }
}));

// Route: index/home
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard code.html'));
});

// Fallback for any undefined routes - serve the main dashboard
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard code.html'));
});

app.listen(PORT, () => {
  console.log(`CreateAI Dashboard running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
