import React from 'react'
import { Button } from '@radix-ui/themes';
import prisma from '../../prisma/client'
import { Table } from '@radix-ui/themes';
import WineActions from './WineActions';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Link from 'next/link';
import { ButtonIcon } from '@radix-ui/react-icons';
import { getServerSession } from 'next-auth';
import authOptions from '../auth/authOptions';
const Winepage = async () => {
  const session = await getServerSession(authOptions);
  const wines = await prisma.wine.findMany();
  // console.log(wines)
  return (
    <>
    <div>
        {session &&(
          <WineActions />
        )}
        
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
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Update
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {wines.map((wine) => (
            <Table.Row key={wine.id}>
              <Table.Cell>
              {wine.name}
                
                
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
              {wine.year}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {wine.type}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {wine.varietal}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {wine.rating ? wine.rating :"0"}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {wine.consumed ? 'Yes' : 'No'}
              </Table.Cell>
              
              <Table.Cell className="hidden md:table-cell">
              {wine.consumed ? wine.dateConsumed.toDateString() : 'N/A'}
              </Table.Cell>

              <Table.Cell className="hidden md:table-cell">
              {session &&(
                <Button>
                <Link href={`/wines/${wine.id}`} className="text-white">Update</Link>
              </Button>
              )}
              {!session && <Link href="/api/auth/signin">Login To Edit</Link>}
              
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