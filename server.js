const express = require("express");
const app = express();
const port = 3001;

app.use(express.static("public"));

// get request to get information
app.get("/search", async (req, res) => {
  try {
    const countryName = req.query.country;
    const apiResponse = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}`
    );
    const data = await apiResponse.json();
    if (!apiResponse.ok) {
      throw new Error(`HTTP error status: ${apiResponse.status}`);
    }
    console.log(data);
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on http//localhost:${port}`);
});
