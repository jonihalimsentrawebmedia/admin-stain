import TableCustom from "@/components/common/table/TableCustom";
import FacultyViewModel from "./FacultyViewModel";

import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup";
import useGetSatuanOrganisasi from "../controller/useGetSatuanOrganisasi";

const FacultyView = () => {
  const { columns, goToAdd } = FacultyViewModel();
  const { satuanOrganisasi, loading ,meta} = useGetSatuanOrganisasi({
    kelompok: "FAKULTAS",
  });
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
      <TableCustom
        loading={loading}
        columns={columns}
        data={satuanOrganisasi}
        meta={meta}
        isShowChoiceColumn
      />
    </div>
  );
};

export default FacultyView;
