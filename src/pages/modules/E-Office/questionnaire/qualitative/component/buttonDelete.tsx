import { FaTrash } from 'react-icons/fa'

interface Props {
  onClick: () => void
}

export const ButtonDeleteList = (props: Props) => {
  const { onClick } = props
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className={'bg-red-500 text-white p-1.5 rounded hover:bg-red-600'}
      >
        <FaTrash />
      </button>
    </>
  )
}

export default ButtonDeleteList
