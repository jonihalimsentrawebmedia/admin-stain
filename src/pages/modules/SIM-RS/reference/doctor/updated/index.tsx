import { useParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetDetailDoctor } from '../hooks/index.tsx'
import { FormEditDoctor } from '../component/buttonEdit.tsx'

const UpdateDoctor = () => {
  const { id } = useParams<{ id: string }>()
  const { detail, loading } = UseGetDetailDoctor(id ?? '')

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
        <ButtonTitleGroup isBack label={'Edit Data Dokter'} buttonGroup={[]} />
        <FormEditDoctor data={detail} />
      </div>
    </>
  )
}

export default UpdateDoctor
