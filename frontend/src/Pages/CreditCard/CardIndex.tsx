import { useState, useEffect } from "react";
import {
    Image,
    Button,
    Text,
    Stack,
    HStack,
    Center,
    Card,
    Flex,
    VStack,
    Spacer,
    Badge,
} from "@chakra-ui/react";
import MainLayout from "@/Layouts/MainLayout";
import { useNavigate } from "react-router-dom";
import client from "@/lib/api/client";
import type { ShowCreditCard } from "@/interfaces/creditCard.interface";

const CardIndex = () => {
    const [cards, setCards] = useState<ShowCreditCard[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                await client.get("credit_cards").then((res) => {
                    const creditCards = res.data.creditCards.map((creditCard: any) => ({
                        brand: creditCard.brand,
                        last4: Number(creditCard.last4),
                        expYear: creditCard.expYear,
                        expMonth: creditCard.expMonth,
                    }))

                    setCards(creditCards);
                });
            } catch (error) {
                console.log(error);
            }
        }

        fetchItems();
    }, [])

    return (
        <MainLayout>
            <Center>
                {cards.length == 0 ? (
                    <VStack>
                        <Text>クレジットカードが登録されていません。</Text>
                        <HStack w="100%">
                            <Button
                                mt={5}
                                variant="solid"
                                onClick={() => navigate(-1)}>
                                戻る
                            </Button>
                            <Spacer />
                            <Button
                                mt={5}
                                variant="solid"
                                onClick={() => navigate("/card/register")}>
                                カードを登録する
                            </Button>
                        </HStack>
                    </VStack>
                ) : (
                    <Flex mt="10" justify="center">
                        <VStack w="100%" gap={8}>
                            {cards.map((card, i) => (
                                <Card.Root
                                    maxW="600px"
                                    minH="200px"
                                    flexDirection="row"
                                    overflow="hidden"
                                    w="100%"
                                    key={i + 1}
                                >
                                    <Image
                                        objectFit="cover"
                                        maxW="200px"
                                        src={`/${card.brand}.png`}
                                        alt="Caffe Latte"
                                    />
                                    <Card.Body>
                                        <Card.Title mb="2">{card.brand}</Card.Title>
                                        <Card.Description>
                                            番号：***********{card.last4}
                                        </Card.Description>
                                        <HStack mt="4">
                                            期限：
                                            <Badge>{card.expMonth}</Badge>
                                            <Text>/</Text>
                                            <Badge>{card.expYear}</Badge>
                                        </HStack>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Stack>
                                            <Button size="sm">削除する</Button>
                                            <Button size="sm">支払先に指定する</Button>
                                        </Stack>
                                    </Card.Footer>
                                </Card.Root>
                            ))}
                            <HStack w="100%">
                                <Button
                                    mt={5}
                                    variant="solid"
                                    onClick={() => navigate(-1)}>
                                    戻る
                                </Button>
                                <Spacer />
                                <Button
                                    mt={5}
                                    variant="solid"
                                    onClick={() => navigate("/card/register")}>
                                    カードを登録する
                                </Button>
                            </HStack>
                        </VStack>
                    </Flex>
                )}
            </Center>
        </MainLayout>
    );
};

CardIndex.layout = (page: number) => <MainLayout children={page} />;
export default CardIndex;
