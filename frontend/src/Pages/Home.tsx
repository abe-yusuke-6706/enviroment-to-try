// import React from 'react'
import MainLayout from "../Layouts/MainLayout";

const Home = () => {
    return (
        <>
            <div>Home</div>
            <h1>ああ</h1>
            <p>ssss</p>
            <p>sss</p>
        </>
    )
}

export default function HomeWithLayout() {
    return <MainLayout><Home /></MainLayout>;
}