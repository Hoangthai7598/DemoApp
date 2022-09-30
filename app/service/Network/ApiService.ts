import axios from "axios";

const createAPI = () => {
  const APIInstant = axios.create({
    baseURL: 'https://dummyapi.io/data/v1/',
    timeout: 3000,
    headers: { 'app-id': '633410c907616a25b76ff87c' }
  });
  return APIInstant;
}
const createAPINoKey = () => {
  const APIInstant = axios.create({
    baseURL: 'https://dummyapi.io/data/v1/',
    timeout: 3000
  });
  return APIInstant;
}

const instance = createAPI();
const instanceNoKey = createAPINoKey();


function handleResult<T>(api: Promise<T>) {
  return api.then((res: any) => {
    return handleResponse<T>(res)
  }).catch(async (error: any) => {
    return handleResponse<T>(error);
  });
}

function handleResponse<T>(data: any) {
  if (data.status !== 200) {
    return Promise.reject(data);
  }
  return Promise.resolve(data.data)
}

export const ApiClient = {
  get: (url: string, payload: Object) =>
    handleResult(instance.get(url, payload)),
  post: (url: string, payload: object) =>
    handleResult(instance.post(url, payload)),
  put: (url: string, payload: object) =>
    handleResult(instance.put(url, payload)),
  path: (url: string, payload: object) =>
    handleResult(instance.patch(url, payload)),
  delete: (url: string, payload: object) =>
    handleResult(instance.delete(url, { data: payload })),
}
export const ApiClientNoKey = {
  get: (url: string, payload: Object) =>
    handleResult(instanceNoKey.get(url, payload)),
  post: (url: string, payload: object) =>
    handleResult(instanceNoKey.post(url, payload)),
  put: (url: string, payload: object) =>
    handleResult(instanceNoKey.put(url, payload)),
  path: (url: string, payload: object) =>
    handleResult(instanceNoKey.patch(url, payload)),
  delete: (url: string, payload: object) =>
    handleResult(instanceNoKey.delete(url, { data: payload })),
}