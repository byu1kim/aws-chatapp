import { StaticSite, use } from "sst/constructs";
import { API } from "./ApiStack";

export function FrontendStack({ stack, app }) {
  const { api, auth } = use(API);

  const site = new StaticSite(stack, "ReactSite", {
    path: "frontend",
    buildOutput: "build",
    buildCommand: "npm run build",
    environment: {
      REACT_APP_AB: "hoho",
      REACT_APP_API_URL: api.customDomainUrl || api.url,
      REACT_APP_REGION: app.region,
      REACT_APP_USER_POOL_ID: auth.userPoolId,
      REACT_APP_USER_POOL_CLIENT_ID: auth.userPoolClientId,
    },
  });

  // Show the url in the output
  stack.addOutputs({
    SiteUrl: site.url || "",
  });
}
