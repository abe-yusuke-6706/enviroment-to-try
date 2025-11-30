import MainLayout from "@/Layouts/MainLayout";
import { useState, useContext } from "react";
import type { SignInParams } from "@/interfaces/auth";
import { signIn } from "@/lib/api/auth";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthContext } from "@/App";
import {
    Input,
    Button,
    Field,
    Stack,
    Card,
    Center,
    Spacer,
} from "@chakra-ui/react";

export default function Login() {
    const navigate = useNavigate()
    const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

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
            <Center>
                <Card.Root maxW="2xl" w="full">
                    <Card.Header>
                        <Card.Title>ログイン画面</Card.Title>
                        <Card.Description>
                            下記にユーザー情報を入力してください。
                        </Card.Description>
                    </Card.Header>
                    <Card.Body>
                        <Stack gap="4" w="full">
                            <Field.Root>
                                <Field.Label>メールアドレス</Field.Label>
                                <Input name="email"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setEmail(e.target.value)
                                    }
                                    required />
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>パスワード</Field.Label>
                                <Input name="password"
                                    type="password"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setPassword(e.target.value)
                                    }
                                    required />
                            </Field.Root>
                        </Stack>
                    </Card.Body>
                    <Card.Footer justifyContent="flex-end">
                        <Button variant="outline" onClick={() => navigate(-1)}>キャンセル</Button>
                        <Spacer />
                        <Button
                            variant="solid"
                            onClick={handleSubmit}>
                            ログイン
                        </Button>
                    </Card.Footer>
                </Card.Root>
            </Center>
        </MainLayout>
    );
}
