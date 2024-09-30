import React from 'react'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";

export default function Header() {
  return (
    <Navbar>
        <NavbarBrand>
            <p className='hidden sm:flex text-3xl font-bold'>こみっと-dev版</p>
        </NavbarBrand>
        <NavbarContent className='hidden sm:flex gap-4' justify='center'>
            <NavbarItem>
                <Link color='foreground' href="#">
                    Content1
                </Link>
            </NavbarItem>
        </NavbarContent>
        <NavbarContent justify='end'>
            <Button color='primary' radius='full'>PUSH</Button>
        </NavbarContent>
    </Navbar>
  )
}