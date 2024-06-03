'use client';

import React, { useCallback, useEffect } from 'react';
import { Button, Spinner } from '@nextui-org/react';
import { useIsMobile } from '@nextui-org/use-is-mobile';
import { useSignIn, QRCode } from '@farcaster/auth-kit';
import { StatusAPIResponse } from '@farcaster/auth-client';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { signup } from '@/app/actions/auth';
import { useAuth } from '@/app/providers/auth';

export default function FarcasterQR() {
  const { updateProfile } = useAuth();

  const onSuccessCallback = useCallback(
    async (res: StatusAPIResponse) => {
      await signup({
        message: res.message,
        signature: res.signature,
        nonce: res.nonce,
        domain: window.location.host,
        fid: res.fid,
        address: res.custody,
        username: res.username,
        name: res.displayName,
        avatar: res.pfpUrl,
        bio: res.bio,
        state: res.state,
        verifications: res.verifications,
      });
      await updateProfile();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const isMobile = useIsMobile();
  const signInState = useSignIn({
    onSuccess: onSuccessCallback,
  });
  const {
    signIn,
    connect,
    reconnect,
    isError,
    error,
    channelToken,
    url,
    isConnected,
  } = signInState;

  useEffect(() => {
    if (isConnected) {
      signIn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  useEffect(() => {
    if (url && isMobile) {
      window.location.href = url;
    }
  }, [url, isMobile]);

  useEffect(() => {
    if (!channelToken) {
      connect();
    }
  }, [channelToken, connect]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center py-6">
      {isError ? (
        <>
          <div className="text-lg">Error</div>
          <div className="pb-3">
            {error?.message ?? 'Unknown error, please try again.'}
          </div>
          <Button isIconOnly onClick={reconnect} onPress={reconnect}><ArrowPathIcon className="size-6" /></Button>
        </>
      ) : (
        <>
          <div className="text-lg">Sign in with Farcaster</div>
          <div>Scan with your phone&apos;s camera to continue.</div>
          <div className="mb-3 mt-6 flex justify-center">
            {url ? (
              <QRCode uri={url} size={264} logoSize={22} logoMargin={12} />
            ) : (
              <div className="flex h-[280px] w-[274px] items-center justify-center rounded-xl border border-[#e5e7eb55]">
                <Spinner />
              </div>
            )}
          </div>
          <div className="flex justify-center">
            <a href={url} className="flex items-center gap-2 font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={12}
                height={18}
                fill="none"
              >
                <path
                  fill="#7C65C1"
                  fillRule="evenodd"
                  d="M0 3a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3Zm4-1.5v.75c0 .414.336.75.75.75h2.5A.75.75 0 0 0 8 2.25V1.5h1A1.5 1.5 0 0 1 10.5 3v12A1.5 1.5 0 0 1 9 16.5H3A1.5 1.5 0 0 1 1.5 15V3A1.5 1.5 0 0 1 3 1.5h1Z"
                  clipRule="evenodd"
                />
              </svg>
              <span>I&apos;m using my phone →</span>
            </a>
          </div>
        </>
      )}
    </div>
  );
}
