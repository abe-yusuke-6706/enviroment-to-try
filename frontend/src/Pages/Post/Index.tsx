import { useState } from "react";
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
import MainLayout from "../../Layouts/MainLayout";
// import { StarIcon } from "@chakra-ui/icons";
import Pagination from "@mui/material/Pagination";
import type { ProductProps } from "@/interfaces/post";
import { Link } from "react-router-dom";
import type { ChangeEvent } from "react";

const Index = ({ products }: ProductProps) => {
    const [paginationPage, setPaginationPage] = useState(1);
    // const posts = usePage().props.posts;
    const maxCount = products.length;
    const pageSize = 9;
    const maxPagination = Math.ceil(maxCount / pageSize); //ページネーション最大ページ数

    const startRange = (paginationPage - 1) * pageSize;
    const endRange = startRange + pageSize;
    const visibleItems = products.slice(startRange, endRange); //1ページ内に表示するアイテムを算出

    return (
        <Box>
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
                                                {/* {post.images.length > 0 ? (
                                                    <Image
                                                        w="full"
                                                        h="200px"
                                                        objectFit="cover"
                                                        src={`/storage/${post.images[0].url}`}
                                                        alt={post.name}
                                                    />
                                                ) : (
                                                    <Image
                                                        w="full"
                                                        h="200px"
                                                        src="../nothing_image.png"
                                                    />
                                                )} */}
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
                                                    {product.stock}
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
        </Box>
    );
};

Index.layout = (page: number) => <MainLayout children={page} />;
export default Index;
