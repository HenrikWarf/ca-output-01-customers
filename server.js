require('dotenv').config();
const express = require('express');
const { BigQuery } = require('@google-cloud/bigquery');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises; // Import fs.promises for async file operations

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the current directory
app.use(express.static(__dirname));

// Serve the config directory specifically
app.use('/config', express.static(path.join(__dirname, 'config')));

const bigquery = new BigQuery({
  projectId: process.env.BIGQUERY_PROJECT,
});

app.post('/query-bigquery', async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).send('Query is required.');
  }

  try {
    const [job] = await bigquery.createQueryJob({ query });
    const [rows] = await job.getQueryResults();
    res.json(rows);
  } catch (error) {
    console.error('BigQuery error:', error);
    res.status(500).send('Error executing BigQuery query.');
  }
});

app.get('/list-config-files', async (req, res) => {
  try {
    const configPath = path.join(__dirname, 'config');
    const files = await fs.readdir(configPath);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    res.json(jsonFiles);
  } catch (error) {
    console.error('Error listing config files:', error);
    res.status(500).send('Error listing config files.');
  }
});

// Serve index.html for the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});