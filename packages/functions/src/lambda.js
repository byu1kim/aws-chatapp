export async function handler(event, context) {
  //const time = new Time();
  return {
    statusCode: 200,
    body: JSON.stringify({
      time: "Hello Chat Chat Chat",
    }),
  };
}
