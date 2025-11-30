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
    Portal,
    Dialog,
    CloseButton,
} from "@chakra-ui/react";
import MainLayout from "@/Layouts/MainLayout";
import { Link } from "react-router-dom";
import client from "@/lib/api/client";
import { useNavigate } from "react-router-dom";
import type { LocationCartProduct } from "@/interfaces/product";
import { useLocation } from "react-router-dom";

const Confirm = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const { cartItems } = location.state as LocationCartProduct;

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
                </VStack>
            </Center>
        </MainLayout>
    );
};

Confirm.layout = (page: number) => <MainLayout children={page} />;
export default Confirm;
