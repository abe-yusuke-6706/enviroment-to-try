import Checkbox from "@/components/Checkbox";
import InputLabel from "@/components/InputLabel";
import TextInput from "@/components/TextInput";
import MainLayout from "@/Layouts/MainLayout";
import { useState } from "react";
import type { SignInParams } from "@/interfaces/auth";
import { Button, Box, Card, Image, Spacer, Center } from "@chakra-ui/react";
import { signIn } from "@/lib/api/auth";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/App";
import client from "@/lib/api/client";

export default function Edit() {
    const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)

    const navigate = useNavigate()

    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const formData = new FormData;

    useEffect(() => {
        const fetchItems = async () => {

            try {
                const res = await client.get("auth/validate_token", {
                    headers: {
                        "access-token": Cookies.get("_access_token"),
                        client: Cookies.get("_client"),
                        uid: Cookies.get("_uid"),
                    },
                });

                console.log(res.data.data);

                setName(res.data.data.name);
                console.log(name);
                setEmail(res.data.data.email);
            } catch (error) {
                console.log(error);
            }
        }

        fetchItems();
    }, [])

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        formData.append("product[name]", name);
        formData.append("product[price]", email);

        navigate("/auth/profile/edit")
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
            <Center>
                <Card.Root maxW="sm" w="full">
                    <Center mt={5}>
                        <Image
                            src="https://bit.ly/naruto-sage"
                            boxSize="150px"
                            borderRadius="full"
                            fit="cover"
                            alt="Naruto Uzumaki"
                        />
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

                    {/* <Center> */}
                    <Card.Footer gap="2">
                        <Button
                            variant="ghost"
                            onClick={handleSubmit}
                        >
                            戻る
                        </Button>
                        <Spacer />
                        <Button variant="solid">編集</Button>
                    </Card.Footer>
                    {/* </Center> */}
                </Card.Root>
            </Center>
        </MainLayout>
    );
}
