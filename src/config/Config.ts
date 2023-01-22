type Options = {
    useRuntime?: boolean;
    logConfig?: boolean;
    logConfigHealth?: boolean;
}

const defaults: Required<Options> = {
    useRuntime: false,
    logConfig: false,
    logConfigHealth: false,
}

class Config<T extends Record<string, string>> {
    private readonly _model: T;
    private readonly _settings;
    private _env: T = {} as T;

    constructor(model: T, options?: Options) {
        this._model = model;
        this._settings = {...defaults, ...options};

        this.init();
    }

    private init() {
        const options = this._settings;

        if (options.useRuntime) {
            this.setRuntimeEnv();
        } else if (process.env && process.env.NODE_ENV === "development") {
            this._env = this._model
        } else {
            this.setRuntimeEnv();
        }

        options.logConfigHealth && this.logConfigHealth();
        options.logConfig && console.log(this._env);
    }

    private setRuntimeEnv() {
        const runtimeEnv = window?.__env__;

        if (!runtimeEnv) {
            this.log('Environment cannot be found.', 'error');
        } else {
            this._env = runtimeEnv;
        }
    }

    private logConfigHealth() {
        let valid = true;

        Object.keys(this._model).forEach(key => {
            if (!this._env[key]) {
                valid = false;
                this.log(`Environment config key ${key} can not be found.`, "error");
            }
        })

        if (valid) {
            this.log('Your environment config is set properly.')
        }
    }

    private log(message: string, type: 'error' | 'warn' | 'log' = 'log'){
        console[type](`Runtime Env | ${message}`)
    }

    get env() {
        return this._env;
    }
}

export const createConfig = <T extends Record<string, string>>(model: T, options: Options) => new Config<T>(model, options);