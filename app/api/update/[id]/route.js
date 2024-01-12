import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import prisma from '../../../../prisma/client';
import { z } from 'zod';

const uppdaWine = z.object({
  name: z.string().min(3).max(255),
  year: z.string().min(1),
  type: z.string().min(1),
  varietal: z.string().min(1),
  rating:z.string(),
  consumed:z.boolean()
});

export async function PATCH(NextRequest,{params}) {
  
  const body = await NextRequest.json();
  const validation = uppdaWine.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const wine = await prisma.wine.findUnique({
    where: { id: params.id },
  });

  if (!wine) {
    return NextResponse.json(
      { message: 'No Wine Found' },
      { status: 401 }
    );
  }

  const updateWine = await prisma.wine.update({
    where: { id: wine.id },
    data: {
      name: body.name,
      year: body.year,
      type: body.type,
      varietal: body.varietal,
      rating: body.rating, 
      consumed: body.consumed,
    },
  });

  return NextResponse.json(updateWine, { status: 201 });
}