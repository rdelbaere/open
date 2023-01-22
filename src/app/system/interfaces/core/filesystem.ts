export interface Filesystem {
    id: string;
    rootDirectory: any;
}

export interface Resource {
    name: string;
    path: string;
    parent: Resource;
}

export interface Directory extends Resource {
    childs: Array<Resource>
}
