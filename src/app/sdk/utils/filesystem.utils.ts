import { Directory, Filesystem, Resource } from "../../system/interfaces/core/filesystem";

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

    static refreshDirectory(filesystem: Filesystem, directory: Directory): Directory {
        const path = directory.path.split('/');
        let selectedDirectory = filesystem.rootDirectory;

        while (path.length > 0) {
            const subpath = path.shift();
            for (const child of selectedDirectory.childs) {
                if (subpath == child.name) {
                    selectedDirectory = child;
                }
            }
        }

        return selectedDirectory;
    }
}
