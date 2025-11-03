import { DialogCustom } from "@/components/common/dialog/DialogCustom";
import { Button } from "@/components/ui/button";
import { Check, X,  } from "lucide-react";
import { useState } from "react";

const ButtonActive = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
        variant={"outline"}
        className="bg-white hover:text-[#27CD7F] text-[#27CD7F] border-[#27CD7F]"
      >
        <Check className="text-[#27CD7F]" />
        Aktifkan User
      </Button>
      <DialogCustom
        className="max-w-2xl! w-full!"
        open={open}
        setOpen={setOpen}
        title={<p className="text-2xl ">Aktifkan User?</p>}
      >
        <p>Apakah anda yakin ingin mengaktifkan user ini?</p>

        <div className="flex gap-4 items-center justify-end">
          <Button
            onClick={() => setOpen(false)}
            className="bg-white border border-primary hover:bg-white/90 text-primary"
          >
            <X />
            Batal
          </Button>
          <Button className="bg-[#27CD7F] hover:bg-[#27CD7F]/90 text-white">
            <Check />
            Nonaktifkan
          </Button>
        </div>
      </DialogCustom>
    </>
  );
};

export default ButtonActive;
