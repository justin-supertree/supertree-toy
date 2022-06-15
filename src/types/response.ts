type ResponseResult<ResponseData> = {
  status: number;
  message: string | null;
  data: ResponseData | null;
};

export default ResponseResult;
