import Checkbox from "@/components/Checkbox";
import InputLabel from "@/components/InputLabel";
import TextInput from "@/components/TextInput";
import MainLayout from "@/Layouts/MainLayout";
import { useState, useContext } from "react";
import type { SignInParams } from "@/interfaces/auth";
import { Button } from "@chakra-ui/react";
import { signIn } from "@/lib/api/auth";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthContext } from "@/App";

export default function Login({ status }: { status?: string }) {
    const navigate = useNavigate()
    const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [remember, setRemember] = useState<boolean>(false)

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const formData: SignInParams = {
                email: email,
                password: password,
            }

            const res = await signIn(formData);

            if (res.status == 200) {
                Cookies.set("_access_token", res.headers["access-token"])
                Cookies.set("_client", res.headers["client"])
                Cookies.set("_uid", res.headers["uid"])

                setIsSignedIn(true)
                setCurrentUser(res.data.data)
            
                navigate("/")
            } else {
                console.log("failed login")
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <MainLayout>
            <div className="flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0">
                <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">

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
                            />

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
