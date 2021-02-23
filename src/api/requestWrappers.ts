import axios from 'axios'

const BASE_URL = 'https://europe-west1-winery-app-b819d.cloudfunctions.net/api'

type MethodType =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'purge'
  | 'PURGE'
  | 'link'
  | 'LINK'
  | 'unlink'
  | 'UNLINK'
  | undefined

const request = async (method: MethodType, url: string, payload?: any) => {
  const token = localStorage.FBIdToken
  try {
    return axios({
      method,
      url: `${BASE_URL}${url}`,
      data: payload,
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json;  charset=UTF-8',
        'Cache-Control': 'no-cache',
      },
    }).catch((err) => {
      console.log('test1', err)
      if (axios.isCancel(err)) {
        err.cancelled = true
      }
      throw err
    })
  } catch (e) {
    console.log('test2', e)
    console.error(e)
  }
}
export const _request = request
export const _get = (url: string) => request('GET', url)
export const _delete = (url: string) => request('DELETE', url)
export const _post = (url: string, payload: any) =>
  request('POST', url, payload)
export const _patch = (url: string, payload: any) =>
  request('PATCH', url, payload)
