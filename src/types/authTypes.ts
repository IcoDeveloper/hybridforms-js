export interface Client {
    id: number;
    title: string;
    remark: string;
    errorMail: string;
    acl: any;
    modified: string;
    modifiedBy: string;
    role: string;
}

export interface RoamingData {
    subscribedFormdefinitions: string[];
}

export interface UserResponse {
    displayName: string;
    accountName: string;
    companyName: string;
    pictureURL?: string;
    id: string;
    firstname: string;
    lastname: string;
    email: string;

    serverApiUrl?: string;
    features: any;

    sigCrypto: string;

    options?: any;
    clients?: Client[];
    roamingData?: RoamingData;
}
