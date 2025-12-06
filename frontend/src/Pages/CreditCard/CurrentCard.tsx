import MainLayout from "@/Layouts/MainLayout";
import { useState } from "react";
import { Button, Box, Card, Image, Spacer, Center } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import client from "@/lib/api/client";
import { useEffect } from "react";

export default function CurrentCard() {
    const navigate = useNavigate()

    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")

    useEffect(() => {
        const fetchItems = async () => {

            try {
                const res = await client.get("auth/validate_token");
                const resAvatar = await client.get("auth/avatar");

                setAvatarUrl(resAvatar.data.avatarUrl);
                setName(res.data.name);
                setEmail(res.data.email);
            } catch (error) {
                console.log(error);
            }
        }

        fetchItems();
    }, [])

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        navigate("/auth/profile/edit",
            {
                state: {
                    name: name,
                    email: email,
                }
            }
        )
    }

    return (
        <MainLayout>
            <Center>
                <Card.Root maxW="sm" w="full">
                    <Center mt={5}>
                        {avatarUrl ?
                            (
                                <Image
                                    src={avatarUrl?.toString()}
                                    boxSize="150px"
                                    borderRadius="full"
                                    fit="cover"
                                    alt="Naruto Uzumaki"
                                />
                            ) : (
                                <Image
                                    src="../user_icon.png"
                                    boxSize="150px"
                                    borderRadius="full"
                                    fit="cover"
                                    alt="Naruto Uzumaki"
                                />
                            )}
                    </Center>
                    <Card.Body gap="5">
                        <Center>
                            <Box>
                                <Card.Description>
                                    名前
                                </Card.Description>
                                <Card.Title>{name}</Card.Title>
                            </Box>
                        </Center>
                        <Center>
                            <Box>
                                <Card.Description>
                                    メールアドレス
                                </Card.Description>
                                <Card.Title>{email}</Card.Title>
                            </Box>
                        </Center>
                        <Center>
                            <Box>
                                <Card.Description>
                                    パスワード
                                </Card.Description>
                                <Card.Title>********</Card.Title>
                            </Box>
                        </Center>
                    </Card.Body>

                    <Card.Footer gap="2">
                        <Button variant="ghost" onClick={() => navigate(-1)}>
                            戻る
                        </Button>
                        <Spacer />
                        <Button
                            variant="solid"
                            onClick={handleSubmit}
                        >
                            編集
                        </Button>
                    </Card.Footer>
                </Card.Root>
            </Center>
        </MainLayout>
    );
}
