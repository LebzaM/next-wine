import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react'

const EditWineButton = ({wineId}) => {
  return (
    <Button>
    <Pencil2Icon />
    <Link
      href={`/issues/${wineId}/edit`}
      className="flex gap-2 items-center"
    >
      Edit Wine
    </Link>
  </Button>
  )
}

export default EditWineButton