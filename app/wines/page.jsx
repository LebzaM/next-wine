import React from 'react'
import { Button } from '@radix-ui/themes'
import prisma from '@/prisma/client'
import { Table } from '@radix-ui/themes';
import WineActions from './WineActions';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Link from '../components/link';
const Winepage = async () => {
  const wines = await prisma.wine.findMany();
  console.log(wines)
  return (
    <>
    <div>
      
        <WineActions />
        <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Year
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Type
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Varietal
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Rating
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Consumed
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Date Consumed
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {wines.map((wine) => (
            <Table.Row key={wine.id}>
              <Table.Cell>
              <Link href={`/wines/${wine.id}`}>{wine.name}</Link>
                
                <div className="block md:hidden">{wine.year}</div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {wine.type}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {wine.varietal}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {wine?.rating}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {wine.consumed}
              </Table.Cell>
              
              <Table.Cell className="hidden md:table-cell">
                {wine.dateConsumed.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

    </div>

    
    </>
  )
}

export default Winepage