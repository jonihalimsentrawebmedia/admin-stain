import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import CalendarAcademicViewModel from './CalendarAcademicViewModel'
import useGetCalendarAcademic from './controller/useGetCalendarAcademic'
import TableCustom from '@/components/common/table/TableCustom'
import SelectFilter from '@/components/common/filter/SelectFilter'
import ButtonAddAcademicYear from './components/ButtonAddAcademicYear'
import useGetBgCalendarAcademic from './controller/useGetBgCalendarAcademic'
import { Button } from '@/components/ui/button'
import { IoWarning } from 'react-icons/io5'
import { Image } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

const CalendarAcademicView = () => {
  const { columns, goToBackground } = CalendarAcademicViewModel()
  const { academicYearList, loading, meta } = useGetCalendarAcademic()
  const { background, loading: loadingBg } = useGetBgCalendarAcademic()
  
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        buttonGroup={[
          {
            label: '',
            onClick: () => {},
            type: 'add',
            element: loadingBg ? (
              <Skeleton className="h-[30px] " />
            ) : background.length == 0 ? (
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
            element: <ButtonAddAcademicYear />,
          },
        ]}
        label="Kalender Akademik"
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
        columns={columns}
        data={academicYearList}
        loading={loading}
        meta={meta}
        isShowLimit={false}
      />
    </div>
  )
}

export default CalendarAcademicView
