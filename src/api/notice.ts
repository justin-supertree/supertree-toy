import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import type { NoticeItemRequest } from 'types/notice';

export const postNoticeInfo = ({
  title,
  content,
  type,
  expireTime,
}: NoticeItemRequest) =>
  axios.post('/notice', {
    title,
    content,
    type,
    expireTime,
  });
