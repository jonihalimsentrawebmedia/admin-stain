import { useParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetDetailPatient } from '../hooks/index.tsx'
import { FormEditPatient } from '../components/buttonEdit.tsx'

const UpdatePatient = () => {
  const { id } = useParams<{ id: string }>()
  const { detail, loading } = UseGetDetailPatient(id ?? '')

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
        <ButtonTitleGroup isBack label={'Edit Data Pasien'} buttonGroup={[]} />
        <FormEditPatient data={detail} />
      </div>
    </>
  )
}

export default UpdatePatient
