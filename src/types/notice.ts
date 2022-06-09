export type NoticeItemRequest = {
  title: string;
  content: string;
  type: string;
  expireTime: string;
};

export type NoticeGetData = {
  title: string;
  page: number;
};
