import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup";
import useGetSatuanOrganisasi from "../controller/useGetSatuanOrganisasi";
import TableCustom from "@/components/common/table/TableCustom";
import MainDataUniversityViewModel from "./MainDataUniversityViewModel";

const MainDataUniversityView = () => {
  const { columns, goToAdd } = MainDataUniversityViewModel();
  const { loading, satuanOrganisasi ,meta} = useGetSatuanOrganisasi({
    kelompok: "UNIVERSITAS",
  });
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        label="Data Universitas"
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
        data={satuanOrganisasi}
        loading={loading}
        placeHolderSearch="Cari Universitas"
        meta={meta}
        isShowChoiceColumn
        tdClassName='whitespace-pre-line'
        thClassName='whitespace-pre-line'
      />
    </div>
  );
};

export default MainDataUniversityView;
