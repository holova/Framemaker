'use server';

import { redirect } from 'next/navigation';
import { Hex } from 'viem';
import { deleteSession, createSession } from '@/app/lib/session';
import navigation from '@/app/lib/navigation';

export type AuthProfile = {
  fid?: number;
  address?: string;
  username?: string;
  name?: string;
  avatar?: string;
  bio?: string;
  role: string;
};

export type SignInData = {
  state: 'pending' | 'completed';
  nonce: string;
  domain: string;
  message?: string;
  signature?: `0x${string}`;
  fid?: number;
  username?: string;
  bio?: string;
  name?: string;
  avatar?: string;
  verifications?: Hex[] | string[];
  address?: Hex;
};

export async function signup(data: SignInData) {
  await createSession(data);
  redirect(navigation.DASHBOARD);
}

export async function logout() {
  await deleteSession();
  redirect(navigation.LOGIN);
}
