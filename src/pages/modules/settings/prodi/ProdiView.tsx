import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup";
import TableCustom from "@/components/common/table/TableCustom";
import { data } from "./data";
import ProdiViewModel from "./ProdiViewModel";
import SelectFilter from "@/components/common/filter/SelectFilter";

const ProdiView = () => {
  const { columns, goToAdd } = ProdiViewModel();
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        label="Data Prodi"
        buttonGroup={[
          {
            label: "Tambah Data",
            onClick: () => goToAdd(),
            type: "add",
          },
        ]}
      />

      <TableCustom
        addFilter={<SelectFilter label="Fakultas Asal" options={[]} />}
        columns={columns}
        data={data}
      />
    </div>
  );
};

export default ProdiView;
