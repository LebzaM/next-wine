import React from 'react';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';


const WineDetailPage = async ({ params }) => {
  const wine = await prisma.wine.findUnique({
    where: { id: params.id },
  });

  if (!wine) notFound();

  return (
    <div>
      <p>{wine.name}</p>
      <p>{wine.year}</p>
      <p>{wine.consumed}</p>
      <p>{wine.dateConsumed.toDateString()}</p>
    </div>
  );
};

export default WineDetailPage;