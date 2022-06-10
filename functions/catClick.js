// exports.handler = async (event, context) => {
//   console.log("hit the cat backend");
//   console.log("the cat event", event.httpMethod);
//   return {
//     statusCode: 200,
//     body: JSON.stringify({
//       message: "WELCOME!",
//     }),
//   };
// };

exports.handler = async (event, context) => {
  console.log("clicked for cat");
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      body: JSON.stringify({
        message: `wrong method. You tried ${event.httpMethod}`,
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
