import {ConfigNotAvailableError} from "./Errors";

type Options = {
    useRuntime?: boolean;
    logConfig?: boolean;
    logConfigState?: boolean;
    logMethod?: 'error' | 'warn' | 'info' | ((message: string) => void);
}

const defaults: Required<Options> = {
    useRuntime: false,
    logConfig: false,
    logConfigState: false,
    logMethod: 'warn'
}

export class RuntimeEnvironment<T extends Record<string, string>> {
    private readonly _envModel: T;
    private readonly _options;
    private _config: T = {} as T;

    constructor(model: T, options?: Options) {
        this._envModel = model;
        this._options = {...defaults, ...options};

        this.init();
    }

    private init() {
        if (this._options.useRuntime) {
            this.setRuntimeEnv();
        } else if (process.env && process.env.NODE_ENV === "development") {
            this._config = this._envModel
        } else {
            this.setRuntimeEnv();
        }

        this._options.logConfigState && this.logConfigState();
        this._options.logConfig && console.log(this._config)
    }

    private setRuntimeEnv() {
        const runtimeEnv = window?.__env__;

        if (!runtimeEnv) {
            throw new ConfigNotAvailableError();
        }

        return runtimeEnv;
    }

    private logConfigState() {
        let valid = true;
        const method = this._options.logMethod;
        const log = typeof method === "string" ? console[method] : method;

        Object.keys(this._envModel).forEach(key => {
            if (!this._config[key]) {
                const message = `Environment config key ${key} can not be found.`;
                log(message)
                valid = false;
            }
        })

        if (valid) {
            const message = 'Your environment config is set properly.';
            console.log(message)
        }
    }

    get config() {
        return this._config;
    }
}