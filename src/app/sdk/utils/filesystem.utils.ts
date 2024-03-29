import { Directory, Resource } from "../../system/interfaces/core/filesystem";

export class FilesystemUtils {
    static isDirectory(resource: Resource): boolean {
        return 'childs' in resource;
    }

    static getPathAsArray(resource: Resource): Resource[] {
        const path = [resource];

        while (resource.parent){
            resource = resource.parent;
            path.unshift(resource);
        }

        return path;
    }

    static restoreTree(directory: Directory) {
        for (const child of directory.childs) {
            child.parent = directory;
            if (this.isDirectory(child)) {
                this.restoreTree(child as Directory);
            }
        }
    }
}
