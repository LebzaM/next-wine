import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';

const WineActions = () => {
  return (
    <div className="mb-5">
        <Button>
            <Link href='/wines/new'>Add New Wine</Link>
        </Button>
    </div>
  );
};

export default WineActions;