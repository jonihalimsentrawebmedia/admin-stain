import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup";
import UsersViewModel from "./UsersViewModel";
import TableCustom from "@/components/common/table/TableCustom";
import { dummyData } from "./data";
import SelectFilter from "@/components/common/filter/SelectFilter";
import useGetUsers from "./controller/useGetUsers";
import useGetLevelUser from "../level/controller/useGetLevelUser";

const UsersView = () => {
  const { columns, goToAdd } = UsersViewModel();
  const { loading, users } = useGetUsers();
  const { levelUser } = useGetLevelUser();
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        label="Data User"
        buttonGroup={[
          {
            label: "Tambah Data",
            onClick: () => goToAdd(),
            type: "add",
          },
        ]}
      />

      <TableCustom
        addFilter={
          <SelectFilter
            label="Level User"
            options={levelUser.map((item) => {
              return {
                label: item.nama,
                value: item.id_level,
              };
            })}
          />
        }
        columns={columns}
        data={users}
        loading={loading}
        placeHolderSearch="Cari  User"
      />
    </div>
  );
};

export default UsersView;
