interface JsonApiResource {
    type: string;
    id: string | number | null;
    attributes: {
        [key: string]: unknown;
    };
}

export default JsonApiResource;
