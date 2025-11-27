import { useEffect, useState } from "react";
import {
    Box,
    Image,
    // Button,
    Text,
    Stack,
    Center,
    // Flex,
    Card,
    Heading,
    // Input,
    // FormControl,
    // FormLabel,
} from "@chakra-ui/react";
import MainLayout from "../../Layouts/MainLayout";
// import { StarIcon } from "@chakra-ui/icons";
// import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
// src/@types/swiper-css.d.ts
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import axios from "axios";
import type { Product, ProductImage } from "@/interfaces/product";
import { useParams } from "react-router-dom";

// const Show = ({ post, comments, isLiked, likes, images }) => {
const Show = () => {
    // const arrayComments = comments.slice();

    // const {
    //     data,
    //     setData,
    //     delete: destroy,
    //     post: submit,
    // } = useForm({
    //     comment: "",
    //     post_id: post.id,
    // });
    const params = useParams();
    console.log(params);
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchItems = async () => {

            try {
                const res = await axios.get(
                    `http://localhost:3000/api/v1/products/${params.id}`
                );
                console.log(res.data);

                // const itemData = res.data.map((responseData: Product) => {
                //     return responseData
                // })
                setProduct(res.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchItems();
    }, [])

    return (
        <MainLayout>
            <Center>
                <Card.Root overflow="hidden" w="65%" mt={10} mb={10}>
                    <Card.Body>
                        <Stack mt="6" pl={5}>
                            {/* スライド画像 */}
                            <Box w="100%" maxW="100%">
                                <Swiper
                                    style={{ width: "100%" }}
                                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                                    spaceBetween={50}
                                    slidesPerView={1}
                                >
                                    {product?.images?.map((image: ProductImage) => (
                                        <SwiperSlide key={image.id}>
                                            <Box w="100%">
                                                <Image
                                                    w="full"
                                                    h="400px"
                                                    bg="black"
                                                    objectFit="contain"
                                                    src={image.url}
                                                />
                                            </Box>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </Box>


                            {/* タイトル＆説明 */}
                            {/* <Stack mt="6" pl={5} spacing="3"> */}
                            <Heading size="lg">{product?.name}</Heading>
                            <Text className="line-clamp-2">
                                {product?.description}
                            </Text>
                            <Text
                                textStyle="2xl"
                                fontWeight="medium"
                                letterSpacing="tight"
                                mt="2"
                            >
                                {product?.price}
                            </Text>

                            {/* <Flex> */}
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
                                                    i < post.rating
                                                        ? "#ffc107"
                                                        : "#c4c4c4ff"
                                                }
                                            />
                                        ))}
                                </div> */}

                            {/* いいね機能 */}
                            {/* {isLiked ? (
                                    <Flex ml={5}>
                                        <MdFavorite
                                            size={30}
                                            color="red"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                destroy(
                                                    route("post.unlike", post),
                                                    { method: "delete" }
                                                );
                                            }}
                                            cursor={"pointer"}
                                        />
                                        <span>{likes}</span>
                                    </Flex>
                                ) : (
                                    <Flex ml={5}>
                                        <MdFavoriteBorder
                                            size={30}
                                            color="red"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                submit(
                                                    route("post.like", post)
                                                );
                                            }}
                                            cursor={"pointer"}
                                        />
                                        <span>{likes}</span>
                                    </Flex>
                                )}
                            </Flex> */}

                            {/* コメント */}
                            {/* <Box mb={5} mt={5}>
                                <form onSubmit={onSubmit}>
                                    <FormControl>
                                        <FormLabel htmlFor="restaurant_name">
                                            コメント
                                        </FormLabel>
                                        <Flex>
                                            <Input
                                                id="restaurant_name"
                                                size="md"
                                                htmlSize={50}
                                                width="auto"
                                                type="text"
                                                placeholder="コメントを入力"
                                                className="border px-2 py-1 mr-2 w-50%"
                                                onChange={(e) => {
                                                    setData(
                                                        "comment",
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                            <Button
                                                colorScheme="blue"
                                                type="submit"
                                                className="bg-gray-800 text-white px-3 py-1 rounded"
                                            >
                                                投稿
                                            </Button>
                                        </Flex>
                                    </FormControl>
                                </form> */}

                            {/* コメント一覧 */}
                            {/* {arrayComments.map((comment) => (
                                    <Card.Root
                                        key={comment.id}
                                        variant="elevated"
                                        my={3}
                                    >
                                        <Card.Body>
                                            <Text>{comment.comment}</Text>
                                        </Card.Body>
                                    </Card.Root>
                                ))} */}
                            {/* </Box> */}
                        </Stack>
                    </Card.Body>
                </Card.Root>
            </Center>
        </MainLayout>
    );
};

Show.layout = (page: number) => <MainLayout children={page} />;
export default Show;
