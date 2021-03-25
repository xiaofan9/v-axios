/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AxiosStatic, AxiosRequestConfig, Method } from "axios";

declare interface result {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <T = any>(data?: T, opt?: AxiosRequestConfig): Promise<any>;
}

declare function request(url: string, method: Method): result;

declare function get(url: string): result;

declare function post(url: string): result;

export type CAxiosResult = {
  request: typeof request;
  get: typeof get;
  post: typeof post;
  axios: AxiosStatic;
};

export declare interface install {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (app: any, axios?: AxiosStatic): void;
}

export declare const version: string;

export declare const axios: AxiosStatic;

export declare function cAxios(
  config?: AxiosRequestConfig & { cancelRepeat: boolean },
  axios?: AxiosStatic
): CAxiosResult;

export declare class VAxios {
  static install: install;

  static version: typeof version;
}
