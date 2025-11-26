import { useEffect } from "react";
import MainLayout from "../Layouts/MainLayout";
import { getCurrentUser } from "@/lib/api/auth"; 

const Home = () => {
    const isLoggedIn = async () => {
        try {
            const res = await getCurrentUser();
            console.log("Testでresponseが返却");
            console.log(res);
            
            if (res?.data.isLogin) {
                console.log("ログイン中:", res.data.data);
            } else {
                console.log("未ログイン");
            }
        } catch (error) {
            console.log("Testでthrowされた。")
            console.log(error);
        }
    }

    useEffect(() => {
        isLoggedIn()
    }, [])

    return (
        <>
            <div>ログインチェック画面</div>
        </>
    )
}

export default function HomeWithLayout() {
    return <MainLayout><Home /></MainLayout>;
}