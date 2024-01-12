import React from 'react';
import prisma from '../../../prisma/client'
import { notFound } from 'next/navigation';
import { Heading, Flex, Card, Grid, Box, Button } from '@radix-ui/themes';
import Link from 'next/link';
import { Pencil2Icon } from '@radix-ui/react-icons';
import EditWineButton from './EditWineButton';
import WineDetails from '../../_components/WineDetails';
const WineDetailPage = async ({ params }) => {
  const wine = await prisma.wine.findUnique({
    where: { id: params.id },
  });
   console.log(wine)
  if (!wine) notFound();

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap="5">
    <Box>
      
      <WineDetails wine={wine} />
    </Box>
    <Box>
      <EditWineButton wineId={wine.id}/>
    </Box>
  </Grid>
  );
};

export default WineDetailPage;