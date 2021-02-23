import endpoints from './endpoints'
import { _get, _delete, _post, _patch, _request } from './requestWrappers'

export const get = _get
export const deleteCall = _delete
export const post = _post
export const patch = _patch
export const request = _request

export default {
  endpoints,

  get,
  deleteCall,
  post,
  patch,
  request,
}
