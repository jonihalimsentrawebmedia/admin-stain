import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup";
import LevelViewModel from "./LevelViewModel";
import { dummyData } from "./data";
import TableCustom from "@/components/common/table/TableCustom";

const LevelView = () => {
  const { columns, goToAdd } = LevelViewModel();
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        label="Level User"
        buttonGroup={[
          {
            label: "Tambah Data",
            onClick: () => goToAdd(),
            type: "add",
          },
        ]}
      />

      <TableCustom
        columns={columns}
        data={dummyData}
        placeHolderSearch="Cari Level User"
      />
    </div>
  );
};

export default LevelView;
