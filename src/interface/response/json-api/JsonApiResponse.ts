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

interface JsonApiResponse<Attributes = Data, Included = JsonApiResource> {
    data: Attributes | Attributes[];
    included?: Included[];
    meta?: {
        [key: string]: unknown;
    };
}

export default JsonApiResponse;
