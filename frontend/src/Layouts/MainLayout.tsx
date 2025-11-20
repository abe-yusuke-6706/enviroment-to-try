// import React, { FC } from "react";
import type { FC, ReactNode } from "react";
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
    Link, Button
} from "@chakra-ui/react";
// import { usePage, Link } from "@inertiajs/react";

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
    // const { auth } = usePage().props;

    return (
        <div>
            {/* ヘッダー */}
            <Box
                background="red.500"
                width="100%"
                h="100px"
                pr="4"
            >
                <Flex h="100%">
                    <Spacer />
                    <Center h="100%">
                        <Link href="">
                            <Image
                                height="100px"
                                objectFit="contain"
                                src="../header_logo.png"
                                alt="logo"
                            />
                        </Link>
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
                                    {/* {menuItems.map((item) => (
                                        <Menu.Item key={item.value} value={item.value}>
                                            {item.label}
                                        </Menu.Item>
                                    ))} */}
                                    <Menu.Item value="テスト">
                                        ラベル1
                                    </Menu.Item>
                                    <Menu.Item value="テスト">
                                        ラベル2
                                    </Menu.Item>
                                    <Menu.Item value="テスト">
                                        ラベル3
                                    </Menu.Item>
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
                minH="100vh"
                bgImage={`url(../background_image.jpg)`}
                bgSize="cover"
                // bgPosition="center"
                bgRepeat="no-repeat"
            >
                <Box w="90%" m="auto" py={10}>
                    {children}
                </Box>
            </Box>

            {/* フッター */}
            <Box
                background="red.500"
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
