import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup";
import AcademicRankViewModel from "./AcademicRankViewModel";
import TableCustom from "@/components/common/table/TableCustom";
import ButtonAddAcademicRank from "./components/ButtonAddAcademicRank";
import useGetAcademicRank from "./controller/useGetAcademicRank";

const AcademicRankView = () => {
  const { columns } = AcademicRankViewModel();
  const { academicRank, loading ,meta} = useGetAcademicRank();

  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        label="Pangkat Akademik"
        buttonGroup={[
          {
            label: "",
            onClick: () => {},
            type: "add",
            element: <ButtonAddAcademicRank />,
          },
        ]}
      />

      <TableCustom
        columns={columns}
        data={academicRank}
        loading={loading}
        meta={meta}
        placeHolderSearch="Cari Pangkat Akademik"
        tdClassName='whitespace-pre-line'
        thClassName='whitespace-pre-line'
      />
    </div>
  );
};

export default AcademicRankView;
