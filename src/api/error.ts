export const isInstanceOfResponseError = (
  object: unknown,
): object is ResponseError => {
  return (
    object instanceof ResponseError &&
    'status' in object &&
    'message' in object &&
    'data' in object
  );
};

export class ResponseError extends Error {
  status = -1;
  message = '';
  data = null;
}
