const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const dotenv = require('dotenv');
const app = express();
const port = 4000;
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const headers = {
  Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`,
};

app.post('/getpetadoptions', (req, res) => {
  const params = req.body;
  const url =
    `https://api.yelp.com/v3/businesses/search?term=pets` +
    `&latitude=${params.lat}` +
    `&longitude=${params.lng}` +
    `&categories=petadoption` +
    `&limit=${params.pagecount}` +
    `&sort_by=${params.sortby}` +
    `&offset=${params.pagecount * (params.page - 1)}`;
  axios({
    method: 'get',
    url: url,
    headers,
  }).then(
    (result) => {
      res.send(result.data);
    },
    (error) => {
      res.send(error);
    }
  );
});

app.post('/getpetadoptiondetail', (req, res) => {
  const params = req.body;
  const url = `https://api.yelp.com/v3/businesses/${params.id}`;
  axios({
    method: 'get',
    url: url,
    headers,
  }).then(
    (result) => {
      res.send(result.data);
    },
    (error) => {
      res.send(error);
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
