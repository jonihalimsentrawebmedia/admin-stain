import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import useGetAcreditation from './controller/useGetAcreditation'
import AcreditationViewModel from './AcreditationViewModel'
import TableCustom from '@/components/common/table/TableCustom'
import ButtonAddAcreditation from './components/ButtonAddAcreditation'
import useGetBgAcreditation from './controller/useGetBgAcreditation'
import { Button } from '@/components/ui/button'
import { IoWarning } from 'react-icons/io5'
import { Image } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

const AcreditationView = () => {
  const { loading, meta, acreditationList } = useGetAcreditation()
  const { columns, goToBackground } = AcreditationViewModel()
  const { background,loading:loadingBg } = useGetBgAcreditation()
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        buttonGroup={[
          {
            label: '',
            onClick: () => {},
            type: 'add',
            element:
            loadingBg?<Skeleton className='h-[30px] '/>:
              background.length == 0 ? (
                <Button
                  onClick={goToBackground}
                  variant={'outline'}
                  className="border border-red-500 text-red-500"
                >
                  <IoWarning className="text-red- hover:text-red-500 size-6" />
                  Gambar Background Belum Ada
                </Button>
              ) : (
                <Button
                  onClick={goToBackground}
                  variant={'outline'}
                  className="border border-primary text-primary hover:text-primary"
                >
                  <Image className="text-primary" />
                  Gambar Background
                </Button>
              ),
          },
          {
            label: '',
            onClick: () => {},
            type: 'add',
            element: <ButtonAddAcreditation />,
          },
        ]}
        label="Akreditasi"
      />
      <TableCustom
        tdClassName="whitespace-pre-line"
        columns={columns}
        data={acreditationList}
        loading={loading}
        meta={meta}
      />
    </div>
  )
}

export default AcreditationView
