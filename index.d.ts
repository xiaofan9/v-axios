import { PluginFunction } from "vue";
import { AxiosStatic } from "axios";

declare module "vue/types/vue" {
  interface Vue {
    $http: AxiosStatic;
  }

  interface VueConstructor {
    axios: AxiosStatic;
  }
}

declare class VueAxios {
  static install: PluginFunction<AxiosStatic>;
}

export default VueAxios;