// axios配置项类型
export interface AdditionOptionType {
  repeatRequestCancel?: boolean;
  loading?: boolean;
  reductDataFormat?: boolean;
  errorMessageShow?: boolean;
  codeMessageShow?: boolean;
}

export interface TokenType {
  accesstoken: string;
}

export interface LoginType {
  username: string;
  password: string;
}

export interface TopicType {
  tab: string;
  page: number;
  pageSize: number;
}

export interface TopicIdType {
  id: string;
}

export interface AddTopicType {
  title: string;
  tab: string;
  content: string;
  author: string;
  avatarImg: string;
}

export interface HandleFavType {
  topicId: string;
  title: string;
}

/*
 *  ----------------------------------------------
 *  前端类型
 */

export interface LoginParamType {
  id: string;
  loginName: string;
  avatarImg: string;
  token: string;
}
