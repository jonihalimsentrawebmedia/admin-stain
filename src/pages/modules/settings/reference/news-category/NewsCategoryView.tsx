import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup";
import NewsCategoryViewModel from "./NewsCategoryViewModel";
import TableCustom from "@/components/common/table/TableCustom";
import ButtonAddNewsCategory from "./components/ButtonAddNewsCategory";
import useGetNewsCategory from "./controller/useGetNewsCategory";

const NewsCategoryView = () => {
  const { columns } = NewsCategoryViewModel();
  const { loading, newsCategory } = useGetNewsCategory();
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        label="Kategori Berita"
        buttonGroup={[
          {
            label: "",
            onClick: () => {},
            type: "add",
            element: <ButtonAddNewsCategory />,
          },
        ]}
      />

      <TableCustom
        columns={columns}
        data={newsCategory}
        thClassName="text-start"
        tdClassName="text-start"
        loading={loading}
        placeHolderSearch="Cari Kategori Berita"
      />
    </div>
  );
};

export default NewsCategoryView;
