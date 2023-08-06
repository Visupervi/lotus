import { HttpStatus } from '@nestjs/common';
export interface ResponseParams {
  code?: number;
  message?: string;
  data?: any;
  error?: any;
}
const ResponseUtil = (params: ResponseParams) => {
  params.code = params.code || HttpStatus.OK;
  params.message = params.message || 'ok';
  return params;
};
export default ResponseUtil;
