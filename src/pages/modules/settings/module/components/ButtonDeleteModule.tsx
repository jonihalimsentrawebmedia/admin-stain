import { DialogCustom } from "@/components/common/dialog/DialogCustom";
import { IconDelete } from "@/components/common/table/icon";
import { Button } from "@/components/ui/button";
import { Save, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import GEAR from "@/assets/img/gear.png";
import { useForm } from "react-hook-form";
import DetailField from "@/components/common/field/DetailField";
const ButtonDeleteModule = () => {
  const [open, setOpen] = useState(false);
  const form = useForm();
  const fieldsConfig = [
    {
      name: "nama_modul",
      label: "Nama Modul",
    },
    {
      name: "controller",
      label: "Controller",
    },
    {
      name: "kategori",
      label: "Kategori",
    },
    {
      name: "urutan",
      label: "Urutan",
    },
  ];
  useEffect(() => {
    form.reset({
      nama_modul: "Pengaturan",
      controller: "pengaturan",
      kategori: "Pengaturan",
      urutan: "1",
    });
  }, []);
  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
        }}
      >
        {" "}
        <IconDelete />
      </button>
      <DialogCustom
        className="max-w-2xl! w-full!"
        open={open}
        setOpen={setOpen}
        title={<p className="text-2xl text-red-500">Hapus Modul?</p>}
      >
        <p>Apakah anda yakin untuk menghapus modul yang dipilih?</p>
        <div className="my-4 ">
          <div className="mx-auto max-w-[200px] mb-4 bg-[#F5FFFA] border border-primary rounded-xl p-4 flex justify-center items-center">
            <img src={GEAR} alt="" />
          </div>
          <DetailField data={fieldsConfig} form={form} />
        </div>

        <div className="flex gap-4 items-center justify-end">
          <Button
            onClick={() => setOpen(false)}
            className="bg-white border border-primary hover:bg-white/90 text-primary"
          >
            <X />
            Batal
          </Button>
          <Button className="bg-red-500 hover:bg-red-500/90 text-white">
            <Trash2 />
            Hapus
          </Button>
        </div>
      </DialogCustom>
    </>
  );
};

export default ButtonDeleteModule;
