// サインアップ
export interface SignUpParams {
    name: string
    email: string
    password: string
    password_confirmation: string
}

// export interface csrfToken {
//     csrf_token: string;
// }

// ログイン
export interface SignInParams {
  email: string
  password: string
}