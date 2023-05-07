export class NativeFileUtils {
    static guessExtension(file: File): string
    {
        return file.name.split(".").pop() ?? '';
    }

    static removeExtension(file: File): string
    {
        const parts = file.name.split('.');
        parts.pop();
        return parts.join('.');
    }
}
