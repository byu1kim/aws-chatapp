import { getChats, deleteChat } from "@chatapp/core/database";

export async function main(event) {
  const { chatId } = event.pathParameters; // get the chatId from the path parameters
  // delete fk table first
  console.log(chatId);
  await deleteChat(chatId);

  const deletedChats = await getChats();
  return {
    statusCode: 200,
    body: JSON.stringify({ chats: deletedChats }),
  };
}
