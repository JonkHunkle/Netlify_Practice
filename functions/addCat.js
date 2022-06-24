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
  const body = JSON.parse(event.body);
  const name = body.name;

  try {
    const client = new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: "http://localhost:8080/v1/graphql",
        fetch,
      }),
    });
    await client.mutate({
      mutation: parse(ADD_CAT),
      variables: { name },
    });

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

const ADD_CAT = `
  mutation addNewCat($name: String!, $url: String) {
    insert_cats_one(object: { name: $name, url: $url }) {
      name
      id
      url
    }
  }
`;
