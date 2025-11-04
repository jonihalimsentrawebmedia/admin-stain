import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup";
import NewsCategoryViewModel from "./NewsCategoryViewModel";
import TableCustom from "@/components/common/table/TableCustom";
import { dummyData } from "./data";

const NewsCategoryView = () => {
  const { columns } = NewsCategoryViewModel();
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup label="Kategori Berita" buttonGroup={[]} />

      <TableCustom
        columns={columns}
        data={dummyData}
        placeHolderSearch="Cari Kategori Berita"
      />
    </div>
  );
};

export default NewsCategoryView;
