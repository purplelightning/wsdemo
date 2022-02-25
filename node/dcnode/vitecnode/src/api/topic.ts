import instance from "./axios";

import { TopicType, TopicIdType, AddTopicType, HandleFavType } from "@/types/";

export const getTopicList = (params: TopicType) => {
  return instance({
    url: "/topic/list",
    method: "get",
    params,
  });
};

export const getTopicDetail = (params: TopicIdType) => {
  return instance({
    url: "/topic/getDetail",
    method: "get",
    params,
  });
};

export const addTopic = (params: AddTopicType) => {
  return instance({
    url: "/topic/addTopic",
    method: "post",
    data: params,
  });
};

export const updateTopic = (params: AddTopicType) => {
  return instance({
    url: "/topic/updateTopic",
    method: "post",
    data: params,
  });
};

export const deleteTopic = (params: TopicIdType) => {
  return instance({
    url: "/topic/deleteTopic",
    method: "post",
    data: params,
  });
};

export const getCollectionList = () => {
  return instance({
    url: "/collection/list",
    method: "get",
  });
};

export const handleFav = (params: HandleFavType) => {
  return instance({
    url: "/topic/deleteTopic",
    method: "post",
    data: params,
  });
};
