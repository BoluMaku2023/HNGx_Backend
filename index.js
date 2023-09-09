const express = require("express");
const app = express();
const port = 3002;

app.use(express.json());

app.post("/", (req, res) => {
  console.log(req.body.name);
});
app.get("/api", (req, res) => {
  //getting the query parameters from the request
  const { slack_name, track } = req.query;

  //validate query parameters
  if (!slack_name || !track) {
    return res.status(400).json({
      error: "Slackname and track not found",
    });
  }

  //calculate the current day of the week
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const current_day = daysOfWeek[new Date().getDay()];

  //calculate the current utc time with validation of +/-2
  const now = new Date();
  // const utcOffset = now.getTimezoneOffset() / 60; //calculate the utc offset in hours

  // //validating the offset
  // if(utcOffset < -2 || utcOffset > 2){
  //     return res.status(400).json({error : 'Invalid UTC offset'});
  // }

  const utc_time = now.toISOString().slice(0, -5) + "Z";

  //Construct  github urls
  const githubBaseUrl = "https://github.com/BoluMaku2023/HNGx_task1";
  const github_file_url = `${githubBaseUrl}/blob/master/index.js`;
  const github_repo_url = `${githubBaseUrl}`;

  //Prepare the response JSON
  const response = {
    slack_name,
    current_day,
    utc_time,
    track,
    github_file_url,
    github_repo_url,
    status_code: 200,
  };

  //send the json response
  res.json(response);
});

app.listen(port, () => {
  console.log(`App runing on port ${port}`);
});
