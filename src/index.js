import { AppRegistry } from "react-native";
import App from "./App";
import registerServiceWorker from './registerServiceWorker';

AppRegistry.registerComponent("App", () => App);

AppRegistry.runApplication("App", {
  rootTag: document.getElementById("root")
});
/*____________________ add service worker function ___________________*/

navigator.serviceWorker
.register('./registerServiceWorker.js');