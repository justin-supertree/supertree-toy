import axios from 'axios';

import type {
  NoticeItemRequest,
  NoticeRequest,
  SubmitRequest,
  DeleteRequest,
  NoticeDetailRequest,
} from 'types/notice';

export const baseURL =
  'http://marketplace-test-1.ap-northeast-2.elasticbeanstalk.com';

export const getNotice = ({ type, page }: NoticeRequest) => {
  return axios.get(`${baseURL}/notice?type=${type}&page=${page}`);
};

export const getNoticeDetail = ({ id }: NoticeDetailRequest) => {
  return axios.get(`${baseURL}/notice/detail/${id}`);
};

export const postNoticeInfo = ({
  title,
  content,
  type,
  expireTime,
}: NoticeItemRequest) => {
  return axios.post(`${baseURL}/notice`, {
    title,
    content,
    type,
    expireTime,
  });
};

export const patchSubmit = ({
  id,
  title,
  content,
  type,
  expireTime,
}: SubmitRequest) => {
  return axios.post(`${baseURL}/notice/${id}`, {
    title,
    content,
    type,
    expireTime,
  });
};

export const deleteNotice = ({ id }: DeleteRequest) => {
  return axios.delete(`${baseURL}/notice/${id}`);
};
