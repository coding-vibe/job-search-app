import authAPIClient from '@/api/authAPI';

export default async function checkAuth(accessToken?: string) {
  if (accessToken) {
    try {
      await authAPIClient.post('/auth/verify', null, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      return true;
    } catch {}
  }

  return false;
}
