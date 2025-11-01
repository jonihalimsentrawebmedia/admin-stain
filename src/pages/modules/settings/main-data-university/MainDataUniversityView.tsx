import { Button } from "@/components/ui/button";
import MainDataUniversityDetail from "./components/MainDataUniversityDetail";
import MainDataUniversityForm from "./components/MainDataUniversityForm";
import MainDataUniversityViewModel from "./MainDataUniversityViewModel";
import { Pencil } from "lucide-react";

const MainDataUniversityView = () => {
  const { form, handleSave, loadingSubmit, isDetail, setIsDetail } =
    MainDataUniversityViewModel();
  return (
    <div className=" pb-20">
      <div
        className="flex gap-4 items-center justify-between
        "
      >
        <div
          className="text-2xl !text-[#464646] font-medium
            "
        >
          Data Utama Universitas
        </div>

        {isDetail && (
          <Button
            onClick={() => {
              setIsDetail(false);
            }}
            variant={"outline"}
            className="border border-primary bg-white text-primary hover:text-primary"
          >
            <Pencil />
            Edit Data
          </Button>
        )}
      </div>
      {isDetail ? (
        <MainDataUniversityDetail form={form} />
      ) : (
        <MainDataUniversityForm
          form={form}
          handleSave={handleSave}
          loading={loadingSubmit}
        />
      )}
    </div>
  );
};

export default MainDataUniversityView;
