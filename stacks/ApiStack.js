import { Api } from "sst/constructs";

export function API({ stack }) {
  // we need api gateway
  const api = new Api(stack, "api", {
    defaults: {
      function: {
        environment: {
          DATABASE_URL: process.env.DATABASE_URL,
        },
      },
    },
    routes: {
      "POST /chats": "packages/functions/src/chats/post.main",
      "GET /chats": "packages/functions/src/chats/get.main",
      "PUT /chats/{chatId}": "packages/functions/src/chats/put.main",
      "DELETE /chats/{chatId}": "packages/functions/src/chats/delete.main",
      "GET /messages/{chatId}": "packages/functions/src/messages/get.main",
      "POST /messages/{chatId}": "packages/functions/src/messages/post.main",
      "PUT /messages/{chatId}/{messageId}": "packages/functions/src/messages/put.main",
      "DELETE /messages/{chatId}/{messageId}": "packages/functions/src/messages/delete.main",
    },
  });

  // you can define s3 bucket, cognito here as well
  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return { api };
}
