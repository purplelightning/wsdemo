import instance from "./axios";

import {
  TopicType,
  TopicIdType,
  AddTopicType,
  UpdateTopicType,
  HandleFavType,
  AddReplyType,
} from "@/types/";

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

export const updateTopic = (params: UpdateTopicType) => {
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
    url: "/collection/handleFav",
    method: "post",
    data: params,
  });
};

export const addReply = (params: AddReplyType) => {
  return instance({
    url: "/topic/addReply",
    method: "post",
    data: params,
  });
};
