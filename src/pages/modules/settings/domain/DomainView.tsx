import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup";
import DomainViewModel from "./DomainViewModel"
import { dummyData } from "./data";
import TableCustom from "@/components/common/table/TableCustom";
import ButtonAddDomain from "./components/ButtonAddDomain";

const DomainView = () => {
    const {columns}=DomainViewModel()
   return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        label="Pengaturan Domain"
        buttonGroup={[
          {
            label: "Tambah Data",
            onClick: () => {},
            type: "add",
            element: <ButtonAddDomain />,
          },
        ]}
      />

      <TableCustom
        columns={columns}
        data={dummyData}
        placeHolderSearch="Cari Domain"
      />
    </div>
  );
}

export default DomainView