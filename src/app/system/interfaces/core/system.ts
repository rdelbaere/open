export interface System{
    id: number;
    configuration: SystemConfiguration;
}

// TODO - Check this trick (used for updateConfiguration in SystemRuntime)
interface AbstractSystemConfiguration {
    [key: string]: string;
}

export interface SystemConfiguration extends AbstractSystemConfiguration {
    wallpaper: string;
}

export const SystemConstants = {
    wallpaperPath: '/assets/images/system/wallpaper/',
};
