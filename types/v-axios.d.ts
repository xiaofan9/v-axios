import { AxiosStatic } from "axios";
import { App, PluginFunction } from "vue";

export declare class VAxios {
  static install (app: App, axios?: AxiosStatic): void;
  static install (app: PluginFunction<never>, axios?: AxiosStatic): void;

  static version: string
};