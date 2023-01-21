import { SystemRuntime } from "../../services/system.runtime";

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
    theme: string;
}

export class DefaultSystemConfiguration implements SystemConfiguration {
    wallpaper = 'rocket.jpg';
    theme = 'dark';
    [key: string]: string;
}

export const SystemConstants = {
    wallpaperPath: '/assets/images/system/wallpaper/',
    themeClassPrefix: 'theme-system-',
};
