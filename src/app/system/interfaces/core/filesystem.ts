export interface Filesystem {
    id: string;
    rootDirectory: any;
}

export interface ResourceNode {
    name: string;
    path: string;
    parent: DirectoryNode;
}

export interface DirectoryNode extends ResourceNode {
    childs: ResourceNode[];
}

export interface FileNode extends ResourceNode {
    file: File;
}
