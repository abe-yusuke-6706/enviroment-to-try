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
    IconButton,
    NumberInput,
    Button,
    Spacer,
    HStack,
} from "@chakra-ui/react";
import { LuMinus, LuPlus } from "react-icons/lu";
import MainLayout from "../../Layouts/MainLayout";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import axios from "axios";
import type { Product, ProductImage } from "@/interfaces/product.interface";
import { useParams } from "react-router-dom";
import { FaPenToSquare } from "react-icons/fa6";
import client from "@/lib/api/client";
import { useNavigate } from "react-router-dom";

const Show = () => {

    const params = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState<Product | null>(null);
    const [createdUserId, setCreatedUserId] = useState<number>(0);
    const [currentUserId, setCurrentUserId] = useState<number>(0)
    const [quantity, setQuantity] = useState<number>(1);

    useEffect(() => {
        const fetchItems = async () => {

            try {
                const res = await axios.get(
                    `http://localhost:3000/api/v1/products/${params.id}`
                );
                const resCurrentUserId = await client.get("auth/validate_token");

                setProduct(res.data);
                setCurrentUserId(resCurrentUserId.data.id);
                setCreatedUserId(res.data.user_id);
                console.log(createdUserId, currentUserId);
            } catch (error) {
                console.log(error);
            }
        }

        fetchItems();
    }, [])

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        const fetchItems = async () => {

            try {
                await client.post("cart_items", {
                    quantity: quantity,
                    product_id: product?.id
                });

                navigate("/cart/index");
            } catch (error) {
                console.log(error);
            }
        }

        fetchItems();
    }

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
                            <Heading size="lg" my={5}>{product?.name}</Heading>
                            <Card.Description mb={5}>
                                {product?.description}
                            </Card.Description>
                            <Flex>
                                <Text
                                    textStyle="2xl"
                                    fontWeight="medium"
                                    letterSpacing="tight"
                                    mr={5}
                                >
                                    {product?.price}円
                                </Text>
                                <NumberInput.Root defaultValue="1" unstyled spinOnPress={false} onValueChange={(value) => setQuantity(value.valueAsNumber)}>
                                    <HStack gap="2">
                                        <NumberInput.DecrementTrigger asChild>
                                            <IconButton variant="outline" size="sm">
                                                <LuMinus />
                                            </IconButton>
                                        </NumberInput.DecrementTrigger>
                                        <NumberInput.ValueText textAlign="center" fontSize="lg" minW="3ch" />
                                        <NumberInput.IncrementTrigger asChild>
                                            <IconButton variant="outline" size="sm">
                                                <LuPlus />
                                            </IconButton>
                                        </NumberInput.IncrementTrigger>
                                    </HStack>
                                </NumberInput.Root>
                                <Spacer />
                                {currentUserId === createdUserId ? (
                                    <Link href={`/edit/${params.id}`}>
                                        編集<FaPenToSquare />
                                    </Link>
                                ) : (
                                    <Button
                                        variant="solid"
                                        onClick={handleSubmit}
                                    >
                                        カートに入れる
                                    </Button>
                                )}
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
