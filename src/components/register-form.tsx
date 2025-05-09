'use client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { defaultRegister, formSchemaRegister, FormSchemaRegister } from '@/schema/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { registerHandle } from '@/action/auth';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function RegisterForm({ className, ...props }: React.ComponentProps<'div'>) {
    const form = useForm<FormSchemaRegister>({
        resolver: zodResolver(formSchemaRegister),
        defaultValues: defaultRegister
    });

    const register = useMutation({
        mutationFn: (data: FormSchemaRegister) => registerHandle(data.email, data.password),
        onSuccess: (data) => {
            toast(data.message);
        },
        onError: (error) => toast(error.message)
    });
    const onSubmit = (values: FormSchemaRegister) => register.mutate(values);
    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            {register.isSuccess && (
                <Alert>
                    <AlertDescription>
                        Vui kiểm tra email của bạn để xác minh tài khoản. Nếu không thấy email, hãy kiểm tra thư mục
                        spam hoặc thư rác của bạn.
                    </AlertDescription>
                </Alert>
            )}
            <Card className='overflow-hidden p-0 shadow-none'>
                <CardContent className='grid p-0'>
                    <Form {...form}>
                        <form className='p-6 md:p-8' onSubmit={form.handleSubmit(onSubmit)}>
                            <div className='flex flex-col gap-6'>
                                <div className='flex flex-col items-center text-center mb-2'>
                                    <h1 className='text-2xl font-bold'>Đăng ký tài khoản</h1>
                                </div>
                                <div className='grid gap-3'>
                                    <FormField
                                        control={form.control}
                                        name='email'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor='email'>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        id='email'
                                                        type='email'
                                                        placeholder='m@example.com'
                                                        required
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='grid gap-3'>
                                    <FormField
                                        control={form.control}
                                        name='password'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor='password'>Mật khẩu</FormLabel>
                                                <FormControl>
                                                    <Input id='password' type='password' required {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='grid gap-3'>
                                    <FormField
                                        control={form.control}
                                        name='confirmPassword'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor='confirmPassword'>Xác nhận mật khẩu</FormLabel>
                                                <FormControl>
                                                    <Input id='confirmPassword' type='password' required {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Button type='submit' className='w-full cursor-pointer' disabled={register.isPending}>
                                    {register.isPending && <Loader className='ml-2 h-4 w-4 animate-spin' />}
                                    {register.isPending ? 'Đang xử lý...' : 'Đăng ký'}
                                </Button>
                                <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
                                    <span className='bg-card text-muted-foreground relative z-10 px-2'>
                                        Hoặc tiếp tục với
                                    </span>
                                </div>
                                <div className='grid gap-4'>
                                    <Button variant='outline' type='button' className='w-full'>
                                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                                            <path
                                                d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
                                                fill='currentColor'
                                            />
                                        </svg>
                                        <span>Đăng ký với Google</span>
                                    </Button>
                                </div>
                                <div className='text-center text-sm'>
                                    Đã có tài khoản?{' '}
                                    <Link href='/login' className='underline underline-offset-4'>
                                        Đăng nhập
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <div className='text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4'>
                Bằng cách nhấp vào tiếp tục, bạn đồng ý với <a href='#'>Điều khoản dịch vụ</a> and{' '}
                <a href='#'>Chính sách bảo mật</a> của chúng tôi.
            </div>
        </div>
    );
}
