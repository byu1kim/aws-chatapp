import { getMessages } from "@chatapp/core/database";

export async function main(event) {
  const { chatId } = event.pathParameters;
  const messages = await getMessages(chatId);
  return {
    statusCode: 200,
    body: JSON.stringify({ messages: messages }),
  };
}
