import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup";
import UnitViewModel from "./UnitViewModel";
import TableCustom from "@/components/common/table/TableCustom";
import { dummyData } from "./data";

const UnitView = () => {
  const { columns, goToAdd } = UnitViewModel();
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        label="Data Unit"
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
        placeHolderSearch="Cari Unit"
      />
    </div>
  );
};

export default UnitView;
