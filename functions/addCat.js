const axios = require("axios");

exports.handler = async (event, context) => {
  try {
    const catUrl = await getRandomCat();
    const data = JSON.parse(event.body);
    if (data.name === "") {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `You didnt send a name`,
        }),
      };
    }
    newCat(data.name, catUrl);
    return {
      statusCode: 200,
      body: JSON.stringify({
        receivedDasta: data,
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
const newCat = async (name, url) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:8080/v1/graphql",
      data: {
        query: `mutation addNewCat($name: String!, $url: String!) {
        insert_cats_one(object:{name: $name, url: $url}) {
        
          name
         
        }
      }
      `,
        variables: { name, url },
      },
    });
  } catch (err) {
    return {
      statusCode: 500,
      body: err.message,
    };
  }
};
