import MainLayout from "@/Layouts/MainLayout";
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
    const location = useLocation();
    const { name, price, stock, description, images } = location.state as LocationProduct;

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        const formData = new FormData;

        try {
            formData.append("product[name]", name);
            formData.append("product[price]", price.toString());
            formData.append("product[description]", description);
            formData.append("product[stock]", stock.toString())

            if (images) {
                images.forEach(image => formData.append("product[images][]", image))
            };

            await client.get("auth/sessions");
            const res = await client.post("/products", formData);

            navigate(`/show/${res.data.id}`);
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
                        <Button variant="subtle" colorPalette="red" flex="1" onClick={() => navigate(-1)}>
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
