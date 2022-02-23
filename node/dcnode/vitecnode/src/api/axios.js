import axios from "axios";

const pendingMap = new Map();

const devBaseUrl = "http://127.0.0.1:3301";
const proBaseUrl = "http://118.31.246.131:2009/";

import errorHandle from "./statusHandle";

import { createLoading } from "../store/globalLoading";
const LoadingObj = createLoading();
const LoadingInstance = {
  _count: 0,
};

function myAxios(axiosConfig, additionalOption) {
  const service = axios.create({
    baseURL: devBaseUrl,
    timeout: 10000,
  });

  const customOptions = Object.assign(
    {
      repeatRequestCancel: true, //是否开启取消重复请求，默认开启
      loading: false, // 是否开启全局loading
      errorMessageShow: true, // 是否开启接口错误信息展示，默认为true
    },
    additionalOption
  );

  service.interceptors.request.use(
    (config) => {
      removePending(config);
      customOptions.repeatRequestCancel && addPending(config);
      // 创建loading实例
      if (customOptions.loading) {
        LoadingInstance._count++;
        if (LoadingInstance._count === 1) {
          LoadingObj.setLoading(true);
        }
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  service.interceptors.response.use(
    (response) => {
      removePending(response.config);
      customOptions.loading && closeLoading(customOptions); // 关闭loading
      return response;
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
function getPendingKey(config) {
  let { url, method, params, data } = config;
  if (typeof data === "string") data = JSON.parse(data); // response里面返回的config.data是个字符串对象
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join("&");
}

/**
 * 储存每个请求唯一值, 也就是cancel()方法, 用于取消请求
 * @param {*} config
 */
function addPending(config) {
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
function removePending(config) {
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
function closeLoading(_options) {
  if (_options.loading && LoadingInstance._count > 0) {
    LoadingInstance._count--;
  }
  if (LoadingInstance._count <= 0) {
    LoadingObj.setLoading(false);
  }
}

export default myAxios;
