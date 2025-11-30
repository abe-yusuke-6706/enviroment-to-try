import InputLabel from "@/components/InputLabel";
import TextInput from "@/components/TextInput";
import MainLayout from "@/Layouts/MainLayout";
import { useState, } from "react";
import type { SignUpParams } from "@/interfaces/auth";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { signUp } from "@/lib/api/auth";
import {
    Input,
    Button,
    Field,
    Stack,
    Card,
    Center,
    Spacer,
} from "@chakra-ui/react";

export default function Register() {

    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")

    const navigate = useNavigate();

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

                navigate("/");
            }
        } catch (err) {
            console.log(err)
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
                                <Field.Label>名前</Field.Label>
                                <Input name="name"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setName(e.target.value)
                                    }
                                    required />
                            </Field.Root>
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
                            <Field.Root>
                                <Field.Label>パスワード確認用</Field.Label>
                                <Input
                                    name="password_confirmation"
                                    type="password"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setPasswordConfirmation(e.target.value)
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
