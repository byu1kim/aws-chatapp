import { getChats } from "@chatapp/core/database";

export async function main(event) {
  const sub = event.requestContext.authorizer?.jwt.claims.sub;
  const chats = await getChats(sub);
  return {
    statusCode: 200,
    body: JSON.stringify({ chats: chats }),
  };
}
