import { editChat } from "@chatapp/core/database";

export async function main(event) {
  const { chatId } = event.pathParameters;
  const { name } = JSON.parse(event.body); // Get the chat name from the POST body
  const chat = await editChat(chatId, name);
  console.log("✅", chat);
  return {
    statusCode: 200,
    body: JSON.stringify({ chat: chat }),
  };
}
