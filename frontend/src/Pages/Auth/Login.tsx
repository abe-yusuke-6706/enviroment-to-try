import Checkbox from "@/components/Checkbox";
// import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
// import PrimaryButton from "@/components/PrimaryButton";
import TextInput from "@/components/TextInput";
// import GuestLayout from '@/Layouts/GuestLayout';
import MainLayout from "@/Layouts/MainLayout";
// import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
// interface LoginProps {
//     status?: string,
// }
// import type { focusRefProps } from "@/components/TextInput";
import type { SignInParams } from "@/interfaces/auth";
import { Button } from "@chakra-ui/react";
import { signIn } from "@/lib/api/auth";
import { useNavigate } from "react-router-dom";

export default function Login({ status }: { status?: string }) {
    // const { data, setData, post, processing, errors, reset } = useForm({
    //     email: "",
    //     password: "",
    //     remember: false,
    // });

    const navigate = useNavigate()

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [remember, setRemember] = useState<boolean>(false)

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const formData: SignInParams = {
                email: email,
                password: password,
                remember: remember,
            }

            const res = await signIn(formData);
            console.log(res)

            if (res.status == 200) {
                navigate("/test")
            } else {
                console.log("ログイン失敗")
            }

        } catch (err) {
            console.log(err);
        }
    }

    // const submit = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();

    //     // post(route("login"), {
    //     //     onFinish: () => reset("password"),
    //     // });
    // };

    // const emailRef = useRef<focusRefProps>(null);

    return (
        <MainLayout>
            <div className="flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0">
                <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                    {/* <Head title="ログイン" /> */}

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}

                    <form>
                        <div>
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
                                isFocused={true}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setEmail(e.target.value)
                                }
                            // ref={emailRef}
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
                                autoComplete="current-password"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setPassword(e.target.value)
                                }
                            />

                            {/* <InputError
                                message={errors.password}
                                className="mt-2"
                            /> */}
                        </div>

                        <div className="mt-4 block">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={remember}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setRemember(e.target.checked)
                                    }
                                />
                                <span className="ms-2 text-sm text-gray-600">
                                    Remember me
                                </span>
                            </label>
                        </div>

                        <div className="mt-4 flex items-center justify-end">

                            <Button
                                className="ms-4"
                                onClick={handleSubmit}
                            // disabled={processing}
                            >
                                ログイン
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
}
