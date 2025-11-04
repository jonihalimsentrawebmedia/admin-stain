import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup";
import ModuleViewModel from "./ModuleViewModel";
import TableCustom from "@/components/common/table/TableCustom";
import { dummyData } from "./data";
import ButtonAddModule from "./components/ButtonAddModule";

const ModuleView = () => {
  const { columns } = ModuleViewModel();

  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        label="Modul"
        buttonGroup={[
          {
            label: "Tambah Data",
            onClick: () => {},
            type: "add",
            element: <ButtonAddModule />,
          },
        ]}
      />

      <TableCustom
        columns={columns}
        data={dummyData}
        placeHolderSearch="Cari Modul"
      />
    </div>
  );
};

export default ModuleView;
