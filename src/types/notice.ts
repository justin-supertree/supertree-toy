export type NoticeItemRequest = {
  content: string;
  expireTime: string;
  title: string;
  type?: string;
};

export type SubmitRequest = {
  id: number;
  content?: string;
  expireTime?: string;
  title?: string;
  type: string;
};

export type DeleteRequest = {
  id: number;
};

export type NoticeGetData = {
  title: string;
  page: number;
};

export type NoticeRequest = {
  type: string;
  page: number;
};

export type NoticeDetailRequest = {
  id: number;
};
