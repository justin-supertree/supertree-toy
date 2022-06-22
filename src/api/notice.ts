import axios from 'axios';

import type { NoticeItemRequest, NoticeRequest } from 'types/notice';

export const baseURL =
  'http://marketplace-test-1.ap-northeast-2.elasticbeanstalk.com';

export const getNotice = ({ type, page }: NoticeRequest) => {
  return axios.get(`${baseURL}/notice?type=${type}&page=${page}`);
};

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
