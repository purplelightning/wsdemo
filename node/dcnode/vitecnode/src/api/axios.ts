/*
  序列化参数
  取消重复请求
  全局loading
  携带token
  错误码处理
  TODO 根据jwt拦截路由跳转，loading优化
*/

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { AdditionOptionType } from "@/types";
import { ElLoading, ElMessage } from "element-plus";

const pendingMap = new Map();

const devBaseUrl = "http://127.0.0.1:3301";
const proBaseUrl = "http://118.31.246.131:2009/";

export const baseUrl = proBaseUrl;

import errorHandle from "./statusHandle";

import { useUserStore } from "../store/user";

interface LoadingType {
  _target: any;
  _count: number;
}

const LoadingInstance: LoadingType = {
  _target: null, // 保存Loading实例
  _count: 0,
};

function myAxios(
  axiosConfig: AxiosRequestConfig,
  additionalOption?: AdditionOptionType
) {
  const service = axios.create({
    baseURL: proBaseUrl,
    timeout: 10000,
  });

  const customOptions = Object.assign(
    {
      repeatRequestCancel: true, //是否开启取消重复请求，默认开启
      loading: true, // 是否开启全局loading
      reductDataFormat: true, // 是否开启简洁的数据结构响应, 默认为true
      errorMessageShow: true, // 是否开启接口错误信息展示，默认为true
      codeMessageShow: true, // 是否开启status为0时的信息提示, 默认为true
    },
    additionalOption
  );

  service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const user = useUserStore(); // 在用到的地方再引入，否则胡彪错
      const token = user.token;
      if (token && typeof window !== "undefined") {
        config.headers.Authorization = token;
      }
      removePending(config);
      customOptions.repeatRequestCancel && addPending(config);
      // 创建loading实例
      if (customOptions.loading) {
        LoadingInstance._count++;
        if (LoadingInstance._count === 1) {
          LoadingInstance._target = ElLoading.service();
        }
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  service.interceptors.response.use(
    (response: AxiosResponse) => {
      removePending(response.config);
      customOptions.loading && closeLoading(customOptions); // 关闭loading
      if (
        // 接口获取成功，给出错误返回，与后端约定
        customOptions.codeMessageShow &&
        response.data &&
        response.data.status === 0
      ) {
        ElMessage.error(response.data.error);
        return Promise.reject(response.data); // status等于0, 页面具体逻辑就不执行了
      }
      return customOptions.reductDataFormat ? response.data : response;
    },
    (err) => {
      err.config && removePending(err.config);
      customOptions.errorMessageShow && errorHandle(err); // 处理错误状态码
      customOptions.loading && closeLoading(customOptions);
      return Promise.reject(err);
    }
  );

  return service(axiosConfig);
}

// 取消重复请求
/**
 * 生成每个请求唯一的键
 * @param {*} config
 * @returns string
 */
function getPendingKey(config: AxiosRequestConfig) {
  const { url, method, params } = config;
  let data = config.data;
  if (typeof data === "string") data = JSON.parse(data); // response里面返回的config.data是个字符串对象
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join("&");
}

/**
 * 储存每个请求唯一值, 也就是cancel()方法, 用于取消请求
 * @param {*} config
 */
function addPending(config: AxiosRequestConfig) {
  const pendingKey = getPendingKey(config);
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingMap.has(pendingKey)) {
        pendingMap.set(pendingKey, cancel);
      }
    });
}

// axios.js
/**
 * 删除重复的请求
 * @param {*} config
 */
function removePending(config: AxiosRequestConfig) {
  const pendingKey = getPendingKey(config);
  if (pendingMap.has(pendingKey)) {
    const cancelToken = pendingMap.get(pendingKey);
    cancelToken(pendingKey);
    pendingMap.delete(pendingKey);
  }
}

/**
 * 关闭Loading层实例
 * @param {*} _options
 */
function closeLoading(_options: AdditionOptionType) {
  if (_options.loading && LoadingInstance._count > 0) {
    LoadingInstance._count--;
  }
  if (LoadingInstance._count <= 0) {
    setTimeout(() => {
      LoadingInstance._target.close();
      LoadingInstance._target = null;
    });
  }
}

export default myAxios;
