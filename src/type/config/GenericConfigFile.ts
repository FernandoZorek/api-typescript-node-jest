/**
 * Generic type for config files
 * It contains three attributes to be filled: development, test and production.
 */
type GenericConfigFile<T> = {
    development: T;
    test: T;
    production: T;
};

export default GenericConfigFile;
