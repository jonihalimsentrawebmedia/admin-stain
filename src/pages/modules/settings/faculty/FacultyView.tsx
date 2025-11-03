import TableCustom from "@/components/common/table/TableCustom";
import FacultyViewModel from "./FacultyViewModel";
import { dataDummy } from "./data";
import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup";

const FacultyView = () => {
  const { columns, goToAdd } = FacultyViewModel();
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        label="Data Fakultas"
        buttonGroup={[
          {
            label: "Tambah Data",
            onClick: () => goToAdd(),
            type: "add",
          },
        ]}
      />
      <TableCustom columns={columns} data={dataDummy} />
    </div>
  );
};

export default FacultyView;
