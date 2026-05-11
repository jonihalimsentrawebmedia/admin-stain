import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import useGetFaculty from './controller/useGetFaculty'
import FacultyViewModel from './FacultyViewModel'
import TableCustom from '@/components/common/table/TableCustom'
import ButtonGoToGuide from '../panduan/components/ButtonGoToGuide'
import { Button } from '@/components/ui/button.tsx'
import { IoMdImage } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

const FacultyView = () => {
  const { columns } = FacultyViewModel()

  const { faculty, loading, meta } = useGetFaculty()
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        buttonGroup={[
          {
            type: 'custom',
            element: <ButtonGoToGuide titleGuide="Fakultas" valueGuide="WEBSITE_UTAMA_FAKULTAS" />,
          },
          {
            type: 'custom',
            element: (
              <Button
                onClick={() => navigate('background')}
                variant={'outline'}
                className={'border border-primary text-primary hover:text-primary'}
              >
                <IoMdImage />
                Gambar Background
              </Button>
            ),
          },
        ]}
        label="Fakultas"
      />
      <TableCustom columns={columns} data={faculty} loading={loading} meta={meta} />
    </div>
  )
}

export default FacultyView
