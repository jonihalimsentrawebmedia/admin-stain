import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup";
import useGetEducationalLevel from "./controller/useGetEducationalLevel";
import EducationalLevelViewModel from "./EducationalLevelViewModel";
import ButtonAddEducationalLevel from "./components/ButtonAddEducationalLevel";
import TableCustom from "@/components/common/table/TableCustom";

const EducationalLevelView = () => {
   const { columns } = EducationalLevelViewModel();
  const { educationalLevel, loading ,meta} = useGetEducationalLevel({});

  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        label="Jenjang Pendidikan"
        buttonGroup={[
          {
            label: "",
            onClick: () => {},
            type: "add",
            element: <ButtonAddEducationalLevel />,
          },
        ]}
      />

      <TableCustom
        columns={columns}
        data={educationalLevel}
        loading={loading}
        meta={meta}
        placeHolderSearch="Cari Jenjang Pendidikan"
        tdClassName='whitespace-pre-line'
        thClassName='whitespace-pre-line'
      />
    </div>
  );
}

export default EducationalLevelView