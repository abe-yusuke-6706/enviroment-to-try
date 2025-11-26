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
    // CardBody,
    // CardFooter,
    Heading,
    // Link,
    VStack,
} from "@chakra-ui/react";
// import { usePage } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
// import { StarIcon } from "@chakra-ui/icons";
import Pagination from "@mui/material/Pagination";
import { Link } from "react-router-dom";
import axios from "axios";
import type { Product } from "@/interfaces/product";
// import client from "@/lib/api/client";
// import { getProducts } from "@/lib/api/product";

const Index = () => {
    const [items, setItems] = useState<Product[]>([]);

    // try {
    //     setItems<ProductProps>(awaitgetProducts().data);
    // } catch (error) {
    //     console.log(error);
    // }

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await axios.get(
                    'http://localhost:3000/api/v1/products'
                );
                console.log("resの返却がsuccess");

                // const itemData = res.data.map((responseData: Product) => {
                //     return responseData
                // })
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
                        {/* <Wrap mt="10" spacing={12} justify="center"> */}
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

                                            {/* <Stack mt="6" spacing="3"> */}
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
                                                {/* 五段階評価 */}
                                                {/* <div>
                                                    {Array(5)
                                                        .fill("")
                                                        .map((_, i) => (
                                                            <StarIcon
                                                                key={i}
                                                                w={6}
                                                                h={6}
                                                                color={
                                                                    i <
                                                                        post.rating
                                                                        ? "#ffc107"
                                                                        : "#c4c4c4ff"
                                                                }
                                                            />
                                                        ))}
                                                </div> */}
                                            </Stack>
                                        </Card.Body>
                                        <Card.Footer gap="2">
                                            <Link
                                                to="/login"
                                            // width="full"
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
                    {/* <Card p={3} mt={10} variant="filled" borderRadius="3xl">
                     */}
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
