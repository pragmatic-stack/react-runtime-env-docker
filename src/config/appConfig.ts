/**
 * The localEnv needs to be adjusted to your app config setup
 */
const localEnv = {
    REACT_APP_API_URL: process.env.REACT_APP_API_URL ||  "http://localhost:8000",
    REACT_APP_APP_LOADER_URL: process.env.REACT_APP_APP_LOADER_URL || "http://localhost:3000"
}

export type RuntimeEnvConfig = Partial<typeof localEnv>;
export type RuntimeEnvKeys = keyof RuntimeEnvConfig;

export const ERROR_MESSAGE = {
    CONFIG_NOT_SET: 'Runtime environment config is not set. window.__env__ is not available.',
    CONFIG_KEY_MISSING: (key: RuntimeEnvKeys) => `Your runtime env configuration is invalid. Key: ${key} is not set`
}

export const appConfig: Required<RuntimeEnvConfig> = (() => {
    if (process.env.NODE_ENV === "development") {
        return localEnv;
    }

    const runtimeEnv = window ? window.__env__ : undefined;

    if (runtimeEnv) {
        Object.keys(localEnv).forEach(k => {
            if (!runtimeEnv[k as RuntimeEnvKeys]) {
                throw new Error(ERROR_MESSAGE.CONFIG_KEY_MISSING(k as RuntimeEnvKeys))
            }
        })

        return window.__env__ as Required<RuntimeEnvConfig>
    } else {
        throw new Error(ERROR_MESSAGE.CONFIG_NOT_SET)
    }
})();