/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AxiosStatic, AxiosInstance, AxiosRequestConfig } from "axios";
import { axios } from "../src";

interface result {
  <T>(data: T, opt: AxiosRequestConfig): Promise<any>;
}

export interface request {
  (url: string, method: string): result;
}
export interface get {
  (url: string): request;
}

export type axios = AxiosStatic;

export interface post {
  (url: string): request;
}

export type CAxiosResult = {
  request: request;
  get: get;
  post: post;
  axios: AxiosStatic;
};

export interface install {
  (app: any, axios?: AxiosStatic | AxiosInstance): void;
}

export type version = string;

export declare function cAxios(config?: AxiosRequestConfig): CAxiosResult;

export declare class VAxios {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static install: install;

  static version: version;
}
