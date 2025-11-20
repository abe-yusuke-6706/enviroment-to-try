// import React from 'react'
import MainLayout from "../Layouts/MainLayout";

const Home = () => {
    return (
        <>
            <div>ログイン完了後画面</div>
        </>
    )
}

export default function HomeWithLayout() {
    return <MainLayout><Home /></MainLayout>;
}