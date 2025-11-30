import { useState, useEffect } from "react";
import {
    Box,
    Image,
    Button,
    Text,
    Stack,
    HStack,
    Wrap,
    Center,
    WrapItem,
    Card,
    Heading,
    VStack,
} from "@chakra-ui/react";
import MainLayout from "@/Layouts/MainLayout";
// import Pagination from "@mui/material/Pagination";
import { Link } from "react-router-dom";
// import axios from "axios";
import type { CartProduct } from "@/interfaces/product";
import client from "@/lib/api/client";
import { useNavigate } from "react-router-dom";

const Index = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState<CartProduct[]>([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await client.get("cart_items");

                console.log(res);
                setCartItems(res.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchItems();
    }, [])

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        navigate("/cart/confirm", {
            state: {
                cartItems: cartItems,
            }
        })
    }

    return (
        <MainLayout>
            <Center>
                {cartItems.length == 0 ? (
                    <Text>まだ何もカートに追加していません。</Text>
                ) : (
                    <VStack>
                        <HStack w="85%">
                            <Wrap mt="10" justify="center">
                                {cartItems.map((cartItem) => (
                                    <WrapItem key={cartItem.product.id} w="360px">
                                        <Card.Root
                                            key={cartItem.product.id}
                                        >
                                            <Card.Body>
                                                <Box mx="-6" mt="-6">
                                                    {cartItem.product.images[0] ? (
                                                        <Image
                                                            src={cartItem.product.images[0].url}
                                                        />
                                                    ) : (
                                                        <Image src="../nothing_image.png" />
                                                    )}
                                                </Box>

                                                <Stack mt="6" gap="3">
                                                    <Heading size="lg">
                                                        {cartItem.product.name}
                                                    </Heading>
                                                    <Text>在庫：{cartItem.product.stock}個</Text>
                                                    <Text>カート内：{cartItem.quantity}個</Text>
                                                    <Text>支払い料金：{cartItem.product.price * cartItem.quantity}円</Text>
                                                </Stack>
                                            </Card.Body>

                                            <Card.Footer>
                                                <Link to={`/show/${cartItem.product.id}`}>
                                                    <Button>商品ページ</Button>
                                                </Link>
                                            </Card.Footer>
                                        </Card.Root>
                                    </WrapItem>
                                ))}
                            </Wrap>
                        </HStack>
                        <Button
                            variant="solid"
                            onClick={handleSubmit}>
                            確認する
                        </Button>
                    </VStack>
                )}
            </Center>
        </MainLayout>
    );
};

Index.layout = (page: number) => <MainLayout children={page} />;
export default Index;
