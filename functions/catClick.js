const axios = require("axios");

exports.handler = async (event, context) => {
  try {
    console.log("clicked for cat");
    if (event.httpMethod !== "GET") {
      return {
        statusCode: 405,
        body: JSON.stringify({
          message: `wrong method. You tried ${event.httpMethod}`,
        }),
      };
    }

    let img;

    try {
      const res = await axios({
        method: "GET",
        url: "https://api.thecatapi.com/v1/images/search",
      });
      img = res.data[0].url;
      console.log("this is img", img);
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: `${img}`,
        }),
      };
    } catch (err) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `${err.message}`,
        }),
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `${err.message}`,
      }),
    };
  }
};
