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
  id?: string;
  title: string;
  tab: string;
  content: string;
  author: string;
  avatarImg: string;
}

export interface UpdateTopicType {
  id?: string;
  title: string;
  tab: string;
  content: string;
}

export interface HandleFavType {
  topicId: string;
  title: string;
}

export interface AuthorType {
  name: string;
  avatarImg?: string;
  avatarUrl?: string;
}
export interface AddReplyType {
  id: string;
  content: string;
  replyId?: string;
  author: AuthorType;
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
  phone: string | null;
}

export interface ReplyItemType {
  author: AuthorType;
  content: string;
  createTime: string;
  id: string;
  replyId: string;
  ups: number;
}

export interface ReplyItemHandledType extends ReplyItemType {
  getHandled?: boolean | undefined;
}
export interface TopicItemType {
  author: AuthorType;
  content: string;
  createTime: string;
  lastReplyAt: string;
  replyCount: number;
  replyList?: ReplyItemType[];
  tab: string;
  title: string;
  top: boolean;
  visitCount: number;
}

export interface CollectionItemType {
  author: AuthorType;
  _id?: string;
  title?: string;
  collectTopicId?: string;
  topicTitle?: string;
}
