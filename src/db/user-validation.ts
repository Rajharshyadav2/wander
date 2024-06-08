import {z} from 'zod';

export const userValidationSchema = z.object({
  userName: z
    .string()
    .min(3, {message: 'should contain at least 3 characters'})
    .max(16, {message: 'should not exceed 16 characters'}),

  userEmail: z.string().email({
    message: 'invalid email address format',
  }),

  userPassword: z
    .string()
    .min(8, {message: 'password length should be at least 8 characters'})
    .max(100, {message: 'should not contain more than 100 characters'})
    .refine((value) => /[a-z]/.test(value), {
      message: 'must contain at least one lowercase letter',
    })
    .refine((value) => /[A-Z]/.test(value), {
      message: 'must contain at least one uppercase letter',
    })
    .refine((value) => /\d/.test(value), {
      message: 'must contain at least one number',
    })
    .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
      message: 'must contain at least one special character',
    }),
});

export type UserFormData = z.infer<typeof userValidationSchema>;

const partialUserValidations = userValidationSchema.extend({
  userName: userValidationSchema.shape.userName.optional(),
});

export type PartialUsersFormData = z.infer<typeof partialUserValidations>;
