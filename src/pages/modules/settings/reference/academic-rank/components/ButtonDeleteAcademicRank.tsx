import { DialogCustom } from "@/components/common/dialog/DialogCustom";
import { IconDelete } from "@/components/common/table/icon";
import { Button } from "@/components/ui/button";
import { Trash2, X } from "lucide-react";
import { useState } from "react";

const ButtonDeleteAcademicRank = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="cursor-pointer"
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
        title={<p className="text-2xl text-red-500">Hapus Pangkat Akademik</p>}
      >
        <p>
         Anda akan menghapus Pangkat Akademik <span className="font-bold">“Guru Besar”</span>. Apakah Anda yakin untuk menghapus Pangkat Akademik yang dipilih?
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
            <Trash2 />
            Hapus
          </Button>
        </div>
      </DialogCustom>
    </>
  );
};

export default ButtonDeleteAcademicRank;
