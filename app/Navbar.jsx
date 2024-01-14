'use client';
import React from 'react';
import Link from 'next/link';
import { FaWineGlassAlt } from "react-icons/fa";
import { usePathname } from 'next/navigation';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';

import {
  Box,
  Flex,
  Container,
  DropdownMenu,
  Avatar,
  Text,
} from '@radix-ui/themes';

const NavBar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const links = [
    {
      id: 1,
      href: '/',
      label: 'Dashboard',
    },
    {
      id: 2,
      href: '/wines',
      label: 'Wines',
    },
  ];

  return (
    <nav className="py-3 border-b px-5 mb-5">
    <Container>
      <Flex justify="between">
      <Flex gap="3" align="center">
          <Link href="/">
        <FaWineGlassAlt className="text-2xl" />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.id}>
            <Link
              href={link.href}
              passHref
              className={classnames({
                'text-zinc-950': link.href === pathname,
                'text-zinc-600': link.href !== pathname,
                'hover:text-zinc-800 transition-colors': true,
              })}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      </Flex>
      <Box>
      {session && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Avatar
                  src={session.user?.image}
                  fallback="?"
                  size="3"
                  radius="full"
                  className="cursor-pointer"
                  referrerPolicy="no-referrer"
                ></Avatar>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Label>
                  <Text size="2">{session.user?.email}</Text>
                </DropdownMenu.Label>
                <DropdownMenu.Item>
                  <Link href="/api/auth/signout">Log out</Link>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}
          {!session && <Link href="/api/auth/signin">Login</Link>}
       </Box>
      </Flex>
      </Container>
      </nav>
  );
};

export default NavBar;