var express = require("express");
var router = express.Router();
const request = require("request");
const axios = require("axios");

const token = process.env.GITHUB_TOKEN;
const rootURL = "https://api.github.com";

/* GET home page. */
router.get("/", async function (req, res, next) {
  const username = req.query.username;

  // const options = {
  //   url: `${rootURL}/users/${username}`,
  //   headers: {
  //     "User-Agent": "jim-clark",
  //     Authorization: `token ${token}`,
  //   },
  // };

  // request(options, function (err, response, body) {
  //   const userData = JSON.parse(body);
  //   // console.log(userData);
  //   options.url = userData.repos_url;
  //   request(options, function (err, response, body) {
  //     userData.repos = JSON.parse(body);
  //     console.log(userData.repos);
  //     res.render("index", { title: "Express", userData });
  //   });
  // });

  try {
    let userData = await axios.get(`${rootURL}/users/${username}`, {
      headers: { Authorization: `token ${token}` },
    });
    userData = userData.data;
    let repoData = await axios.get(userData.repos_url);
    userData.repos = repoData.data;

    res.render("index", { title: "Express", userData });
  } catch (err) {
    console.log(err.message);
    res.render("error");
  }
});

module.exports = router;
