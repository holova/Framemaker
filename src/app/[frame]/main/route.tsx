import React from 'react';
import { Button } from 'frames.js/next';
import { frames } from '@/app/[frame]/frames';
import { PUBLIC_BASE_URL } from '@/app/constants';

const handleRequest = frames(async () => ({
  image: `${PUBLIC_BASE_URL}/Frame-37.png`,
  buttons: [<Button action="link" target={PUBLIC_BASE_URL}>Create Frame</Button>],
}));

export const GET = handleRequest;

export const POST = handleRequest;
