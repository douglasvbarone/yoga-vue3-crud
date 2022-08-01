import { boot } from "quasar/wrappers";
import { apolloProvider } from "../apolloProvider";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(({ app }) => {
  console.log("Using Apollo Provider");
  app.use(apolloProvider);
});
