import {Environment} from "../types/Environment";

const envSkeleton: Environment = {
    REACT_APP_API_URL: undefined,
    REACT_APP_APP_LOADER_URL: undefined
}

export const WINDOW_CONFIG_NOT_SET_ERROR_MSG = 'Window environment config is not set!';
export const WINDOW_CONFIG_MISSING_CONFIG_KEY_MSG = (key: string) => `Your runtime env configuration is invalid. Key: ${key} is not set`;

export const env: Required<Environment> = (() => {
    if(process.env.NODE_ENV === "development"){
        return {
            REACT_APP_API_URL: process.env.REACT_APP_API_URL || 'some',
            REACT_APP_APP_LOADER_URL: process.env.REACT_APP_APP_LOADER_URL || 'some'
        }
    } else {
        const windowEnv = window.__env__;

        if(!windowEnv){
            throw new Error(WINDOW_CONFIG_NOT_SET_ERROR_MSG)
        }

        Object.keys(envSkeleton).forEach(k => {
            if(!windowEnv[k as keyof typeof windowEnv]){
                throw new Error(WINDOW_CONFIG_MISSING_CONFIG_KEY_MSG(k))
            }
        })

        return {
            ...window.__env__
        } as Required<Environment>
    }
})();