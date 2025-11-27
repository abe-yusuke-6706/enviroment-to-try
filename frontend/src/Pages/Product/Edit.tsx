import MainLayout from "@/Layouts/MainLayout";
import { useEffect, useState } from "react";
import {
    Input,
    Button,
    Textarea,
    Field,
    Stack,
    FileUpload,
    Card,
    Center,
    HStack,
    IconButton,
    NumberInput,
    Image,
    Flex,
    Text,
    Box,
    Spacer,
    CloseButton,
    Dialog,
    Portal
} from "@chakra-ui/react";
import { HiUpload } from "react-icons/hi";
import { LuMinus, LuPlus } from "react-icons/lu"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { Product } from "@/interfaces/product";
import { useParams } from "react-router-dom";
import type { ProductImage } from "@/interfaces/product";
import { TiDelete } from "react-icons/ti";
import client from "@/lib/api/client";

const Edit = () => {
    const navigate = useNavigate();
    const [name, setName] = useState<string>("");
    const [images, setImages] = useState<ProductImage[] | null>(null);
    const [files, setFiles] = useState<File[] | null>(null);
    const [price, setPrice] = useState<number>(0);
    const [description, setDescription] = useState<string>("");
    const [stock, setStock] = useState<number>(0);
    const [deleteIds, setDeleteIds] = useState<number[]>([]);

    const params = useParams();
    const formData = new FormData;

    useEffect(() => {
        console.log(deleteIds);
    },[deleteIds]);

    useEffect(() => {
        const fetchItems = async () => {

            try {
                const res = await axios.get(
                    `http://localhost:3000/api/v1/products/${params.id}`
                );
                console.log(res.data);

                setName(res.data.name);
                setPrice(res.data.price);
                setDescription(res.data.description);
                setStock(res.data.stock);
                setImages(res.data.images);

            } catch (error) {
                console.log(error);
            }
        }

        fetchItems();
    }, [])

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        e.preventDefault()

        formData.append("product[name]", name);
        formData.append("product[price]", price.toString());
        formData.append("product[description]", description);
        formData.append("product[stock]", stock.toString())
        // formData.append("product[imageIds]", deleteIds.toString())

        if (deleteIds) {
            deleteIds.forEach(id => formData.append("product[image_ids][]", id.toString()))
        };

        if (files) {
            files.forEach(file => formData.append("product[images][]", file))
        };

        console.log(deleteIds);
        console.log(formData);

        try {
            const res = await client.put(`products/${params.id}`, formData);
            console.log(res);

            navigate(`/show/${params.id}`)
        } catch (error) {
            console.log(error);
        }

        // formData.append("product[name]", name);
        // formData.append("product[price]", price.toString());
        // formData.append("product[description]", description);
        // formData.append("product[stock]", stock.toString());

        // if (images) {
        //     images.forEach(image => formData.append("product[images][]", image))
        // };

        // console.log(formData);

        // try {
        //     const isUserLogin = await client.get("auth/sessions");
        //     console.log(isUserLogin);

        //     const res = await client.post("/products", formData);
        //     console.log(res);

        //     navigate("/")
        // } catch (error) {
        //     console.log(error);
        // }
    }

    return (
        <MainLayout>
            <Center>
                <Card.Root maxW="2xl" w="full">
                    <Card.Header>
                        <Card.Title>商品編集</Card.Title>
                        <Card.Description>
                            下記に商品の詳細をご記入ください。
                        </Card.Description>
                    </Card.Header>
                    <Card.Body>
                        <Stack gap="4" w="full">
                            <Field.Root>
                                <Field.Label>商品名</Field.Label>
                                <Input
                                    name="name"
                                    value={name}
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
                                            setFiles(Array.from(files));
                                        }} />
                                    <FileUpload.Trigger asChild>
                                        <Button variant="outline" size="sm">
                                            <HiUpload /> ファイルアップロード
                                        </Button>
                                    </FileUpload.Trigger>
                                    <Stack gap="5" mt="4" w="full">
                                        {images && images.map((img) => (
                                            <HStack
                                                key={img.id}
                                                p="2"
                                                borderRadius="md"
                                                gap="4"
                                                css={{ outline: "1px solid #dcdadaff", }}
                                            >
                                                <Box
                                                    w="10%"
                                                    h="12"
                                                    overflow="hidden"
                                                    borderRadius="sm"
                                                >
                                                    <Image
                                                        src={img.url}
                                                        objectFit="cover"
                                                        w="full"
                                                        h="full"
                                                        alt={img.filename}
                                                    />
                                                </Box>
                                                <Box w="60%">
                                                    <Text flex="1" fontSize="sm"
                                                        css={{
                                                            whiteSpace: "nowrap",
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                        }}
                                                    >
                                                        {img.filename}
                                                    </Text>
                                                </Box>
                                                <Spacer />
                                                <IconButton
                                                    variant="ghost"
                                                    onClick={() => {
                                                        setImages(prevImage => prevImage ? prevImage.filter(prev => prev.id !== img.id) : null);
                                                        setDeleteIds(prev => [...prev, img.id]);
                                                    }}
                                                ><TiDelete />
                                                </IconButton>
                                            </HStack>
                                        ))}
                                    </Stack>
                                    <FileUpload.List showSize clearable />
                                </FileUpload.Root>
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>在庫数</Field.Label>
                                <NumberInput.Root defaultValue="3" unstyled spinOnPress={false} value={stock.toString()} onValueChange={(value) => setStock(value.valueAsNumber)}>
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
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>料金</Field.Label>
                                <Input
                                    name="price"
                                    value={price}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setPrice(Number(e.target.value))}
                                    required
                                />
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>説明欄</Field.Label>
                                <Textarea
                                    name="description"
                                    value={description}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                        setDescription(e.target.value)}
                                    required />
                            </Field.Root>
                        </Stack>
                    </Card.Body>
                    <Card.Footer justifyContent="flex-end">
                        <Button variant="outline">キャンセル</Button>
                        <Dialog.Root>
                            <Dialog.Trigger asChild>
                                <Button variant="solid">
                                    送信
                                </Button>
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
                                                この内容で商品内容を更新します。
                                            </p>
                                        </Dialog.Body>
                                        <Dialog.Footer>
                                            <Dialog.ActionTrigger asChild>
                                                <Button variant="outline">キャンセル</Button>
                                            </Dialog.ActionTrigger>
                                            <Button onClick={handleSubmit}>送信</Button>
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

Edit.layout = (page: number) => <MainLayout children={page} />;
export default Edit;
