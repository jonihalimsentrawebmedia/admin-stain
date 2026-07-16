import { useParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetDetailRole } from '../hooks/index.tsx'
import { FormEditRole } from '../component/buttonEdit.tsx'

const UpdateRole = () => {
  const { id } = useParams<{ id: string }>()
  const { detail, loading } = UseGetDetailRole(id ?? '')

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
        <ButtonTitleGroup isBack label={'Edit Role'} buttonGroup={[]} />
        <FormEditRole data={detail} />
      </div>
    </>
  )
}

export default UpdateRole
