'use client'
import { Heading, Flex, Card, TextArea } from '@radix-ui/themes';
import React, {useState, useEffect} from 'react';
import { Wine } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button } from '@radix-ui/themes';
import { Controller } from 'react-hook-form';
const WineDetails = ({wine}) => {
  const {
    register,
    control,
    handleSubmit,
  } = useForm();
  const router = useRouter();
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
  
      // Convert the string to a boolean
      data.consumed = data.consumed === 'Yes';
      
        if (wine)
          await axios.patch(
            `/api/update/${wine.id}`, JSON.stringify(data), {
              headers: {
                'Content-Type': 'application/json',
              },
            });
        else await axios.post('/api/wines/', data);
        router.push('/');
        router.refresh();
  
  

  
      router.push('/wines');
      router.refresh()
    } catch (error) {
      setSubmitting(false);
      setError('An unexpected error occurred');
    }
  });
  return (
    <form onSubmit={onSubmit} className="w-full max-w-md mx-auto space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Name
          <TextArea {...register('name')} type="text" required className="mt-1"  defaultValue={wine?.name || ''}/>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Year
          <TextArea {...register('year')} type="number" required className="mt-1" defaultValue={wine.year}/>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Type
          <Controller
            control={control}
            name="type"
            defaultValue={wine.type}
            render={({ field }) => (
              <select {...field} required className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option value="" disabled>Select Type</option>
                <option value="RED">Red</option>
                <option value="WHITE">White</option>
              </select>
            )}
          />
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Rating
          <input {...register('rating')} type="string" min="1" max="5" required className="mt-1" defaultValue={wine.rating}/>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Varietal
          <div className="mt-1 space-y-4">
            <label className="inline-flex items-center">
              <input type="radio" {...register('varietal')} value="MERLOT" required className="form-radio h-5 w-5 text-indigo-600" />
              <span className="ml-2">Merlot</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" {...register('varietal')} value="SHIRAZ" required className="form-radio h-5 w-5 text-indigo-600" />
              <span className="ml-2">Shiraz</span>
            </label>
          </div>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Consumed
          <Controller
            control={control}
            name="consumed"
            defaultValue={wine?.consumed ? 'Yes' : 'No'}
            render={({ field }) => (
              <select {...field} required className="mt-1">
                <option value="" disabled>Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            )}
          />
        </label>
      </div>

      <div>
        <button type="submit" disabled={isSubmitting} className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
          Update
        </button>
      </div>
    </form>
  )
}

export default WineDetails