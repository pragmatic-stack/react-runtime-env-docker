import {Environment} from "../types/Environment";

const envSkeleton: Environment = {
    apiUrl: undefined,
    appLoaderUrl: undefined
}

export const env: Required<Environment> = (() => {
    if(process.env.NODE_ENV === "development"){
        return {
            apiUrl: process.env.REACT_APP_API_URL || 'some',
            appLoaderUrl: process.env.REACT_APP_APP_LOADER_URL || 'some'
        }
    } else {
        const windowEnv = window.__env__;

        if(!windowEnv){
            throw new Error('Window environment config is not set!')
        }

        Object.keys(envSkeleton).forEach(k => {
            if(!windowEnv[k as keyof typeof windowEnv]){
                throw new Error(`Your runtime env configuration is invalid. Key: ${k} is not set`)
            }
        })

        return {
            ...window.__env__
        } as Required<Environment>
    }
})();