import { getMessages, deleteMessage } from "@chatapp/core/database";

export async function main(event) {
  const { chatId, messageId } = event.pathParameters; // get the chatId from the path parameters
  await deleteMessage(messageId);

  const deletedMessages = await getMessages(chatId);

  return {
    statusCode: 200,
    body: JSON.stringify({ messages: deletedMessages }),
  };
}
