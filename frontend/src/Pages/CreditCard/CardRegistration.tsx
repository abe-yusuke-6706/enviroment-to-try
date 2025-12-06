import MainLayout from "@/Layouts/MainLayout";
import { useEffect, useState, useRef } from "react";
// import type { SignUpParams } from "@/interfaces/auth.interface";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
// import { signUp } from "@/lib/api/auth";
import type { CreditCard } from "@/interfaces/creditCard.interface";
import {
    Input,
    Button,
    Field,
    Stack,
    Card,
    Center,
    Spacer,
} from "@chakra-ui/react";
import client from "@/lib/api/client";

export default function CardRegistration() {

    const [number, setNumber] = useState<number>(0)
    const [deadline, setDeadline] = useState<number>(0)
    const [securityCode, setSecurityCode] = useState<number>(0)

    const payjpRef = useRef<any>(null);
    const cardElementRef = useRef<any>(null);
    const isInitialized = useRef(false);

    const navigate = useNavigate();
    useEffect(() => {
        if (isInitialized.current) return;
        isInitialized.current = true;

        const payjp = (window as any).Payjp('pk_test_d6df2c454b6ce99332d7d871');
        const elements = payjp.elements();
        const cardElement = elements.create('card');

        cardElement.mount("#credit-card-form");

        payjpRef.current = payjp;
        cardElementRef.current = cardElement;
    }, [])

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        // const formData: CreditCard = {
        //     number: number,
        //     deadline: deadline,
        //     securityCode: securityCode,
        // }

        try {
            // const res = await client.post("credit_cards", formData);
            // console.log(res)
            payjpRef.current.createToken(cardElementRef.current)
                .then(async (result: any) => {
                    const cardToken = result.id;
                    const res = await client.post("credit_cards", {
                        credit_card: { card_token: cardToken }
                    });
                    console.log(res);
                })
                .catch((err: any) => {
                    console.log("err:", err);
                });
            // if (res.status === 200) {

            //     Cookies.set("_access_token", res.headers["access-token"])
            //     Cookies.set("_client", res.headers["client"])
            //     Cookies.set("_uid", res.headers["uid"])

            //     navigate("/");
            // }
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <MainLayout>
            <Center>
                <Card.Root maxW="2xl" w="full">
                    <Card.Header>
                        <Card.Title>クレジットカード登録</Card.Title>
                        <Card.Description>
                            下記にカード情報を入力してください。
                        </Card.Description>
                    </Card.Header>
                    <Card.Body id="credit-card-form">
                        <Stack gap="4" w="full">
                            <Field.Root>
                                <Field.Label>カード番号</Field.Label>
                                <Input name="number"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setNumber(Number(e.target.value))
                                    }
                                    required />
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>有効期限</Field.Label>
                                <Input name="deadline"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setDeadline(Number(e.target.value))
                                    }
                                    required />
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>セキュリティコード</Field.Label>
                                <Input name="security-code"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setSecurityCode(Number(e.target.value))
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
