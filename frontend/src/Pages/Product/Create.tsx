import MainLayout from "@/Layouts/MainLayout";
import { useState } from "react";
// import { StarIcon } from "@chakra-ui/icons";
import {
    // Box,
    Input,
    // Flex,
    Button,
    // FormControl,
    // FormLabel,
    // VStack,
    Textarea,
    // Text,
    // HStack,
    // FileUpload,
    Field,
    // Fieldset,
    // For,
    // NativeSelect,
    Stack,
    FileUpload,
    Card,
    Center
} from "@chakra-ui/react";
import { HiUpload } from "react-icons/hi";
// import type { createProduct } from "@/interfaces/product";
// import { useParams } from "react-router-dom";
import axios from "axios";
// import { getCurrentUser } from "@/lib/api/auth";

// import {
//     FileUpload,
//     FileUploadTrigger,
//     FileUploadDropzone,
// } from "@saas-ui/file-upload";
import client from "@/lib/api/client";

// const Create = ({ googleMapApiKey, mapId }) => {
const Create = () => {
    const [name, setName] = useState<string>("");
    const [images, setImages] = useState<File[] | null>(null);
    const [price, setPrice] = useState<number>(0);
    const [description, setDescription] = useState<string>("");
    // const [userId, setUserId] = useState<number>(0);
    const formData = new FormData;

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        // const formData: createProduct = {
        //     name: name,
        //     price: price,
        //     stock: 3,
        //     image: images,
        //     description: description,
        // // }
        // const currentUser = await getCurrentUser()
        // const userId = currentUser?.data;
        // console.log(userId);
        // console.log(userId.data.id);
        // setUserId(currentUser?.data.id);

        formData.append("product[name]", name);
        formData.append("product[price]", price.toString());
        formData.append("product[stock]", "3");
        formData.append("product[description]", description);
        // formData.append("product[user_id]", "1");

        if (images) {
            images.forEach(image => formData.append("product[images][]", image))
        };

        console.log(formData);

        try {
            const isUserLogin = await client.get("auth/sessions");
            console.log(isUserLogin);

            const res = await client.post("/products", formData);
            console.log(res);

            // const itemData = res.data.map((responseData: Product) => {
            //     return responseData
            // })
        } catch (error) {
            console.log(error);
        }

        // try {
        //     const res = await signUp(formData)
        //     console.log(res)

        //     if (res.status === 200) {

        //         Cookies.set("_access_token", res.headers["access-token"])
        //         Cookies.set("_client", res.headers["client"])
        //         Cookies.set("_uid", res.headers["uid"])

        //         console.log("ユーザー登録完了")
        //     } else {
        //         console.log("ユーザー登録失敗")
        //     }
        // } catch (err) {
        //     console.log(err)
        // }

    }

    // const [address, setAddress] = useState(null);
    // const geocodingLib = useMapsLibrary("geocoding");
    // const { form_input } = usePage().props;

    // const [mapCenter, setMapCenter] = useState({
    //     lat: Number(form_input?.latitude ?? 35.6813),
    //     lng: Number(form_input?.longitude ?? 139.767066),
    // });

    // const { data, setData, post } = useForm({
    //     title: form_input?.title ?? "",
    //     description: form_input?.description ?? "",
    //     rating: form_input?.rating ?? 0,
    //     latitude: form_input?.latitude ?? 0,
    //     longitude: form_input?.longitude ?? 0,
    //     restaurant_name: form_input?.restaurant_name ?? "",
    //     address: form_input?.address ?? "",
    //     images: [],
    // });

    // const onSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(data);
    //     post(
    //         route("post.store"),
    //         {
    //             ...data,
    //             _method: "put",
    //         },
    //         {
    //             forceFormData: true,
    //         }
    //     );
    // };

    // console.log(data);

    return (
        <MainLayout>
            <Center>
                <Card.Root maxW="2xl" w="full">
                    <Card.Header>
                        <Card.Title>商品作成</Card.Title>
                        <Card.Description>
                            下記に商品の詳細をご記入ください。
                        </Card.Description>
                    </Card.Header>
                    <Card.Body>
                        <Stack gap="4" w="full">
                            <Field.Root>
                                <Field.Label>商品名</Field.Label>
                                <Input name="name"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setName(e.target.value)}
                                    required />
                            </Field.Root>
                            <Field.Root>
                                <FileUpload.Root maxFiles={5}>
                                    <FileUpload.HiddenInput
                                        onChange={(e) => {
                                            const files: FileList | null = e.target.files;
                                            if (!files) return;

                                            const fileArray = Array.from(files);

                                            console.log(fileArray);
                                            setImages(Array.from(files));
                                        }} />
                                    <FileUpload.Trigger asChild>
                                        <Button variant="outline" size="sm">
                                            <HiUpload /> ファイルアップロード
                                        </Button>
                                    </FileUpload.Trigger>
                                    <FileUpload.List showSize clearable />
                                </FileUpload.Root>
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>料金</Field.Label>
                                <Input name="price"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setPrice(Number(e.target.value))}
                                    required
                                />
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>説明欄</Field.Label>
                                <Textarea name="description"
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                        setDescription(e.target.value)}
                                    required />
                            </Field.Root>
                        </Stack>
                    </Card.Body>
                    <Card.Footer justifyContent="flex-end">
                        <Button variant="outline">キャンセル</Button>
                        <Button
                            variant="solid"
                            onClick={handleSubmit}>
                            確認する
                        </Button>
                    </Card.Footer>
                </Card.Root>
            </Center>

            {/* <FormControl isRequired>
                            <FormLabel name="title">タイトル</FormLabel>
                            <Input
                                id="title"
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                value={data.title}
                            />
                        </FormControl>

                        <FormControl isRequired className="mb-3">
                            <FormLabel htmlFor="description">
                                感想
                            </FormLabel>
                            <Textarea
                                id="description"
                                placeholder="感想を入力"
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                value={data.description}
                            />
                        </FormControl> */}

            {/* <FileUpload
                                maxFileSize={1024 * 1024}
                                maxFiles={10}
                                accept="image/*"
                                onFileChange={(files) => {
                                    setData("images", files);
                                    console.log(data.image);
                                }}
                            >
                                {({ acceptedFiles, clearFiles }) => {
                                    return (
                                        <FileUploadDropzone>
                                            <Text fontSize="sm">
                                                画像をアップロード or
                                                ドラッグしてください
                                            </Text>
                                            {!acceptedFiles?.length ? (
                                                <FileUploadTrigger as={Button}>
                                                    画像アップロード
                                                </FileUploadTrigger>
                                            ) : (
                                                <HStack>
                                                    <Text fontSize="sm">
                                                        {acceptedFiles.length}
                                                        選択中
                                                    </Text>
                                                    <Button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            clearFiles();
                                                            setData(
                                                                "images",
                                                                []
                                                            );
                                                        }}
                                                    >
                                                        キャンセル
                                                    </Button>
                                                </HStack>
                                            )}
                                        </FileUploadDropzone>
                                    );
                                }}
                            </FileUpload> */}

            {/* 五段階評価 */}
            {/* <FormControl className="mb-6">
                                <FormLabel htmlFor="score">評価</FormLabel>
                                <Box id="score">
                                    {Array(5)
                                        .fill("")
                                        .map((_, i) => (
                                            <StarIcon
                                                key={i}
                                                w={6}
                                                h={6}
                                                color={
                                                    i < data.rating
                                                        ? "#ffc107"
                                                        : "#c4c4c4ff"
                                                }
                                                onClick={() =>
                                                    setData({
                                                        ...data,
                                                        rating: i + 1,
                                                    })
                                                }
                                                cursor={"pointer"}
                                            />
                                        ))}
                                </Box>
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel htmlFor="restaurant_name">
                                    店舗名
                                </FormLabel>
                                <Input
                                    id="restaurant_name"
                                    placeholder="店舗名を入力"
                                    onChange={(e) =>
                                        setData(
                                            "restaurant_name",
                                            e.target.value
                                        )
                                    }
                                    value={data.restaurant_name}
                                />
                            </FormControl> */}

            {/* マップ */}
            {/* <FormControl>
                                <FormLabel htmlFor="address">住所</FormLabel>
                                <Flex>
                                    <Input
                                        id="address"
                                        size="md"
                                        htmlSize={50}
                                        width="auto"
                                        type="text"
                                        placeholder="住所を入力"
                                        className="border px-2 py-1 mr-2 w-50%"
                                        onChange={(e) => {
                                            setData("address", e.target.value);
                                            setAddress(e.target.value);
                                        }}
                                        value={data.address}
                                    />
                                    <Button
                                        colorScheme="blue"
                                        type="button"
                                        className="bg-gray-800 text-white px-3 py-1 rounded"
                                        onClick={async (e) => {
                                            const geocoder =
                                                new google.maps.Geocoder();
                                            geocoder.geocode(
                                                { address },
                                                async (results, status) => {
                                                    if (results) {
                                                        const lat =
                                                            results[0].geometry.location.lat();

                                                        const lng =
                                                            results[0].geometry.location.lng();

                                                        setMapCenter({
                                                            lat,
                                                            lng,
                                                        });

                                                        setData(
                                                            "latitude",
                                                            lat
                                                        );
                                                        setData(
                                                            "longitude",
                                                            lng
                                                        );
                                                    }
                                                }
                                            );
                                        }}
                                    >
                                        検索
                                    </Button>
                                </Flex>
                            </FormControl>

                            <APIProvider apiKey={googleMapApiKey}>
                                <Box w="100%" h="400px">
                                    <Map
                                        defaultZoom={13}
                                        center={mapCenter}
                                        mapId={mapId}
                                        onClick={(e) => {
                                            setData(
                                                "latitude",
                                                e.detail.latLng.lat
                                            );
                                            setData(
                                                "longitude",
                                                e.detail.latLng.lng
                                            );
                                        }}
                                    >
                                        <AdvancedMarker
                                            position={{
                                                lat: Number(data.latitude),
                                                lng: Number(data.longitude),
                                            }}
                                            libraries={["geocoding"]}
                                        >
                                            <Pin
                                                background={"#FBBC04"}
                                                glyphColor={"#000"}
                                                borderColor={"#000"}
                                            />
                                        </AdvancedMarker>
                                    </Map>
                                </Box>
                            </APIProvider>

                            <Button
                                colorScheme="blue"
                                size="md"
                                w="auto"
                                mt={2}
                                type="submit"
                            >
                                確認する
                            </Button>
                        </VStack> */}
            {/* </form> */}
            {/* </div>
            </div> */}
        </MainLayout>
    );
};

Create.layout = (page: number) => <MainLayout children={page} />;
export default Create;
