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
    Spacer,
} from "@chakra-ui/react";
import MainLayout from "@/Layouts/MainLayout";
import Pagination from "@mui/material/Pagination";
import { Link } from "react-router-dom";
import type { CartProduct } from "@/interfaces/product.interface";
import client from "@/lib/api/client";

const Index = () => {
    const [orderItems, setOrderItems] = useState<CartProduct[]>([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await client.get("order_items");

                console.log(res);
                setOrderItems(res.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchItems();
    }, [])

    const [paginationPage, setPaginationPage] = useState(1);

    const maxCount = orderItems.length;
    const pageSize = 9;
    const maxPagination = Math.ceil(maxCount / pageSize); //ページネーション最大ページ数

    const startRange = (paginationPage - 1) * pageSize;
    const endRange = startRange + pageSize;
    const visibleItems = orderItems.slice(startRange, endRange); //1ページ内に表示するアイテムを算出

    return (
        <MainLayout>
            <Center>
                {visibleItems.length == 0 ? (
                    <Text>まだ何も購入していません。</Text>
                ) : (
                    <VStack>
                        <HStack w="100%">
                            <Wrap mt="10" justify="center" gap={8}>
                                {visibleItems.map((orderItem, i) => (
                                    <WrapItem key={i+1} w="360px">
                                        <Card.Root>
                                            <Card.Body>
                                                <Box mx="-6" mt="-6">
                                                    {orderItem.product.images[0] ? (
                                                        <Image
                                                            src={orderItem.product.images[0].url}
                                                        />
                                                    ) : (
                                                        <Image src="../nothing_image.png" />
                                                    )}
                                                </Box>

                                                <Stack mt="6" gap="3">
                                                    <Heading size="lg">
                                                        {orderItem.product.name}
                                                    </Heading>
                                                    <Text>在庫：{orderItem.product.stock}個</Text>
                                                    <Text>カート内：{orderItem.quantity}個</Text>
                                                    <Text>支払い料金：{orderItem.product.price * orderItem.quantity}円</Text>
                                                </Stack>
                                            </Card.Body>

                                            <Card.Footer>
                                                <Spacer />
                                                <Link to={`/show/${orderItem.product.id}`}>
                                                    <Button>商品ページ</Button>
                                                </Link>
                                            </Card.Footer>
                                        </Card.Root>
                                    </WrapItem>
                                ))}
                            </Wrap>
                        </HStack>
                        <Card.Root p={3} mt={10} borderRadius="3xl">
                            <Pagination
                                count={maxPagination}
                                variant="outlined"
                                color="primary"
                                onChange={(_e, page: number) => setPaginationPage(page)}
                                page={paginationPage}
                            />
                        </Card.Root>
                    </VStack>
                )}
            </Center>
        </MainLayout>
    );
};

Index.layout = (page: number) => <MainLayout children={page} />;
export default Index;
