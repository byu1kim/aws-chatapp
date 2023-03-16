import { editMessage } from "@chatapp/core/database";

export async function main(event) {
  const { messageId } = event.pathParameters;
  const { content } = JSON.parse(event.body); // Get the chat name from the POST body
  const message = await editMessage(messageId, content);
  console.log("✅", message);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: message }),
  };
}
