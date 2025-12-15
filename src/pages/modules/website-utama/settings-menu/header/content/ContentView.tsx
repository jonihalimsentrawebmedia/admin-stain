import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import ContentViewModel from './ContentViewModel'
import useGetContent from './controller/useGetContent'
import TableCustom from '@/components/common/table/TableCustom'
import SelectFilter from '@/components/common/filter/SelectFilter'
import useGetBackground from './controller/useGetBackground'
import { Button } from '@/components/ui/button'
import { IoWarning } from 'react-icons/io5'
import { Image } from 'lucide-react'

const ContentView = () => {
  const { columns, goToAdd, goToBackground } = ContentViewModel()
  const { contentList, loading, meta } = useGetContent()
  const { backgroundList,loading:loadingBg } = useGetBackground()
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        buttonGroup={[
          {
            label: '',
            onClick: () => {},
            type: 'add',
            element:
              backgroundList.length == 0 ? (
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
            label: 'Tambah',
            onClick: goToAdd,
            type: 'add',
          },
        ]}
        label="Konten - Sejarah"
        isBack
      />

      <TableCustom
        addFilter={
          <SelectFilter
            selectClassName={'min-w-[8rem]'}
            label="Tampilkan"
            name={'limit'}
            options={[
              { label: '10 Data', value: '10' },
              { label: '25 Data', value: '25' },
              { label: '50 Data', value: '50' },
              { label: '100 Data', value: '100' },
            ]}
          />
        }
        isShowLimit={false}
        columns={columns}
        data={contentList}
        loading={loading}
        meta={meta}
      />
    </div>
  )
}

export default ContentView
