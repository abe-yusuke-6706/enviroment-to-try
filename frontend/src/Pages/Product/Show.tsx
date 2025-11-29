import { useEffect, useState } from "react";
import {
    Box,
    Image,
    Text,
    Stack,
    Center,
    Card,
    Heading,
    Flex,
    Link,
    Spacer,
} from "@chakra-ui/react";
import MainLayout from "../../Layouts/MainLayout";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import axios from "axios";
import type { Product, ProductImage } from "@/interfaces/product";
import { useParams } from "react-router-dom";
import { FaPenToSquare } from "react-icons/fa6";

const Show = () => {

    const params = useParams();
    console.log(params);
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchItems = async () => {

            try {
                const res = await axios.get(
                    `http://localhost:3000/api/v1/products/${params.id}`
                );

                setProduct(res.data);
                console.log(res.data);
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
                                {product?.images?.length! > 0 ? (
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
                                    </Swiper>)
                                    : (
                                        <Box w="100%">
                                            <Image
                                                w="full"
                                                h="400px"
                                                bg="black"
                                                objectFit="contain"
                                                src="../nothing_image.png"
                                            />
                                        </Box>
                                    )}
                            </Box>


                            {/* タイトル＆説明 */}
                            <Heading size="lg">{product?.name}</Heading>
                            <Text className="line-clamp-2">
                                {product?.description}
                            </Text>
                            <Flex>
                                <Text
                                    textStyle="2xl"
                                    fontWeight="medium"
                                    letterSpacing="tight"
                                    mt="2"
                                >
                                    {product?.price}
                                </Text>
                                <Spacer />
                                <Link href={`/edit/${params.id}`}>
                                    編集<FaPenToSquare />
                                </Link>
                            </Flex>
                        </Stack>
                    </Card.Body>
                </Card.Root>
            </Center>
        </MainLayout>
    );
};

Show.layout = (page: number) => <MainLayout children={page} />;
export default Show;
