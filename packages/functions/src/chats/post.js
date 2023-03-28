import { createChat } from "@chatapp/core/database";

export async function main(event) {
  const sub = event.requestContext.authorizer?.jwt.claims.sub;
  const username = event.requestContext.authorizer?.jwt.claims.username;

  const { name } = JSON.parse(event.body); // Get the chat name from the POST body
  const chat = await createChat(name, sub, username);
  return {
    statusCode: 200,
    body: JSON.stringify({ chat: chat }),
  };
}
