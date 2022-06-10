exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST")
    return {
      statusCode: 405,
      body: JSON.stringify({
        message: `wrong method. You tried ${event.httpMethod}`,
      }),
    };
  let data;
  try {
    data = JSON.parse(event.body);
  } catch (error) {
    console.log("unable to parse body", error);
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `no body detected`,
      }),
    };
  }
  let secret = data.secret;
  if (secret !== process.env.NEW_KEY) {
    console.log(
      `failed auth user passed ${secret}. needs to be ${process.env.NEW_KEY}`
    );
    return {
      statusCode: 403,
      body: JSON.stringify({
        message: "not authorized",
      }),
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "WELCOME!",
    }),
  };
};
