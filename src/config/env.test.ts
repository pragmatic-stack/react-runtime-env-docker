import {WINDOW_CONFIG_MISSING_CONFIG_KEY_MSG, WINDOW_CONFIG_NOT_SET_ERROR_MSG} from "./env";

describe('environment config', () => {
    it('should throw an error if window runtime config is not set', () => {
        expect(() => require('./env')).toThrow(WINDOW_CONFIG_NOT_SET_ERROR_MSG)
    })

    it('should throw an error if a part of window runtime config is not set', () => {
        window.__env__ = {
            REACT_APP_API_URL: "http://localhost:8000"
        };

        expect(() => require('./env')).toThrowError(WINDOW_CONFIG_MISSING_CONFIG_KEY_MSG('appLoaderUrl'))
    })

    it('should provide a correct env config in development environment', () => {

    })

    it('should provide a correct env config in runtime environment', () => {
        window.__env__ = {
            REACT_APP_API_URL: "http://localhost:8000",
            REACT_APP_APP_LOADER_URL: "http://localhost:3000"
        };

        expect(() => require('./env').env).toEqual(window.__env__)
    })
})