import { DialogCustom } from "@/components/common/dialog/DialogCustom";
import { Button } from "@/components/ui/button";
import { X, XCircle, XCircleIcon } from "lucide-react";
import { useState } from "react";
import useEditStatusUser from "../controller/useEditStatusUser";

const ButtonNonActive = () => {
  const [open, setOpen] = useState(false);
  const { handleUpdate, loading } = useEditStatusUser({
    status: "N"
  })
  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
        variant={"outline"}
        className="bg-white hover:text-[#CDA327] text-[#CDA327] border-[#CDA327]"
      >
        <XCircle className="text-[#CDA327]" />
        Nonaktifkan User
      </Button>
      <DialogCustom
        className="max-w-2xl! w-full!"
        open={open}
        setOpen={setOpen}

        title={<p className="text-2xl ">Nonaktifkan User?</p>}
      >
        <p>Apakah anda yakin ingin menonaktifkan user ini?</p>

        <div className="flex gap-4 items-center justify-end">
          <Button
            onClick={() => setOpen(false)}
            disabled={loading}
            className="bg-white border border-primary hover:bg-white/90 text-primary"
          >
            <X />
            Batal
          </Button>
          <Button onClick={handleUpdate} disabled={loading} className="bg-[#CDA327] hover:bg-[#CDA327]/90 text-white">
            <XCircleIcon />
            Nonaktifkan
          </Button>
        </div>
      </DialogCustom>
    </>
  );
};

export default ButtonNonActive;
