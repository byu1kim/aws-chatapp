import { StaticSite, use } from "sst/constructs";
import { API } from "./ApiStack";

export function FrontendStack({ stack, app }) {
  const { api } = use(API);

  const site = new StaticSite(stack, "ReactSite", {
    path: "frontend",
    buildOutput: "build",
    buildCommand: "npm build",
    // Pass in our environment variables
    environment: {
      REACT_APP_AB: "aaa",
      REACT_APP_API_URL: api.customDomainUrl || api.url,
    },
  });

  // Show the url in the output
  stack.addOutputs({
    SiteUrl: site.url || "",
  });
}
