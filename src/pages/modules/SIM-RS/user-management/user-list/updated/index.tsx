import { useParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'
import { UseGetDetailUser } from '../hooks/index.tsx'
import { FormEditUser } from '../component/buttonEdit.tsx'

const UpdateUser = () => {
  const { id } = useParams<{ id: string }>()
  const { detail, loading } = UseGetDetailUser(id ?? '')

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
        <ButtonTitleGroup isBack label={'Edit User'} buttonGroup={[{ type: 'custom', element: <ButtonGoToGuide titleGuide={'Edit User'} valueGuide="SIM_RS_USER_MANAGEMENT" /> }]} />
        <FormEditUser data={detail} />
      </div>
    </>
  )
}

export default UpdateUser
