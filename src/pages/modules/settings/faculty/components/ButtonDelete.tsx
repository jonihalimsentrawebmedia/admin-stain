import { DialogCustom } from "@/components/common/dialog/DialogCustom";
import { IconDelete } from "@/components/common/table/icon";
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";
import { useState } from "react";

const ButtonDelete = () => {
  const [open, setOpen] = useState(false);
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
        title={<p className="text-2xl text-red-500">Hapus Data Prodi?</p>}
      >
        <p>
          Anda akan menghapus prodi “Sastra Inggris”. Apakah Anda yakin untuk
          menghapus prodi yang dipilih?
        </p>

        <div className="flex gap-4 items-center justify-end">
          <Button
            onClick={() => setOpen(false)}
            className="bg-white border border-primary hover:bg-white/90 text-primary"
          >
            <X />
            Batal
          </Button>
          <Button className="bg-red-500 hover:bg-red-500/90 text-white">
            <Save />
            Simpan
          </Button>
        </div>
      </DialogCustom>
    </>
  );
};

export default ButtonDelete;
