import { useParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetDetailPoli } from '../hooks/index.tsx'
import { FormEditPoli } from '../component/buttonEdit.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

const UpdatePoli = () => {
  const { id } = useParams<{ id: string }>()
  const { detail, loading } = UseGetDetailPoli(id ?? '')

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Memuat data...</p>
      </div>
    )
  }

  if (!detail) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Data tidak ditemukan</p>
      </div>
    )
  }

  return (
    <>
      <div>
        <ButtonTitleGroup isBack label={'Edit Data Poli'} buttonGroup={[{ type: 'custom', element: <ButtonGoToGuide titleGuide="Panduan" valueGuide="SIM_RS_REFERENCE" /> }]} />
        <FormEditPoli data={detail} />
      </div>
    </>
  )
}

export default UpdatePoli
