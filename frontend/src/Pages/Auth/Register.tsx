// import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
// import PrimaryButton from "@/components/PrimaryButton";
import TextInput from "@/components/TextInput";
// import { Head, Link, useForm, usePage, router } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
// import GetCSRFToken from "@/Features/csrf";
import { useState, } from "react";
// import GuestLayout from "@/Layouts/GuestLayout";
import type { SignUpParams } from "@/interfaces/auth";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { signUp } from "@/lib/api/auth";

export default function Register() {
    // const { csrf_token } = usePage<csrfToken>().props;
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        const formData: SignUpParams = {
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation,
        }

        try {
            const res = await signUp(formData)
            console.log(res)

            if (res.status === 200) {

                Cookies.set("_access_token", res.headers["access-token"])
                Cookies.set("_client", res.headers["client"])
                Cookies.set("_uid", res.headers["uid"])

                console.log("ユーザー登録完了")
            } else {
                console.log("ユーザー登録失敗")
            }
        } catch (err) {
            console.log(err)
        }

    }

    // const submit = (e: React.FormEvent<HTMLFormElement>) => {
    //     // e.preventDefault();
    //     // console.log(csrf_token);

    //     // post(route("register"), {
    //     //     ...data,
    //     //     _token: csrf_token,
    //     //     onFinish: () => reset("password", "password_confirmation"),
    //     // });
    // };

    return (
        <MainLayout>
            <div className="flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0">
                <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                    {/* <Head title="Register" /> */}

                    <form>
                        <div>
                            <InputLabel htmlFor="name" value="名前" />

                            <TextInput
                                id="name"
                                name="name"
                                value={name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setName(e.target.value)}
                                required
                            />

                            {/* <InputError
                                message={errors.name}
                                className="mt-2"
                            /> */}
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="email"
                                value="メールアドレス"
                            />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setEmail(e.target.value)}
                                required
                            />

                            {/* <InputError
                                message={errors.email}
                                className="mt-2"
                            /> */}
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="パスワード" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={password}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setPassword(e.target.value)}
                                required
                            />

                            {/* <InputError
                                message={errors.password}
                                className="mt-2"
                            /> */}
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="パスワード確認用"
                            />

                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={passwordConfirmation}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setPasswordConfirmation(e.target.value)}
                                required
                            />

                            {/* <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            /> */}
                        </div>

                        <div className="mt-4 flex items-center justify-end">
                            <Link
                                // href=""
                                to="/login"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                すでに登録済みですか？
                            </Link>

                            <Button
                                className="ms-4"
                                onClick={handleSubmit}
                            // disabled={processing}
                            >
                                登録
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
}
