import { getPayload, getSession } from '@/app/lib/session';
import type { AuthProfile } from '@/app/actions/auth';
import { API_BASE_URL } from '@/app/constants';

// eslint-disable-next-line import/prefer-default-export
export async function GET() {
  const session = await getSession();
  const payload = await getPayload();

  if (!payload || !session) {
    return Response.json({ profile: null, token: null });
  }

  const res = await fetch(`${API_BASE_URL}/users/me`, {
    headers: {
      Authorization: session,
    },
  });
  const data = await res.json();

  const profile: AuthProfile = {
    fid: payload.fid,
    address: payload.address,
    username: payload.username,
    name: payload.name,
    avatar: payload.avatar,
    bio: payload.bio,
    role: data.role || 'client',
  };

  return Response.json({ profile, token: session });
}
