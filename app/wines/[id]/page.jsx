import React from 'react';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import { Heading, Flex, Card } from '@radix-ui/themes';

const WineDetailPage = async ({ params }) => {
  const wine = await prisma.wine.findUnique({
    where: { id: params.id },
  });

  if (!wine) notFound();

  return (
    <div>
      <Heading>{wine.name}</Heading>
      <Flex className="space-x-3" my="2">
      
      <p>{wine.dateConsumed.toDateString()}</p>
      </Flex>
      <Card>
      <p>{wine.year}</p>
      <p>{wine.consumed}</p>
      </Card>
      
    </div>
  );
};

export default WineDetailPage;