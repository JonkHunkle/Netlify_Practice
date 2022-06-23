const axios = require("axios");
const { parse } = require("graphql");
const {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
} = require("@apollo/client");
const fetch = require("cross-fetch");

exports.handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body);
    console.log("New cat record inserted", JSON.stringify(body, null, 2));

    const catUrl = await getRandomCat();

    const { event: hasuraEvent } = body;
    const { data } = hasuraEvent;
    const { new: newRecord } = data;
    const { id } = newRecord;

    console.log("Got a random cat url to use: ", catUrl);

    // Lets update the record with our random cat url
    const res = await updateCatUrl(id, catUrl);
    console.log(
      "Updated the cat record with Apollo: ",
      JSON.stringify(res.data, null, 2)
    );

    const resAxios = await updateCatUrlWithAxios(id, catUrl);
    console.log(
      "Updated the cat record with Axios: ",
      JSON.stringify(resAxios.data, null, 2)
    );

    return {
      statusCode: 200,
      body: JSON.stringify(body),
    };
  } catch (err) {
    console.error(err.message);
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

const updateCatUrl = async (id, url) => {
  try {
    const client = new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: "http://localhost:8080/v1/graphql",
        fetch,
      }),
    });
    return await client.mutate({
      mutation: parse(UPDATE_CAT_URL),
      variables: { id, url },
    });
  } catch (err) {
    console.error(err);
  }
};

const updateCatUrlWithAxios = async (id, url) => {
  return await axios({
    url: "http://localhost:8080/v1/graphql",
    method: "post",
    data: {
      query: UPDATE_CAT_URL,
      variables: { id, url },
    },
    headers: {
      "content-type": "application/json",
    },
  });
};

const UPDATE_CAT_URL = `
  mutation updateCatUrl($id: Int!, $url: String!) {
    update_cats_by_pk(pk_columns: { id: $id }, _set: { url: $url }) {
      url
      name
      id
    }
  }
`;
