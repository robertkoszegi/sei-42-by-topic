const request = require("request");
const fs = require("fs");

function base64_encode(image) {
  var bitmap = fs.readFileSync(image);
  return bitmap.toString("base64");
}

function upload(req, res) {
  let image = base64_encode(req.files.image.file);

  const options = {
    method: "POST",
    url: "https://api.imgur.com/3/image",
    headers: {
      Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
    },
    formData: {
      image: image,
      type: "base64",
    },
  };

  request(options, function (err, response) {
    if (err) res.send(err.message);
    let body = JSON.parse(response.body);
    console.log(body);
    // res.send("img is uploaded to imgur");
    res.render("img", { img: body.data.link });
  });
}

module.exports = {
  upload,
};
