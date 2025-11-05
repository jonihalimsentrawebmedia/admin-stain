import { DialogCustom } from "@/components/common/dialog/DialogCustom";

import { Form } from "@/components/ui/form";
import { useState } from "react";
import { useForm } from "react-hook-form";


import ButtonForm from "@/components/common/button/ButtonForm";
import { InputText } from "@/components/common/form/InputText";
import { IconEdit } from "@/components/common/table/icon";
interface Props{
    data:any
}
const ButtonEditGroupRank = ({data}:Props) => {
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
      className="cursor-pointer"
        onClick={() => {
          setOpen(true);
          form.reset({
            ...data
          })
        }}
      
      >
        <IconEdit />
      </button>

      <DialogCustom
        className="max-w-2xl! w-full!"
        open={open}
        setOpen={setOpen}
        title={<p className="text-2xl ">Edit Pangkat Golongan</p>}
      >
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSave)}
              className="flex flex-col gap-4"
            >
              <InputText
                form={form}
                name=""
                isRow
                label="Nama Pangkat Golongan"
                placeholder="Nama Pangkat Golongan"
              />
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

export default ButtonEditGroupRank;
