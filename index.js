// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// 4. Handle unix timestamp
app.get("/api/:input(\\d+)", function (req, res) {

  const input = req.params.input;
  const inputDate = new Date(parseInt(input));
  console.log(inputDate);
  res.json({
    unix: inputDate.getTime(),
    utc: inputDate.toUTCString()
  })
})

//5. Parsable date
app.get("/api/:input", function (req, res) {
  const input = req.params.input;
  const inputDate = new Date(input);
  console.log(inputDate);
  // 6 Unparsable
  if (inputDate.toUTCString() === "Invalid Date"){
    res.json({error: "Invalid Date"});
  } else {
    res.json({
      unix: inputDate.getTime(),
      utc: inputDate.toUTCString()
    })
  }

})

// 2-3
app.get("/api/\:date\?", function (req, res) {
  const curDate = new Date();
  res.json({
    unix: curDate.getTime(),
    utc: curDate.toUTCString()
  });
});

app.get("/api/", function (req, res) {
  const curDate = new Date();
  res.json({
    unix: curDate.getTime(),
    utc: curDate.toUTCString()
  });
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
