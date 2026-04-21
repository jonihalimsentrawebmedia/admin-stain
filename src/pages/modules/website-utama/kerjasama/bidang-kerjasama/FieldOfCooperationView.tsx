import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup"
import useGetFieldOfCooperation from "./controller/useGetFieldOfCooperation"
import FieldOfCooperationViewModel from "./FieldOfCooperationViewModel"
import ButtonAddFieldOfCooperation from "./components/ButtonAddFieldOfCooperation"
import TableCustom from "@/components/common/table/TableCustom"
import SelectFilter from "@/components/common/filter/SelectFilter"
import ButtonGoToGuide from "../../panduan/components/ButtonGoToGuide"

const FieldOfCooperationView = () => {
 const { columns } = FieldOfCooperationViewModel()
  const { fieldOfCooperation, loading, meta } = useGetFieldOfCooperation()
  
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        buttonGroup={[
           {
            type: 'custom',
            element: <ButtonGoToGuide titleGuide="Bidang Kerjasama" valueGuide="WEBSITE_UTAMA_BIDANG_KERJASAMA" />,
          },
          {
            label: '',
            onClick: () => {},
            type: 'add',
            element: <ButtonAddFieldOfCooperation />,
          },
        ]}
        label="Bidang Kerjasama"
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
        data={fieldOfCooperation}
        loading={loading}
        meta={meta}
        isShowLimit={false}
      />
    </div>
  )
}

export default FieldOfCooperationView