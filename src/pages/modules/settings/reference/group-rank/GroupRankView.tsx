import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup";
import GroupRankViewModel from "./GroupRankViewModel";
import TableCustom from "@/components/common/table/TableCustom";
import ButtonAddGroupRank from "./components/ButtonAddGroupRank";
import useGetGroupRank from "./controller/useGetGroupRank";

const GroupRankView = () => {
  const { columns } = GroupRankViewModel();

  const { groupRank, loading ,meta} = useGetGroupRank();
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        label="Pangkat Golongan"
        buttonGroup={[
          {
            label: "",
            onClick: () => {},
            type: "add",
            element: <ButtonAddGroupRank />,
          },
        ]}
      />

      <TableCustom
        loading={loading}
        columns={columns}
        data={groupRank}
        placeHolderSearch="Cari Pangkat Golongan"
        meta={meta}
      />
    </div>
  );
};

export default GroupRankView;
