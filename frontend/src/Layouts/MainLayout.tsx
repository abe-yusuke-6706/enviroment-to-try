// import React, { FC } from "react";
import type { FC, ReactNode } from "react";
import { useContext } from "react";
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
    // Button,
} from "@chakra-ui/react";
// import { usePage, Link } from "@inertiajs/react";
import { AuthContext } from "@/App";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"
import { signOut } from "@/lib/api/auth";

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
    // const { auth } = usePage().props;
    const { loading, isSignedIn, setIsSignedIn } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const res = await signOut()

            if (res.data.success === true) {
                // サインアウト時には各Cookieを削除
                Cookies.remove("_access_token")
                Cookies.remove("_client")
                Cookies.remove("_uid")

                setIsSignedIn(false)
                navigate("/login")

                console.log("Succeeded in sign out")
            } else {
                console.log("Failed in sign out")
            }
        } catch (err) {
            console.log(err)
        }
    }

    const AuthButtons = () => {
        // 認証完了後はサインアウト用のボタンを表示
        // 未認証時は認証用のボタンを表示
        if (!loading) {
            if (isSignedIn) {
                return (
                    <>
                        <Menu.Item value="新規投稿">
                            <a href="/create" rel="noreferrer">
                                新規投稿
                            </a>
                        </Menu.Item>
                        <Menu.Item value="ログアウト">
                            <Button
                                as="button"
                                // href=""
                                // method="post"
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
                        <ChakraLink href="">
                            <Image
                                height="100px"
                                objectFit="contain"
                                src="../header_logo.png"
                                alt="logo"
                            />
                        </ChakraLink>
                    </Center>
                    <Spacer />
                    <Menu.Root>
                        <Menu.Trigger asChild>
                            <Center h="100%">
                                {/* <Box variant="outline" h="100%" size="sm"> */}
                                <Image
                                    height="100px"
                                    objectFit="contain"
                                    src="../user_icon.png"
                                    alt="logo"
                                    _hover={{ cursor: "pointer" }}
                                />
                                {/* </Box> */}
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
                    {/*<Menu>
                        <MenuButton>
                            <Center h="100%">
                                <Box variant="outline" h="100%" size="sm">
                                    <Image
                                        height="100px"
                                        objectFit="contain"
                                        src="../user_icon.png"
                                        alt="logo"
                                    />
                                </Box>
                            </Center>
                        </MenuButton>
                        {auth.user ? (
                            <MenuList>
                                <MenuItem as="a" href="">
                                    新規投稿
                                </MenuItem>
                                <MenuItem as="a" href={route">
                                    プロフィール
                                </MenuItem>
                                <MenuItem className="py-[4px] px-[8px] hover:bg-rose-300 text-m">
                                    <Link
                                        as="button"
                                        href=""
                                        method="post"
                                    >
                                        ログアウト
                                    </Link>
                                </MenuItem>
                            </MenuList>
                        ) : (
                            <MenuList>
                                <MenuItem as="a" href="">
                                    ユーザー登録
                                </MenuItem>
                                <MenuItem as="a" href="">
                                    ログイン
                                </MenuItem>
                            </MenuList>
                        )}
                    </Menu> */}
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
                            src="../header_logo.png"
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
