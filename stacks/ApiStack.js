import { Api, Cognito } from "sst/constructs";

export function API({ stack }) {
  // cognito
  const auth = new Cognito(stack, "Auth", {
    login: ["email", "username"],
  });

  // api gateway
  const api = new Api(stack, "api", {
    authorizers: {
      jwt: {
        type: "user_pool",
        userPool: {
          id: auth.userPoolId,
          clientIds: [auth.userPoolClientId],
        },
      },
    },
    defaults: {
      authorizer: "jwt",
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

  auth.attachPermissionsForAuthUsers(stack, [api]);

  stack.addOutputs({
    ApiEndpoint: api.url,
    UserPoolId: auth.userPoolId,
    //IdentityPoolId: auth.cognitoIdentityPoolId ?? "",
    UserPoolClientId: auth.userPoolClientId,
  });

  // you can define s3 bucket, cognito here as well
  // stack.addOutputs({
  //   ApiEndpoint: api.url,
  // });

  return { api, auth };
}
