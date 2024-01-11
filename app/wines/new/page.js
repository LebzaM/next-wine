
import React from 'react';
import { TextField, TextArea, Button } from '@radix-ui/themes';
import dynamic from 'next/dynamic';

const WineForm = dynamic(()=> import('@/app/_components/WineForm'))
const NewWinePage = () => {
    //adding wine in serverside
  return <WineForm />
  
};
export default NewWinePage;