import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import prisma from '@/prisma/client';
import { z } from 'zod';

const createWine = z.object({
  name: z.string().min(3).max(255),
  year: z.string().min(1),
});

export async function POST(NextRequest) {
  const body = await NextRequest.json();
  const validation = createWine.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newWine = await prisma.wine.create({
    data: { name: body.name, year: body.year },
  });

  return NextResponse.json(newWine, { status: 201 });
}