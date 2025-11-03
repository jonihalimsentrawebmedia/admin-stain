import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup";
import InstitutionViewModel from "./InstitutionViewModel";
import TableCustom from "@/components/common/table/TableCustom";
import { dummyData } from "./data";

const InstitutionView = () => {
  const { columns, goToAdd } = InstitutionViewModel();
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        label="Data Lembaga"
        buttonGroup={[
          {
            label: "Tambah Data",
            onClick: () => goToAdd(),
            type: "add",
          },
        ]}
      />

      <TableCustom columns={columns} data={dummyData} />
    </div>
  );
};

export default InstitutionView;
