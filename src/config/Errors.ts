export class ConfigNotAvailableError extends Error {
    constructor(message?: string) {
        super(message || 'Runtime environment config is not set. window.__env__ is not available.');
        this.name = "ConfigNotAvailableError"
    }
}

export class ConfigKeysInvalidError extends Error {
    constructor(keys: string[]) {
        super(`Your runtime env configuration is invalid. Keys: ${JSON.stringify(keys)} are not set`);
        this.name = "ConfigKeysInvalidError"
    }
}