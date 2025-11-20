import Checkbox from "@/components/Checkbox";
import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import PrimaryButton from "@/components/PrimaryButton";
import TextInput from "@/components/TextInput";
// import GuestLayout from '@/Layouts/GuestLayout';
import MainLayout from "@/Layouts/MainLayout";
// import { Head, Link, useForm } from "@inertiajs/react";
import { useState, useRef } from "react";
// interface LoginProps {
//     status?: string,
// }
import type { focusRefProps } from "@/components/TextInput";

export default function Login({ status }: { status?: string }) {
    // const { data, setData, post, processing, errors, reset } = useForm({
    //     email: "",
    //     password: "",
    //     remember: false,
    // });

    interface formDataInterface {
        email: string,
        password: string,
        remember: boolean
    }

    const [data, setData] = useState<formDataInterface>({
        email: "",
        password: "",
        remember: false,
    })

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // post(route("login"), {
        //     onFinish: () => reset("password"),
        // });
    };

    const emailRef = useRef<focusRefProps>(null);

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

                    <form onSubmit={submit}>
                        <div>
                            <InputLabel
                                htmlFor="email"
                                value="メールアドレス"
                            />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setData((data) => ({ ...data, remember: e.target.checked })
                                )}
                                ref={emailRef}
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
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setData((data) => ({ ...data, remember: e.target.checked })
                                )}
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
                                    checked={data.remember}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setData((data) => ({ ...data, remember: e.target.checked })
                                        )}
                                />
                                <span className="ms-2 text-sm text-gray-600">
                                    Remember me
                                </span>
                            </label>
                        </div>

                        <div className="mt-4 flex items-center justify-end">

                            <PrimaryButton
                                className="ms-4"
                            // disabled={processing}
                            >
                                ログイン
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
}
