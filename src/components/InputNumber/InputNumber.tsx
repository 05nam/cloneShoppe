import { forwardRef, InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMEssage?: string
  classNameInput?: string
  classNAmeError?: string
}

const InputNumber = forwardRef<HTMLInputElement, Props>(function InputNumberInner(
  {
    className,
    errorMEssage,
    classNameInput = 'w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm',
    classNAmeError = ' mt-1 min-h-[1.25rem] text-sm text-red-600',
    onChange,
    ...rest
  },
  ref
) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    if ((/^\d+$/.test(value) || value === '') && onChange) {
      onChange(event)
    }
  }
  return (
    <div className={className}>
      <input className={classNameInput} onChange={handleChange} {...rest} ref={ref} />
      <div className={classNAmeError}>{errorMEssage}</div>
    </div>
  )
})
export default InputNumber
