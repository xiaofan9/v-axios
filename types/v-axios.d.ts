/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AxiosStatic, AxiosRequestConfig, Method } from "axios";

declare interface GetRes {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <T = any>(params?: T, opt?: AxiosRequestConfig): Promise<any>;
}

declare interface PostRes {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <T = any>(data?: T, opt?: AxiosRequestConfig): Promise<any>;
}

export type CAxiosResult = {
  request: (url: string, method: Method) => GetRes | PostRes;
  get: (url: string) => GetRes;
  post: (url: string) => PostRes;
  axios: AxiosStatic;
};

export declare const version: string;

export declare const axios: AxiosStatic;

export declare function cAxios(
  config?: AxiosRequestConfig & { cancelRepeat: boolean },
  axios?: AxiosStatic
): CAxiosResult;

export declare class VAxios {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static install: (app: any, axios?: AxiosStatic) => void;

  static version: typeof version;
}
