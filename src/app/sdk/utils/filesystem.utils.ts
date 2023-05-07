import { DirectoryNode, Filesystem, ResourceNode } from "../../system/interfaces/core/filesystem";

export class FilesystemUtils {
    static isDirectory(resource: ResourceNode): boolean {
        return 'childs' in resource;
    }

    static getPathAsArray(resource: ResourceNode): ResourceNode[] {
        const path = [resource];

        while (resource.parent){
            resource = resource.parent;
            path.unshift(resource);
        }

        return path;
    }

    static restoreTree(directory: DirectoryNode) {
        for (const child of directory.childs) {
            child.parent = directory;
            if (this.isDirectory(child)) {
                this.restoreTree(child as DirectoryNode);
            }
        }
    }

    static refreshDirectory(filesystem: Filesystem, directory: DirectoryNode): DirectoryNode {
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
