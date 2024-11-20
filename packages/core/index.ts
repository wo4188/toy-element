import { makeInstaller } from "@toy-view/utils";
import components from "./components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import printLogo from './printLogo';
import "@toy-view/theme/index.css";

printLogo();

library.add(fas);
const installer = makeInstaller(components);

export * from "../components";
export default installer;