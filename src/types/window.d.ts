import {Environment} from "./Environment";

declare global {
    interface Window {
        __env__?: Environment
    }
}