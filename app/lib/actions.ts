// import { signIn } from '@/auth';
// import { AuthError } from 'next-auth';
 
// // ...
 
// export async function authenticate(
//   prevState: string | undefined,
//   formData: FormData,
// ) {
//   try {
//     await signIn('credentials', formData);
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case 'CredentialsSignin':
//           return 'Invalid credentials.';
//         default:
//           return 'Something went wrong.';
//       }
//     }
//     throw error;
//   }
// }

import { signIn } from 'next-auth/react'; // 使用 next-auth/react 中的 signIn
import { AuthError } from 'next-auth';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false, // 禁止自动重定向，手动处理错误
    });

    if (res?.error) {
      if (res.error === 'CredentialsSignin') {
        return 'Invalid credentials.';
      }
      return 'Something went wrong.';
    }

    return 'Authenticated successfully.';
  } catch (error) {
    // 捕获其他非 next-auth 抛出的错误
    throw error;
  }
}
