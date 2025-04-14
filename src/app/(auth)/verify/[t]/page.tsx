import authApi from '@/api/auth';
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import RefreshVerify from './_components/RefreshVerify';

type Props = {
    params: Promise<{
        t: string;
    }>;
    searchParams: Promise<{
        email: string;
    }>;
};

const PageVerify = async ({ params, searchParams }: Props) => {
    const { t } = await params;
    const { email } = await searchParams;
    const res = await authApi.verifyHandleApi(t);
    return (
        <div className='max-w-screen-sm mx-auto my-16 px-6'>
            {res ? (
                <div>
                    <Alert>
                        <AlertTitle className='text-base'>Xác minh tài khoản thành công !</AlertTitle>
                        <AlertDescription>
                            Bạn đã xác minh tài khoản thành công. Vui lòng đăng nhập để tiếp tục.
                        </AlertDescription>
                    </Alert>
                    <div className='flex justify-center mt-6'>
                        <Link href={'/login'}>
                            <Button variant='outline' className='w-full cursor-pointer py-3 h-auto'>
                                Đăng nhập ngay
                            </Button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div>
                    <Alert>
                        <AlertTitle className='text-base'>Xác minh tài khoản thất bại !</AlertTitle>
                        <AlertDescription>
                            Không thể xác minh tài khoản của bạn. Vui lòng kiểm tra lại mã xác minh hoặc liên hệ với
                            quản trị viên để được hỗ trợ.
                        </AlertDescription>
                    </Alert>
                    <RefreshVerify email={email} />
                </div>
            )}
        </div>
    );
};

export default PageVerify;
