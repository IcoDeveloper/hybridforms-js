export const getUrl = (
    url: string,
    baseUrl: string,
    params?: URLSearchParams
): string => {
    const urlInstance = new URL(url, baseUrl);
    if (params) {
        urlInstance.search = params.toString();
    }
    return urlInstance.toString();
};

export const paramsFromObject = (obj: {
    [key: string]: any;
}): URLSearchParams => {
    const params = new URLSearchParams();
    Object.keys(obj).forEach((key) => {
        params.append(key, obj[key]);
    });
    return params;
};
