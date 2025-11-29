// サインアップ
export interface SignUpParams {
    name: string
    email: string
    password: string
    password_confirmation: string
}

// ログイン
export interface SignInParams {
  email: string
  password: string
}

export interface LocationAuth {
    name: string
    email: string
}