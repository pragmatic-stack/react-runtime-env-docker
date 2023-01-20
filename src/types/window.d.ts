import {RuntimeEnvConfig} from "./RuntimeEnvConfig";

declare global {
    interface Window {
        __env__?: RuntimeEnvConfig
    }
}