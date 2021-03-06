/**
 * Augment the typings of Vue.js
 */
import { AxiosStatic } from "axios";

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $http: AxiosStatic;
  }

  export interface App {
    axios: AxiosStatic;
  }
}

declare module "vue/types/vue" {
  interface Vue {
    $http: AxiosStatic;
  }

  interface VueConstructor {
    axios: AxiosStatic;
  }
}
