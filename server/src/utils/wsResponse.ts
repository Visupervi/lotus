export interface WsResponseParams<T = any> {
  status?: boolean;
  data?: T;
  message?: string;
}
const WsResponseUtil = (params: WsResponseParams) => {
  params.status = params.status != undefined ? params.status : true;
  params.message = params.message != undefined ? params.message : 'ok';
  return params;
};
export default WsResponseUtil;
