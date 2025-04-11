import { z } from 'zod';

export const formSchema = z.object({
    email: z.string().email({
        message: 'Email không hợp lệ'
    }),
    password: z.string().min(1, {
        message: 'Mật khẩu không được để trống'
    })
});

export type FormSchema = z.infer<typeof formSchema>;
export type FormSchemaKey = keyof FormSchema;
export const defaultLogin = {
    email: '',
    password: ''
};

// register
export const formSchemaRegister = z
    .object({
        email: z.string().email({
            message: 'Email không hợp lệ'
        }),
        password: z.string().min(1, {
            message: 'Mật khẩu không được để trống'
        }),
        confirmPassword: z.string().min(1, {
            message: 'Xác nhận mật khẩu không được để trống'
        })
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Mật khẩu không khớp',
        path: ['confirmPassword']
    });

export type FormSchemaRegister = z.infer<typeof formSchemaRegister>;
export type FormSchemaRegisterKey = keyof FormSchemaRegister;
export const defaultRegister = {
    email: '',
    password: '',
    confirmPassword: ''
};
