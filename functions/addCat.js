const axios = require("axios");
exports.handler = async (event, context) => {
  try {
    const catUrl = await getRandomCat();
    const data = JSON.parse(event.body);
    console.log("parsed data", JSON.stringify(data, null, 2));
    updateCat(data.event.data.new.id, catUrl);
    return {
      statusCode: 200,
      body: catUrl,
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
  console.log("this is img", img);
  return img;
};
const updateCat = async (id, url) => {
  const res = await axios({
    method: "POST",
    url: "http://localhost:8080/v1/graphql",
    data: {
      operationName: "updateCatUrl",
      query: `mutation updateCatUrl($id: Int!, $url: String!) {
            update_cats(where: {id: {_eq: $id}}, _set: {url: $url}) {
              returning {
                name
                id
                url
              }
            }
          }`,
      variables: { id, url },
    },
  });
};
