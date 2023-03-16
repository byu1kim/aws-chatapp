import { Api } from "sst/constructs";

export function API({ stack }) {
  // we need api gateway
  const api = new Api(stack, "api", {
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
      "GET /test": "packages/functions/src/anotherFunction.main",
    },
  });

  // you can define s3 bucket, cognito here as well
  stack.addOutputs({
    Byul: "I need a break",
    ApiEndpoint: api.url,
  });

  return { api };
}
