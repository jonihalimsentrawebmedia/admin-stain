import { DialogCustom } from "@/components/common/dialog/DialogCustom";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ModuleForm from "./ModuleForm";
import ButtonForm from "@/components/common/button/ButtonForm";
import { IconEdit } from "@/components/common/table/icon";

const ButtonEditModule = () => {
  const [open, setOpen] = useState(false);
  const form = useForm();
  const [loading, setLoading] = useState(false);
  async function handleSave() {
    setLoading(true);
    setLoading(false);
  }
  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
        }}
      >
        <IconEdit />
      </button>

      <DialogCustom
        className="max-w-2xl! w-full!"
        open={open}
        setOpen={setOpen}
        title={<p className="text-2xl ">Edit Modul</p>}
      >
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSave)}
              className="flex flex-col gap-4"
            >
              <ModuleForm form={form} />
              <ButtonForm
                loading={loading}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </form>
          </Form>
        </div>
      </DialogCustom>
    </>
  );
};

export default ButtonEditModule;
