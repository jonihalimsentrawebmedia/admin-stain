import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup";
import AcademicRankViewModel from "./AcademicRankViewModel";
import TableCustom from "@/components/common/table/TableCustom";
import { dummyData } from "./data";


const AcademicRankView = () => {
  const { columns } = AcademicRankViewModel();
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup label="Pangkat Akademik" buttonGroup={[]} />

      <TableCustom
        columns={columns}
        data={dummyData}
        placeHolderSearch="Cari Pangkat Akademik"
      />
    </div>
  );
}

export default AcademicRankView