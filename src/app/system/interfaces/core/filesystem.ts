export interface Filesystem {
    id: string;
    rootDirectory: any;
}

export interface Resource {
    name: string;
    path: string;
    parent: Directory;
}

export interface Directory extends Resource {
    childs: Resource[];
}
