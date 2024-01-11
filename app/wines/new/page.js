'use client';
import React from 'react';
import { TextField, TextArea, Button } from '@radix-ui/themes';
const NewWinePage = () => {
  return (
    <div className="max-w-xl space-y-4">
      <TextField.Root>
        <TextField.Input placeholder="Title" />
      </TextField.Root>
      <TextArea placeholder="Description" />
      <Button>Add New Wine</Button>
    </div>
  );
};
export default NewWinePage;