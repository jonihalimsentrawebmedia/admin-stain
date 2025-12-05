import { DialogCustom } from "@/components/common/dialog/DialogCustom";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ModuleForm from "./ModuleForm";
import ButtonForm from "@/components/common/button/ButtonForm";
import { IconEdit } from "@/components/common/table/icon";
import { ModuleResolver, type ModuleList, type ModuleType } from "../model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import AxiosClient from "@/provider/axios";
import { toast } from "react-toastify";
interface Props {
  data: ModuleList;
}
const ButtonEditModule = ({ data }: Props) => {
  const [open, setOpen] = useState(false);
  const form = useForm<ModuleType>({
    resolver: zodResolver(ModuleResolver),
  });

  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  async function handleSave(values: ModuleType) {
    setLoading(true);
    try {
      const res = await AxiosClient.put(
        `/pengaturan/modules/${data.id_module}`,
        {
          ...values,
          urutan: Number(values.urutan),
        }
      );

      if (res.data.status) {
        toast.success(res.data.message);

        await queryClient.invalidateQueries({
          queryKey: ["modules-list"],
        });
        setOpen(false);
             form.reset();
      }
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Terjadi kesalahan, silakan coba lagi."
      );
    } finally {
      setLoading(false);
   
 
    }
  }
  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
          form.reset({
            controller: data.controller,
            kategori: data.kategori,
            nama_module: data.nama_module,
            urutan: data.urutan.toString(),
            gambar:data.gambar
          });
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
