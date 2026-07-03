import { generatePdfEReceipt } from '@/pages/modules/E-Office/E-Receipt/component/pdfEReceipt.tsx'
import type { IEreceipt } from '@/pages/modules/E-Office/E-Receipt/data/types.ts'
import { FaEye } from 'react-icons/fa'

interface Props {
  data: IEreceipt
}

const ButtonPreviewEreceipt = (props: Props) => {
  const { data } = props

  const handlePreview = () => {
    generatePdfEReceipt(data).open()
  }

  return (
    <button
      className={'p-1.5 bg-blue-500 text-white rounded hover:bg-blue-600'}
      onClick={handlePreview}
    >
      <FaEye />
    </button>
  )
}

export default ButtonPreviewEreceipt
