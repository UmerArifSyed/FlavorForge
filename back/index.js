require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Get API key from environment variable
const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

// Check if API key exists
if (!SPOONACULAR_API_KEY) {
  console.error('ERROR: SPOONACULAR_API_KEY is not set in .env file');
  process.exit(1);
}

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Recipe Generator Backend is running!' });
});

// Search recipes route
app.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    console.log(`Searching for: ${query}`);
    
    const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
      params: {
        apiKey: SPOONACULAR_API_KEY,
        query: query,
        number: 12, // Number of recipes to return
        addRecipeInformation: true, // Get additional recipe info
        fillIngredients: true // Include ingredients info
      }
    });

    console.log(`Found ${response.data.results?.length || 0} recipes`);
    res.json(response.data);

  } catch (error) {
    console.error('Search error:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      return res.status(401).json({ 
        error: 'Invalid API key. Please check your Spoonacular API key.' 
      });
    }
    
    if (error.response?.status === 402) {
      return res.status(402).json({ 
        error: 'API quota exceeded. Please check your Spoonacular account limits.' 
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to search recipes', 
      details: error.response?.data?.message || error.message 
    });
  }
});

// Get recipe details route
app.get('/recipe-details/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: 'Recipe ID is required' });
    }

    console.log(`Fetching details for recipe ID: ${id}`);
    
    const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
      params: {
        apiKey: SPOONACULAR_API_KEY,
        includeNutrition: false // Set to true if you want nutrition info
      }
    });

    console.log(`Successfully fetched details for recipe: ${response.data.title}`);
    res.json(response.data);

  } catch (error) {
    console.error('Recipe details error:', error.response?.data || error.message);
    
    if (error.response?.status === 404) {
      return res.status(404).json({ 
        error: 'Recipe not found' 
      });
    }
    
    if (error.response?.status === 401) {
      return res.status(401).json({ 
        error: 'Invalid API key. Please check your Spoonacular API key.' 
      });
    }
    
    if (error.response?.status === 402) {
      return res.status(402).json({ 
        error: 'API quota exceeded. Please check your Spoonacular account limits.' 
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to fetch recipe details', 
      details: error.response?.data?.message || error.message 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Spoonacular API Key loaded: ${SPOONACULAR_API_KEY ? 'Yes' : 'No'}`);
});