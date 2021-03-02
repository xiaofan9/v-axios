/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AxiosStatic, AxiosInstance, AxiosRequestConfig } from "axios";

interface result {
  <T>(data: T, opt?: AxiosRequestConfig): Promise<any>;
}

export declare function request(url: string, method: string): result;

export declare function get(url: string): result;

export declare const axios: AxiosStatic;

export declare function post(url: string): result;

export type CAxiosResult = {
  request: typeof request;
  get: typeof get;
  post: typeof post;
  axios: AxiosStatic;
};

export interface install {
  (app: any, axios?: AxiosStatic | AxiosInstance): void;
}

export declare const version: string;

export declare function cAxios(config?: AxiosRequestConfig): CAxiosResult;

export declare class VAxios {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static install: install;

  static version: typeof version;
}
