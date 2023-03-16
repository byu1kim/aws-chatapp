export async function main(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      time: "Hello Chat Chat Chat",
    }),
  };
}
