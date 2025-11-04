import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup";
import HistoryLoginDetailViewModel from "./HistoryLoginDetailViewModel";
import TableCustom from "@/components/common/table/TableCustom";
import { dummyDataDetail } from "../data";
import DetailField from "@/components/common/field/DetailField";

const HistoryLoginDetailView = () => {
  const { columns, fieldsConfig, form } = HistoryLoginDetailViewModel();
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup label="Lihat Log Aktivitas" buttonGroup={[]} />
      <div className="rounded-xl bg-[#F5FFFA] border border-primary p-4">
        <DetailField data={fieldsConfig} form={form} isRow />
      </div>

      <TableCustom
        columns={columns}
        data={dummyDataDetail}
        isShowPagination={false}
        isShowFilter={false}
      />
    </div>
  );
};

export default HistoryLoginDetailView;
