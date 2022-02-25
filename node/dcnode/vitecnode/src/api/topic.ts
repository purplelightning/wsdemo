import instance from "./axios.js";

import { TopicType } from "@/types/";

export const getTopicList = (params: TopicType) => {
  return instance({
    url: "/topic/list",
    method: get,
  });
};
