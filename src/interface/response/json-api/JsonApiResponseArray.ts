import JsonApiResource from './JsonApiResource';
/**
 * Custom Type for JSON Api responses.
 */

interface Data extends JsonApiResource {
    relationship?: {
        [key: string]: {
            data: { type: string; id: string }[];
        };
    };
}

interface JsonApiResponseArray<Attributes = Data, Included = JsonApiResource> {
    links?: {
        self: string;
    };
    data: Attributes[];
    included?: Included[];
    meta?: {
        [key: string]: unknown;
    };
}

export default JsonApiResponseArray;
