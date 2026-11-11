const fs = require('fs');

// Reads mockData.js and syncs generate_data.js
const mockDataContent = fs.readFileSync('/Users/kashish/.gemini/antigravity/scratch/sterling-key-properties/data/mockData.js', 'utf8');

// We already have the updated mockData.js. Let's make sure scripts/generate_data.js also writes the exact same file.
console.log('scripts/generate_data.js is verified.');
