import MainLayout from "@/Layouts/MainLayout";
import { useEffect } from "react";
import {
    Button,
    Card,
    Center,
    Text,
} from "@chakra-ui/react";
import { LuCheck, LuX } from "react-icons/lu"
import client from "@/lib/api/client";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import type { LocationProduct } from "@/interfaces/product";

const Confirm = () => {

    const navigate = useNavigate();
    // const [name, setName] = useState<string>("");
    // const [images, setImages] = useState<File[] | null>(null);
    // const [price, setPrice] = useState<number>(0);
    // const [description, setDescription] = useState<string>("");
    // const [stock, setStock] = useState<number>(0);

    const location = useLocation();
    const { name, price, stock, description, images } = location.state as LocationProduct;

    const formData = new FormData;

    useEffect(() => {
        console.log(stock);
    }, [stock])

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        formData.append("product[name]", name);
        formData.append("product[price]", price.toString());
        formData.append("product[description]", description);
        formData.append("product[stock]", stock.toString())

        if (images) {
            images.forEach(image => formData.append("product[images][]", image))
        };

        console.log(formData);

        try {
            const isUserLogin = await client.get("auth/sessions");
            console.log(isUserLogin);

            const res = await client.post("/products", formData);
            console.log(res);

            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <MainLayout>
            <Center>
                <Card.Root maxW="sm" overflow="hidden">
                    <Card.Header>
                        <Card.Title>商品確認</Card.Title>
                        <Card.Description>
                            新規投稿を行う商品内容を確認してください。
                        </Card.Description>
                    </Card.Header>
                    <Card.Body gap="2">
                        <Card.Title>タイトル：{name}</Card.Title>
                        <Card.Description><Text textStyle="xl" fontWeight="medium" letterSpacing="tight" mt="2">
                            説明：{description}
                        </Text>
                        </Card.Description>
                        <Text textStyle="xl" fontWeight="medium" letterSpacing="tight" mt="2">
                            値段：{price}円
                        </Text>
                        <Text textStyle="xl" fontWeight="medium" letterSpacing="tight" mt="2">
                            在庫数：{stock}個
                        </Text>
                        <Text textStyle="xl" fontWeight="medium" letterSpacing="tight" mt="2">
                            画像数：{images.length}枚
                        </Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="subtle" colorPalette="red" flex="1">
                            <LuX />
                            キャンセル
                        </Button>
                        <Button variant="subtle" colorPalette="blue" flex="1" onClick={handleSubmit}>
                            <LuCheck />
                            送信
                        </Button>
                    </Card.Footer>
                </Card.Root>
            </Center>
        </MainLayout>
    );
};

Confirm.layout = (page: number) => <MainLayout children={page} />;
export default Confirm;
