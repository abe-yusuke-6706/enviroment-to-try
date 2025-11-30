import {
    Box,
    Button,
    Text,
    Center,
    Card,
    Heading,
    VStack,
    Portal,
    Spacer,
    Dialog,
    CloseButton,
} from "@chakra-ui/react";
import MainLayout from "@/Layouts/MainLayout";
import client from "@/lib/api/client";
import { useNavigate } from "react-router-dom";
import type { LocationCartProduct } from "@/interfaces/product";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Confirm = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const { cartItems } = location.state as LocationCartProduct;
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        const total = cartItems.reduce((sum, item) => {
            return sum + item.product.price * item.quantity;
        }, 0);

        setTotalPrice(total);
    }, [cartItems]);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const formData = new FormData();

        cartItems.forEach((cartItem, i) => {
            formData.append(`order_items[${i}][product_id]`, cartItem.product.id.toString());
            formData.append(`order_items[${i}][price]`, cartItem.product.price.toString());
            formData.append(`order_items[${i}][quantity]`, cartItem.quantity.toString());
        });

        try {
            const res = await client.post("/order_items", formData);

            console.log(res);
            navigate("/cart/index")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <MainLayout>
            <Center>
                <Card.Root width="400px">
                    <Card.Body gap="2">
                        <Center>
                            <VStack gap={3}>
                                <Card.Title mt="2">注文内容確認</Card.Title>
                                <Text> ======================= </Text>
                                {cartItems.map((cartItem) => (
                                    // <WrapItem key={cartItem.product.id} w="360px">
                                    <Box>
                                        <Card.Description
                                            key={cartItem.product.id}
                                        >
                                            <Text>商品名：{cartItem.product.name}</Text>
                                            <Text>カート：{cartItem.quantity}個</Text>
                                            <Text>支払い料金：{cartItem.product.price * cartItem.quantity}円</Text>
                                        </Card.Description>
                                        <Text> ======================= </Text>
                                    </Box>
                                ))}
                                <Box my={5}>
                                    <Center>
                                        <VStack>
                                            <Heading>合計金額：{totalPrice}円</Heading>
                                            <Card.Description>お届け先：○○○-○○○○ 未来県過去町hoge 1234</Card.Description>
                                        </VStack>
                                    </Center>
                                </Box>
                            </VStack>
                        </Center>
                    </Card.Body>
                    <Card.Footer justifyContent="flex-end">
                        <Button variant="outline" onClick={() => navigate(-1)}>戻る</Button>
                        <Spacer />
                        <Dialog.Root>
                            <Dialog.Trigger asChild>
                                <Button variant="solid">購入する</Button>
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
                                                購入を確定します。
                                            </p>
                                        </Dialog.Body>
                                        <Dialog.Footer>
                                            <Dialog.ActionTrigger asChild>
                                                <Button variant="solid">キャンセル</Button>
                                            </Dialog.ActionTrigger>
                                            <Button onClick={handleSubmit}>
                                                購入する
                                            </Button>
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
};

Confirm.layout = (page: number) => <MainLayout children={page} />;
export default Confirm;
