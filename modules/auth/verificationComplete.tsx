import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import VerificationLayout from './component/verificationLayout';
import useAuthMutation from '../../hooks/Auth/useAuthMutation';
import { verifyUser } from '../../http/auth';
import { useRouter } from 'next/router';
import { notify } from '@ui/Toast';
import isAuthenticated from '../../helpers/isAuthenticated';
import { useAuth } from '../../context/AuthContext';

function VerificationComplete() {
  const router = useRouter();
  const { token } = router.query;
  const { handleAuth } = useAuth();

  console.log(token);

  const { mutate, isLoading, isSuccess } = useAuthMutation(verifyUser, {
    onSuccess: (response) => {
      console.log(response);

      console.log(isSuccess);

      if (response.status === 200) {
        handleAuth(response);
        localStorage.setItem('zpt', response?.data?.newtoken);

        router.push('/dashboard');
        return;
      }
    },
    onError: ({ response }: any) => {
      // console.log(response.data);

      if (response.data.message) {
        notify({ message: response.data.message, type: 'error' });
        router.push('/auth/verification');
        return;
      }
    },
  });

  const verifyQuery = async () => {
    if (token) {
      mutate({ token: token as any });
    }
  };

  useEffect(() => {
    try {
      verifyQuery();
    } catch (error) {
      console.log(error);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [token]);

  return (
    <VerificationLayout>
      {isSuccess && (
        <>
          <Image
            className="w-[218px] h-[159px] xl:w-[218px] xl:h-[218px] mx-auto mt-16 md:mt-16 lg:"
            src="/assets/images/verification-complete.svg"
            alt=""
            width={218}
            height={218}
          />
          <div className=" sm:bg-brand-green-ttr px-4 max-w-[712px] sm:px-[40px] md:px-[58px] lg:px-[120px] py-5 sm:border sm:border-brand-disabled rounded-[32px] z-10">
            <h1 className=" font-manropeEB text-[24px] md:text-[36px] text-center">Verification Complete</h1>
            <p className=" font-manropeL text-[16px] text-center text-[#737876] md:text-[#000] py-[16px] ">
              Account verification complete. You will be redirected to a login page.
            </p>
          </div>
        </>
      )}

      {isLoading && (
        <div className=" sm:bg-brand-green-ttr px-4 max-w-[712px] sm:px-[40px] md:px-[58px] lg:px-[120px] py-5 sm:border sm:border-brand-disabled rounded-[32px] z-10">
          <div className="w-16 h-16 border-t-4 border-[#009254] border-solid rounded-full animate-spin"></div>
        </div>
      )}
    </VerificationLayout>
  );
}

export default VerificationComplete;
function handleAuth(data: any) {
  throw new Error('Function not implemented.');
}
