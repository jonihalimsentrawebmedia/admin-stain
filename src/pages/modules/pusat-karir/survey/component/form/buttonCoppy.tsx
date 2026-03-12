import { MdOutlineContentCopy } from 'react-icons/md'

export const ButtonCopy = () => {
  return (
    <>
      <button className={'border p-1.5 border-primary text-primary rounded'}>
        <MdOutlineContentCopy className={'size-4'} />
      </button>
    </>
  )
}
