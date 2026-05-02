import { refreshTokenApi } from './authAPI';

export async function apiFetch(url, options = {}) {
  const token = localStorage.getItem('accessToken');

  const makeRequest = (t) =>
    fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${t}`,
        ...options.headers,
      },
    });

  let res = await makeRequest(token);

  if (res.status === 401) {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const data = await refreshTokenApi(refreshToken);

      if (data.status !== 'success') throw new Error();

      localStorage.setItem('accessToken', data.data.accessToken);
      res = await makeRequest(data.data.accessToken);
    } catch {
      localStorage.clear();
      window.location.href = '/auth';
    }
  }

  return res;
}