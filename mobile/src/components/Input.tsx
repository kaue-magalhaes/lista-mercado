import { forwardRef } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { Controller, UseControllerProps } from 'react-hook-form';

import { cn } from '../lib/utils';

type Props = {
  className?: string;
  label?: string;
  labelClasses?: string;
  inputClasses?: string;
  error?: string
  formProps: UseControllerProps;
  inputProps: TextInputProps;
}

const Input = forwardRef<TextInput, Props>(({ className, label, labelClasses, inputClasses, error = '', formProps, inputProps }, ref) => {
  return (
    <Controller
      render={({ field:{ value = '', onChange } }) => (
        <View className={ cn('flex flex-col gap-1.5 my-4 color-zinc-50 w-3/4', className) }>
          {label && <Text className={cn('text-base text-zinc-50', labelClasses)}>{label}</Text>}
          <TextInput
            className={cn(
              inputClasses,
              'border border-input py-2.5 px-4 rounded-lg bg-zinc-800 placeholder:text-zinc-400'
            )}
            ref={ref}
            value={value}
            onChangeText={onChange}
            {...inputProps}
          />
          {
            error.length > 0 && 
            <Text className="text-red-500 text-sm">
              {error}
            </Text>
          }
        </View>
      )}
      {...formProps}
    />
  );
});

export { Input };