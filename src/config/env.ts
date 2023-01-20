import {RuntimeEnvConfig} from "../types/RuntimeEnvConfig";

const RuntimeEnvModel: RuntimeEnvConfig = {
    REACT_APP_API_URL: undefined,
    REACT_APP_APP_LOADER_URL: undefined
}

type RuntimeEnvKeys = keyof RuntimeEnvConfig;

export const ERROR_MESSAGE = {
    CONFIG_NOT_SET: 'Runtime environment config is not set. window.__env__ is not available.',
    MISSING_CONFIG_KEY: (key: RuntimeEnvKeys) => `Your runtime env configuration is invalid. Key: ${key} is not set`
}

export const env: Required<RuntimeEnvConfig> = (() => {
    if (process.env.NODE_ENV === "development") {
        return {
            REACT_APP_API_URL: process.env.REACT_APP_API_URL || 'some',
            REACT_APP_APP_LOADER_URL: process.env.REACT_APP_APP_LOADER_URL || 'some'
        }
    }

    const runtimeEnv = window ? window.__env__ : undefined;

    if (runtimeEnv) {
        // check if configuration is provided as expected
        Object.keys(RuntimeEnvModel).forEach(k => {
            if (!runtimeEnv[k as RuntimeEnvKeys]) {
                throw new Error(ERROR_MESSAGE.MISSING_CONFIG_KEY(k as RuntimeEnvKeys))
            }
        })

        // return the properly configured environment
        return {
            ...window.__env__
        } as Required<RuntimeEnvConfig>

    } else {
        throw new Error(ERROR_MESSAGE.CONFIG_NOT_SET)
    }

})();