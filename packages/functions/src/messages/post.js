import { createMessage } from "@chatapp/core/database";

export async function main(event) {
  const { chat_id, content, reply } = JSON.parse(event.body); // Get the chat name from the POST body
  const message = await createMessage(chat_id, content, reply);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: message }),
  };
}
