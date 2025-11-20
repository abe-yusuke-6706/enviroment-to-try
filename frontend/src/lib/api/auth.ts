// import Cookies from "js-cookie";
import client from "./client";

import type { SignInParams, SignUpParams } from "@/interfaces/auth";

export const signUp = (params :SignUpParams) => {
    return client.post("auth", params);
}

export const signIn = (params :SignInParams) => {
    return client.post("auth/sign_in", params);
}