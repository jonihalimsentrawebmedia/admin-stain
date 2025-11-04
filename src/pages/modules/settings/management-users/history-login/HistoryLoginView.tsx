import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup";
import HistoryLoginViewModel from "./HistoryLoginViewModel";
import TableCustom from "@/components/common/table/TableCustom";
import SelectFilter from "@/components/common/filter/SelectFilter";
import { dummyData } from "./data";


const HistoryLoginView = () => {
   const { columns} = HistoryLoginViewModel();
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        label="Histori Login"
        buttonGroup={[
        
        ]}
      />

      <TableCustom
        addFilter={<SelectFilter label="Level User" options={[]} />}
        columns={columns}
        data={dummyData}
        placeHolderSearch="Cari  User"
      />
    </div>
  );
}

export default HistoryLoginView