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
import Pagination from "@mui/material/Pagination";
import { Link } from "react-router-dom";
import axios from "axios";
import type { Product } from "@/interfaces/product";

const Index = () => {
    const [items, setItems] = useState<Product[]>([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await axios.get(
                    'http://localhost:3000/api/v1/products'
                );

                setItems(res.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchItems();
    }, [])

    const [paginationPage, setPaginationPage] = useState(1);

    const maxCount = items.length;
    const pageSize = 9;
    const maxPagination = Math.ceil(maxCount / pageSize); //ページネーション最大ページ数

    const startRange = (paginationPage - 1) * pageSize;
    const endRange = startRange + pageSize;
    const visibleItems = items.slice(startRange, endRange); //1ページ内に表示するアイテムを算出

    return (
        <MainLayout>
            <Center>
                <VStack>
                    <HStack w="85%">
                        <Wrap mt="10" justify="center">
                            {visibleItems.map((product) => (
                                <WrapItem key={product.id} w="360px">
                                    <Card.Root
                                        key={product.id}
                                        overflow="hidden"
                                        height="580px"
                                        width="400px"
                                    >
                                        <Card.Body gap="2">
                                            <Box mx="-6" mt="-6">
                                                {product.images[0] ? (
                                                    <Image
                                                        w="full"
                                                        h="200px"
                                                        objectFit="cover"
                                                        src={product.images[0].url}
                                                    />
                                                ) : (
                                                    <Image
                                                        w="full"
                                                        h="200px"
                                                        src="../nothing_image.png"
                                                    />
                                                )}
                                            </Box>

                                            <Stack mt="6" gap="3">
                                                <Heading size="lg">
                                                    {product.name}
                                                </Heading>
                                                <Text className="line-clamp-2">
                                                    {product.description}
                                                </Text>
                                                <Text
                                                    textStyle="2xl"
                                                    fontWeight="medium"
                                                    letterSpacing="tight"
                                                    mt="2"
                                                >
                                                    {product.stock}個
                                                </Text>
                                                <Text
                                                    textStyle="2xl"
                                                    fontWeight="medium"
                                                    letterSpacing="tight"
                                                    mt="2"
                                                >
                                                    {product.price}
                                                </Text>
                                            </Stack>
                                        </Card.Body>
                                        <Card.Footer gap="2">
                                            <Link
                                                to={`/show/${product.id}`}
                                            >
                                                <Button
                                                    variant="solid"
                                                    width="full"
                                                >
                                                    投稿を見る
                                                </Button>
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
            </Center>
        </MainLayout>
    );
};

Index.layout = (page: number) => <MainLayout children={page} />;
export default Index;
