export interface QueryParamsObject {
    [key: string]: string | boolean;
}

export function objectToQueryString(obj: QueryParamsObject): string {
    const params = new URLSearchParams();
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            params.append(key, String(obj[key]));
        }
    }
    return params.toString();
}
