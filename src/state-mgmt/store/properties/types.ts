export const REQUEST_PROPERTIES = "REQUEST_PROPERTIES";
export const REQUEST_PROPERTIES_SUCCESS = "REQUEST_PROPERTIES_SUCCESS";

export interface IGetPropertiesInput {
    readonly currentPage?: number;
    readonly pageSize?: number;
}

export interface IPropertiesState {
    readonly list: Array<IListObject>;
    readonly pagination: IPagination
}

interface IPagination {
    readonly total: number;
    readonly pageSize: number;
    readonly current: number;
}

interface IListObject {
    readonly appId: string;
    readonly id: number;
    readonly key: string;
    readonly name: string;
    readonly type: string;
    readonly value: string;
}
