export type NoticeItemRequest = {
  noticeId: number;
  content: string;
  dateCreate: string;
  expireTime: string;
  title: string;
  type: string;
};

export type NoticeGetData = {
  title: string;
  page: number;
};
