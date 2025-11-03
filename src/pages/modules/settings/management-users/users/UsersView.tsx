import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup";
import UsersViewModel from "./UsersViewModel";
import TableCustom from "@/components/common/table/TableCustom";
import { dummyData } from "./data";
import SelectFilter from "@/components/common/filter/SelectFilter";

const UsersView = () => {
  const { columns, goToAdd } = UsersViewModel();
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
        addFilter={<SelectFilter label="Level User" options={[]} />}
        columns={columns}
        data={dummyData}
        placeHolderSearch="Cari  User"
      />
    </div>
  );
};

export default UsersView;
