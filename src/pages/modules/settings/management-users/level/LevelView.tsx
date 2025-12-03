import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup";
import LevelViewModel from "./LevelViewModel";
import TableCustom from "@/components/common/table/TableCustom";
import useGetLevelUser from "./controller/useGetLevelUser";

const LevelView = () => {
  const { columns, goToAdd } = LevelViewModel();
  const {levelUser,loading}=useGetLevelUser()
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        label="Level User"
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
        data={levelUser}
        loading={loading}
        placeHolderSearch="Cari Level User"
      />
    </div>
  );
};

export default LevelView;
