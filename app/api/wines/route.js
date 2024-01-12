import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import prisma from '../../../prisma/client';
import { z } from 'zod';

const createWine = z.object({
  name: z.string().min(3).max(255),
  year: z.string().min(1),
  type: z.string().min(1),
  varietal: z.string().min(1),
  rating:z.string(),
  consumed:z.boolean()

});




export async function POST(NextRequest) {
  const body = await NextRequest.json();
  body.consumed = body.consumed === 'Yes';

  const validation = createWine.safeParse(body);


  
  if (validation.success === false) {
    return NextResponse.json(result.error.format(), { status: 400 });
  }

  const newWine = await prisma.wine.create({
    data: { name: body.name, year: body.year,  type:body.type, varietal:body.varietal, rating:body.rating, consumed:body.consumed },
  });

  return NextResponse.json(newWine, { status: 201 });
}


