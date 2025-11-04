import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup";
import GroupRankViewModel from "./GroupRankViewModel";
import TableCustom from "@/components/common/table/TableCustom";
import { dummyData } from "./data";


const GroupRankView = () => {
  const { columns } = GroupRankViewModel();
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup label="Pangkat Golongan" buttonGroup={[]} />

      <TableCustom
        columns={columns}
        data={dummyData}
        placeHolderSearch="Cari Pangkat Golongan"
      />
    </div>
  );
}

export default GroupRankView