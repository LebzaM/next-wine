import { Heading, Flex, Card } from '@radix-ui/themes';
import React from 'react';
import { Wine } from '@prisma/client';

const WineDetails = ({wine}) => {
  return (
    <>
      <Heading>{wine.name}</Heading>
      <Flex className="space-x-3" my="2">
        <p>{wine.year}</p>

        {/* <p>{issue.createdAt.toDateString()}</p> */}
      </Flex>
      <Card className="prose" mt="4">
        <p>{wine.consumed}</p>
      </Card>
    </>
  )
}

export default WineDetails