'use client'
import React,{useState} from 'react';
import { useForm, Controller } from 'react-hook-form';
// import {  Input, Select } from '@radix-ui/react-form-control';
import { RadioGroup, Radio } from '@radix-ui/react-radio-group';
import { Slider, SliderThumb, SliderTrack, SliderRange } from '@radix-ui/react-slider';
import { Star, StarFill } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { Label } from '@radix-ui/react-form';
import { Button } from '@radix-ui/themes';
import { Select } from '@radix-ui/themes';
import { TextArea } from '@radix-ui/themes';
const WineForm = () => {
//   const { control, handleSubmit } = useForm();
  const {
    register,
    control,
    handleSubmit,
    
  } = useForm()
  const router = useRouter()
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);

      await axios.post('/api/wines', data);
      router.push('/wines');
    } catch (error) {
      setSubmitting(false);
      setError('An unexpected error occurred');
    }
  });
  return (
    <form onSubmit={onSubmit}>
      <Label>
        Name
        <TextArea {...register('name')} type="text" required />
      </Label>

      <Label>
        Year
        <TextArea {...register('year')} type="number" required />
      </Label>

      <Label>
        Type
        <Controller
          control={control}
          name="type"
          defaultValue=""
          render={({ field }) => (
            <Select {...field} required>
              <option value="" disabled>
                Select Type
              </option>
              <option value="red">Red</option>
              <option value="white">White</option>
            </Select>
          )}
        />
      </Label>

      <Label>
        Rating
        <Controller
          control={control}
          name="rating"
          defaultValue={1}
          render={({ field }) => (
            <Slider {...field} min={1} max={5} step={1}>
              <SliderTrack>
                <SliderRange />
              </SliderTrack>
              <SliderThumb as={Star} />
            </Slider>
          )}
        />
      </Label>

      <Label>
        Varietal
        <Controller
          control={control}
          name="varietal"
          defaultValue=""
          render={({ field }) => (
            <RadioGroup {...field} required>
              <Radio value="merlot">Merlot</Radio>
              <Radio value="shiraz">Shiraz</Radio>
            </RadioGroup>
          )}
        />
      </Label>

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default WineForm;