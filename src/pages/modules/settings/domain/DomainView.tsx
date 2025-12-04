import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup";
import DomainViewModel from "./DomainViewModel";
import TableCustom from "@/components/common/table/TableCustom";
import ButtonAddDomain from "./components/ButtonAddDomain";
import useGetDomain from "./controller/useGetDomain";

const DomainView = () => {
  const { columns } = DomainViewModel();

  const { domains, loading } = useGetDomain();
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
        data={domains}
        loading={loading}
        placeHolderSearch="Cari Domain"
      />
    </div>
  );
};

export default DomainView;
