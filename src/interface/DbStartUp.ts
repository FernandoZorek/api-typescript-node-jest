interface DbStartUp {
    open(): Promise<void>;
    close(): Promise<void>;
}

export default DbStartUp;
