import { AxiosStatic } from "axios";
import { App, PluginFunction } from "vue";

export declare function VAxios(app: App, axios?: AxiosStatic): void;

export declare function VAxios(app: PluginFunction<never>, axios?: AxiosStatic): void;
