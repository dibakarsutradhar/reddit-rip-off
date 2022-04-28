import React from 'react';
import { Box, Flex, Link } from '@chakra-ui/react';
import NextLink from 'next/link';

interface NavBarProps {

};

const NavBar: React.FC<NavBarProps> = ({}) => {
  return (
    <Flex bg='tomato' p={4} ml={'auto'}>
      <Box ml={"auto"}>
        <NextLink href='/login'>
          <Link mr={2}>login</Link>
        </NextLink>
        <NextLink href='/register'>
          <Link>register</Link>
        </NextLink>
      </Box>
    </Flex>
  );
};

export default NavBar;