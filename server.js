const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;
const axios = require('axios');


app.use(express.static(path.join(__dirname, '/build')));

const getLatest = async () => {
  try {
    return await axios.get('https://blockchain.info/latestblock');
  } catch (error) {
    console.log(error);
  }
}

const getTrans = async (hash) => {
  try {
    return await axios.get('https://blockchain.info/rawtx/' + hash);
  } catch (error) {
    console.log(error);
  }
}

const getSingle = async (hash) => {
  try {
    return await axios.get('https://blockchain.info/rawblock/' + hash);
  } catch (error) {
    console.log(error);
  }
}

app.get('/singleblock/:hash', function (req, res) {
   getSingle(req.params.hash)
   .then(response => {
      if (response.data) {

         res.send(response.data);
      }
      else {
         res.send('Failed to fetch latest Single Blockchain...');
      }
   })
   .catch(error => {
      console.error(error);
   });
});

app.get('/transblock/:hash',function (req, res) {
   getTrans(req.params.hash)
   .then(response => {
     console.log(response);
      if (response.data) {

         res.send(response.data);
      }
      else {
         res.send('Failed to fetch Transaction Blockchain...');
      }
   })
   .catch(error => {
      console.log(error);
   });
});

app.get('/latestblock', function (req, res) {
   getLatest()
   .then(response => {
     if (response.data) {
        res.send(response.data);
     }
      else {
         res.send('Failed to fetch Latest Blockchain...');
      }
   })
   .catch(error => {
      console.log(error);
   });
});

//build mode
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/build/index.html'));
})

//start server
app.listen(port, (req, res) => {
  console.log( `server listening on port: ${port}`);
})
