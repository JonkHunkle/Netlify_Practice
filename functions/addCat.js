const axios = require("axios");

exports.handler = async (event, context) => {
  try {
    const data = JSON.parse(event.body);
    if (!data.name || data.name === "") {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `You didnt send a name`,
        }),
      };
    }
    const catUrl = await getRandomCat();
    return {
      statusCode: 200,
      body: JSON.stringify({
        receivedData: { name: data.name, url: catUrl },
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err.message,
    };
  }
};
const getRandomCat = async () => {
  const res = await axios({
    method: "GET",
    url: "https://api.thecatapi.com/v1/images/search",
  });
  img = res.data[0].url;
  return img;
};
