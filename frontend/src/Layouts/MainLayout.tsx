// import React, { FC } from "react";
import type { FC, ReactNode } from "react";
import { useContext, useEffect } from "react";
import {
    Box,
    Image,
    Flex,
    Spacer,
    // Menu,
    // Portal,
    // Button,
    Center,
    Text,
    // MenuList,
    // MenuItem,
    // MenuButton,
    Menu,
    Portal,
    Link as ChakraLink,
    Button,
    // useStatStyles,
    // Button,
} from "@chakra-ui/react";
// import { usePage, Link } from "@inertiajs/react";
import { AuthContext } from "@/App";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"
import { signOut } from "@/lib/api/auth";
import { useState } from "react";
import client from "@/lib/api/client";

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
    // const { auth } = usePage().props;
    const { loading, isSignedIn, setIsSignedIn } = useContext(AuthContext);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const navigate = useNavigate()

    const fetchAvatar = async () => {
        try {
            const res = await client.get("auth/avatar");

            setAvatarUrl(res.data.avatarUrl);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchAvatar();
    }, [avatarUrl])

    const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const res = await signOut()

            if (res.data.success === true) {
                Cookies.remove("_access_token")
                Cookies.remove("_client")
                Cookies.remove("_uid")

                setIsSignedIn(false)
                navigate("/")

                console.log("Succeeded in sign out")
            } else {
                console.log("Failed in sign out")
            }
        } catch (err) {
            console.log(err)
        }
    }

    const AuthButtons = () => {

        if (!loading) {
            if (isSignedIn) {
                return (
                    <>
                        <Menu.Item value="プロフィール">
                            <a href="/auth/profile" rel="noreferrer">
                                プロフィール
                            </a>
                        </Menu.Item>
                        <Menu.Item value="新規投稿">
                            <a href="/create" rel="noreferrer">
                                新規投稿
                            </a>
                        </Menu.Item>
                        <Menu.Item value="カート">
                            <a href="/cart/index" rel="noreferrer">
                                カート
                            </a>
                        </Menu.Item>
                        <Menu.Item value="購入済み">
                            <a href="/orders" rel="noreferrer">
                                購入済み
                            </a>
                        </Menu.Item>
                        <Menu.Item value="ログアウト">
                            <Button
                                as="button"
                                onClick={handleSignOut}
                            >ログアウト
                            </Button>
                        </Menu.Item>
                    </>
                )
            } else {
                return (
                    <>
                        <Menu.Item value="ユーザー登録" asChild>
                            <a href="/register" target="_blank" rel="noreferrer">
                                ユーザー登録
                            </a>
                        </Menu.Item>
                        <Menu.Item value="ログイン" asChild>
                            <a href="/login" target="_blank" rel="noreferrer">
                                ログイン
                            </a>
                        </Menu.Item>
                    </>
                )
            }
        } else {
            return <></>
        }
    }
    return (
        <div>
            {/* ヘッダー */}
            <Box
                background="gray.700"
                width="100%"
                h="100px"
                pr="4"
            >
                <Flex h="100%">
                    <Spacer />
                    <Center h="100%">
                        <ChakraLink href="/">
                            <Image
                                height="100px"
                                objectFit="contain"
                                src="/header_logo.png"
                                alt="logo"
                            />
                        </ChakraLink>
                    </Center>
                    <Spacer />
                    <Menu.Root>
                        <Menu.Trigger asChild>
                            <Center h="100%">
                                {avatarUrl ?
                                    (
                                        <Image
                                            src={avatarUrl}
                                            height="100px"
                                            alt="logo"
                                            _hover={{ cursor: "pointer" }}
                                            boxSize="70px"
                                            borderRadius="full"
                                            fit="cover"
                                        />
                                    ) : (
                                        <Image
                                            src="/user_icon.png"
                                            height="100px"
                                            objectFit="contain"
                                            alt="logo"
                                            _hover={{ cursor: "pointer" }}
                                        />
                                    )}
                            </Center>
                        </Menu.Trigger>
                        <Portal>
                            <Menu.Positioner>
                                <Menu.Content maxH="200px" minW="10rem">
                                    <AuthButtons></AuthButtons>
                                </Menu.Content>
                            </Menu.Positioner>
                        </Portal>
                    </Menu.Root>
                </Flex>
            </Box>

            {/* メイン */}
            <Box
                minH="calc(100vh - 200px)" // ヘッダー100 + フッター100 を除いた高さ
                display="flex"
                alignItems="center"
                justifyContent="center"
                bgSize="cover"
                bgRepeat="no-repeat"
            >
                <Box w="90%" m="auto" py={10}>
                    {children}
                </Box>
            </Box>

            {/* フッター */}
            <Box
                background="gray.700"
                width="100%"
                h="100px"
                padding="4"
                color="white"
            >
                <Flex h="100%">
                    <Center h="100%">
                        <Image
                            height="120%"
                            objectFit="contain"
                            src="/header_logo.png"
                            alt="logo"
                        />
                    </Center>
                    <Spacer />
                    <Center h="100%">
                        <Text textStyle="xl">©︎ 2025 PicoMart</Text>
                    </Center>
                </Flex>
            </Box>
        </div>
    );
};

export default MainLayout;
