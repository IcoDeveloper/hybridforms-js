interface ACL {
    id: number;
    title: string;
    upn: string;
    email: null | string;
    isGroup: boolean;
}

interface Area {
    id: number;
    clientId: number;
    title: string;
    modified: string;
    modifiedBy: string;
}

interface Info {
    version: string;
    date: string;
    minAppVersion: string;
    minServerVersion: string;
    conditionsOnRender: boolean;
}

interface ServerFile {
    filename: string;
    size: number;
    contentType: string;
    modified: string;
    version: number;
    fileID: number;
    isReachoutExcluded: boolean;
}

interface StageDefinition {
    stages: Stages;
}

interface Stages {
    [key: string]: Stage;
}

interface StateChanges {
    [status: string]: {
        workflows: string[];
    };
}

interface StageNextItem {
    workflows: string[];
    stage?: string;
    buttonLabel?: string;
    dialogTitle?: string;
    dialogMessage?: string;
}

interface Stage {
    key: string;
    label: string;
    first: boolean;
    next: StageNextItem;
    appKioskMode: boolean;
    stateChanges: StateChanges;
    expiry: any[];
}

export interface FormDefinitionResponse {
    id: number;
    formID: string;
    version: number;
    title: string;
    description: string;
    culture: string;
    archiveDays: null;
    approvedSyncDays: number;
    deleteDays: number;
    deleteEditDays: null;
    deleteGroupDays: null;
    purgeDeletedDays: number;
    files: ServerFile[];
    flags: { [key: string]: boolean };
    created: string;
    createdBy: string;
    modified: string;
    modifiedBy: string;
    areaId: number;
    useACL: ACL[];
    editACL: ACL[];
    adminACL: ACL[];
    readonlyACL: ACL[];
    role: string;
    isExtendedReader: boolean;
    area: Area;
    subtitle: string;
    info: Info;
    isReachout: boolean;
    reachoutUrl: string;
    mayUse: boolean;
    stageDefinition: StageDefinition;
}

export interface GroupResponse {
    id: number;
    title: string;
    upn: string;
    email: string;
    isGroup: boolean;
    address: string;
    company: string;
    logoUrl: string;
}
