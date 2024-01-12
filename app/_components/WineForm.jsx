'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Slider, SliderThumb, SliderTrack, SliderRange } from '@radix-ui/react-slider';
import * as RadioGroup from '@radix-ui/react-radio-group';
// import { Star } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button } from '@radix-ui/themes';
import { Radio } from '@radix-ui/react-radio-group';
// import { RadioGroup } from '@radix-ui/react-radio-group';
import { TextArea } from '@radix-ui/themes';
import { Form } from '@radix-ui/react-form';
import { FormLabel } from '@radix-ui/react-form';
import { FormField } from '@radix-ui/react-form';
import { Controller } from 'react-hook-form';
const WineForm = () => {
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
      await axios.post('/api/wines', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      router.push('/wines');
      router.refresh();
    } catch (error) {
      console.log(error)
      setSubmitting(false);
      setError('An unexpected error occurred');
    }
  });

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md mx-auto space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Name
        <TextArea {...register('name')} type="text" required className="mt-1" />
      </label>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">
        Year
        <TextArea {...register('year')} type="number" required className="mt-1" />
      </label>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">
        Type
        <Controller
          control={control}
          name="type"
          defaultValue="Red"
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

    {/* <div>
      <label className="block text-sm font-medium text-gray-700">
        Rating
        <input {...register('rating')} type="number" min="1" max="5" required className="mt-1" />
      </label>
    </div> */}

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
          Rating
          <input {...register('rating')} type="string" min="1" max="5" required className="mt-1" />
        </label>
      </div>

    <div>
        <label className="block text-sm font-medium text-gray-700">
          Consumed
          <Controller
            control={control}
            name="consumed"
            defaultValue=""
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
      <Button type="submit" disabled={isSubmitting} className="w-full">
        Submit
      </Button>
    </div>
  </form>
  );
};

export default WineForm;