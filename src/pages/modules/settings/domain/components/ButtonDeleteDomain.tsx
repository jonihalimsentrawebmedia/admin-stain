import { DialogCustom } from "@/components/common/dialog/DialogCustom";
import { IconDelete } from "@/components/common/table/icon";
import { Button } from "@/components/ui/button";
import { Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DetailField from "@/components/common/field/DetailField";
const ButtonDeleteDomain = () => {
  const [open, setOpen] = useState(false);
  const form = useForm();
  const fieldsConfig = [
    {
      name: "jenis_modul",
      label: "Jenis Modul",
    },
    {
      name: "kelompok",
      label: "Kelompok",
    },
    {
      name: "nama",
      label: "Nama",
    },
    {
      name: "domain",
      label: "Domain",
    },
    {
      name: "ip_server",
      label: "IP Server",
    },
    {
      name: "endpoint_be",
      label: "Endpoint BE",
    },
  ];
  useEffect(() => {
    form.reset({
      jenis_modul: "Website Utama",
      kelompok: "Universitas",
      nama: "Sekolah Tinggi Agama Islam Negeri Mandailing Natal",
      domain: "https://stain-madina.ac.id",
      ip_server: "115.103.5.55.2",
      endpoint_be: "https://be.stain-madina.ac.id",
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
        title={
          <p className="text-2xl text-red-500">
            Hapus Pengaturan Domain Public
          </p>
        }
      >
        <p>Apakah anda yakin untuk menghapus domain yang dipilih?</p>
        <div className="my-4 ">
          <DetailField data={fieldsConfig} form={form}  />
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

export default ButtonDeleteDomain;
