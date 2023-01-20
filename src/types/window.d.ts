import {RuntimeEnvConfig} from "../config/appConfig";

declare global {
    interface Window {
        __env__?: RuntimeEnvConfig
    }
}