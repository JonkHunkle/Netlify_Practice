const { gql, useQuery } = require("@apollo/client");

exports.handler = async (event, context) => {
  try {
    console.log("clicked make cat");
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({
          message: `wrong method. You tried ${event.httpMethod}`,
        }),
      };
    }

    try {
      const ALL_CATS = gql`
        query GetAllCats {
          cats{
            name
            id
          }
          }
        }
      `;

      const { err, loading, data } = useQuery(ALL_CATS);
      console.log("this is the data", data);
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: `${data}`,
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
