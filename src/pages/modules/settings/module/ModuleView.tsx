import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup";
import ModuleViewModel from "./ModuleViewModel";
import TableCustom from "@/components/common/table/TableCustom";
import { dummyData } from "./data";
import ButtonAddModule from "./components/ButtonAddModule";
import useGetModules from "./conntroller/useGetModules";

const ModuleView = () => {
  const { columns } = ModuleViewModel();
  const { loading, modules } = useGetModules();
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
        data={modules}
        loading={loading}
        placeHolderSearch="Cari Modul"
      />
    </div>
  );
};

export default ModuleView;
