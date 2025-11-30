import MainLayout from "@/Layouts/MainLayout";
import { useState } from "react";
import { Button, FileUpload, Card, Dialog, CloseButton, Portal, Center, Field, Input, Stack } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import client from "@/lib/api/client";
import type { LocationAuth } from "@/interfaces/auth";
import { HiUpload } from "react-icons/hi";

export default function Profile() {
    const navigate = useNavigate()
    const location = useLocation();
    const { name, email } = location.state as LocationAuth;

    const [avatar, setAvatar] = useState<File[] | null>(null);
    const [updateName, setUpdateName] = useState<string>(name);
    const [updateEmail, setUpdateEmail] = useState<string>(email);
    const [password, setPassword] = useState<string>("")
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")

    const formData = new FormData;

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        const fetchItems = async () => {

            formData.append("name", updateName);
            formData.append("email", updateEmail);
            if (password) formData.append("password", password);
            if (passwordConfirmation) formData.append("password_confirmation", passwordConfirmation);

            if (avatar) {
                formData.append("avatar", avatar[0]);
            };

            try {
                await client.put("auth",
                    formData,
                    {
                        headers: {
                            "Accept": "application/json",
                        }
                    }
                );

                navigate("/auth/profile");
            } catch (error) {
                console.log(error);
            }
        }

        fetchItems();
    }

    return (
        <MainLayout>
            <Center>
                <Card.Root maxW="sm" w="full">
                    <Card.Header>
                        <Card.Title>プロフィール編集画面</Card.Title>
                        <Card.Description>
                            プロフィールを更新出来ます。
                        </Card.Description>
                    </Card.Header>
                    <Card.Body>
                        <Stack gap="4" w="full">
                            <Field.Root>
                                <FileUpload.Root maxFiles={5}>
                                    <FileUpload.HiddenInput
                                        onChange={(e) => {
                                            const files: FileList | null = e.target.files;
                                            if (!files) return;

                                            const fileArray = Array.from(files);

                                            console.log(fileArray);
                                            setAvatar(Array.from(files));
                                        }} />
                                    <FileUpload.Trigger asChild>
                                        <Button variant="outline" size="sm">
                                            <HiUpload /> ファイルアップロード
                                        </Button>
                                    </FileUpload.Trigger>
                                    <FileUpload.List showSize clearable />
                                </FileUpload.Root>
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>名前</Field.Label>
                                <Input
                                    value={updateName}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setUpdateName(e.target.value)} />
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>メールアドレス</Field.Label>
                                <Input
                                    value={updateEmail}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setUpdateEmail(e.target.value)} />
                            </Field.Root>
                            <Field.Root>
                                <Field.Label htmlFor="password">
                                    パスワード
                                </Field.Label>
                                <Input
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
                            </Field.Root>

                            <Field.Root>
                                <Field.Label htmlFor="password_confirmation">
                                    パスワード確認用
                                </Field.Label>
                                <Input
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
                            </Field.Root>
                        </Stack>
                    </Card.Body>
                    <Card.Footer justifyContent="flex-end">
                        <Button variant="outline" onClick={() => navigate(-1)}>キャンセル</Button>
                        <Dialog.Root>
                            <Dialog.Trigger asChild>
                                <Button variant="solid">送信</Button>
                            </Dialog.Trigger>
                            <Portal>
                                <Dialog.Backdrop />
                                <Dialog.Positioner>
                                    <Dialog.Content>
                                        <Dialog.Header>
                                            <Dialog.Title>確認</Dialog.Title>
                                        </Dialog.Header>
                                        <Dialog.Body>
                                            <p>
                                                この内容でプロフィールを更新します。
                                            </p>
                                        </Dialog.Body>
                                        <Dialog.Footer>
                                            <Dialog.ActionTrigger asChild>
                                                <Button variant="outline">キャンセル</Button>
                                            </Dialog.ActionTrigger>
                                            <Button onClick={handleSubmit}>送信</Button>
                                        </Dialog.Footer>
                                        <Dialog.CloseTrigger asChild>
                                            <CloseButton size="sm" />
                                        </Dialog.CloseTrigger>
                                    </Dialog.Content>
                                </Dialog.Positioner>
                            </Portal>
                        </Dialog.Root>
                    </Card.Footer>
                </Card.Root>
            </Center>
        </MainLayout>
    );
}
