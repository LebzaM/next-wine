'use client';
import React from 'react';
import Link from 'next/link';
import { FaWineGlassAlt } from "react-icons/fa";
import { usePathname } from 'next/navigation';
import classnames from 'classnames';

import {
  Box,
  Flex,
  Container,
  DropdownMenu,
  Avatar,
  Text,
} from '@radix-ui/themes';

const Navbar = () => {
  return (
    <nav className="py-3 border-b px-5 mb-5">
    <Container>
      <Flex justify="between">
        <Flex gap="3" align="center">
          <Link href="/">
            <FaWineGlassAlt className="text-2xl" />
          </Link>
          <NavLinks />
        </Flex>
        {/* <AuthStatus /> */}
      </Flex>
    </Container>
  </nav>
  )
}

export default Navbar

const NavLinks = () => {
    const pathname = usePathname();
  
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
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.id}>
            <Link
              href={link.href}
              className={classnames({
                'nav-link': true,
                '!text-zinc-950': link.href === pathname,
              })}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    );
  };