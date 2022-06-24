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
    console.log("in handleCatUpdate");
    const body = JSON.parse(event.body);
    console.log("new update to record");
    const { event: hasuraEvent } = body;
    const { data } = hasuraEvent;
    const { new: newRecord } = data;
    const { id } = newRecord;
    const friend = await getRandomFriend();
    // Lets update the record with new data
    console.log(friend);
    const res = await updateFriend(id, friend);

    return {
      statusCode: 200,
      body: JSON.stringify(res),
    };
  } catch (err) {
    console.error(err.message);
    return {
      statusCode: 500,
      body: err.message,
    };
  }
};

const updateFriend = async (id, friend) => {
  try {
    const client = new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: "http://localhost:8080/v1/graphql",
        fetch,
      }),
    });
    return await client.mutate({
      mutation: parse(UPDATE_CAT_FRIEND),
      variables: { id, friend },
    });
  } catch (err) {
    console.error(err);
  }
};
const getRandomFriend = async () => {
  const res = await axios({
    method: "GET",
    url: "https://random-data-api.com/api/name/random_name",
  });
  const { data } = res;
  const { name } = data;
  return name;
};

const UPDATE_CAT_FRIEND = `
  mutation updateCatFriend($id: Int!, $friend: String!) {
    update_cats_by_pk(pk_columns: { id: $id }, _set: { friend: $friend }) {
      id
      name
      url
      friend
    }
  }
`;
