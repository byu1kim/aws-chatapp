import { createChat } from "@chatapp/core/database";

export async function main(event) {
  const { name } = JSON.parse(event.body); // Get the chat name from the POST body
  const chat = await createChat(name);
  return {
    statusCode: 200,
    body: JSON.stringify({ chat: chat }),
  };
}
