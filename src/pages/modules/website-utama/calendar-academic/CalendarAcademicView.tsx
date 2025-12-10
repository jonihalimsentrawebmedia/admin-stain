import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import CalendarAcademicViewModel from './CalendarAcademicViewModel'
import useGetCalendarAcademic from './controller/useGetCalendarAcademic'
import TableCustom from '@/components/common/table/TableCustom'
import SelectFilter from '@/components/common/filter/SelectFilter'
import ButtonAddAcademicYear from './components/ButtonAddAcademicYear'

const CalendarAcademicView = () => {
  const { columns } = CalendarAcademicViewModel()
  const { academicYearList, loading, meta } = useGetCalendarAcademic()
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        buttonGroup={[
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
      />
    </div>
  )
}

export default CalendarAcademicView
