import { DialogCustom } from "@/components/common/dialog/DialogCustom";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ButtonForm from "@/components/common/button/ButtonForm";
import { IconEdit } from "@/components/common/table/icon";
import DomainForm from "./DomainForm";
import { DomainResolver, type DomainList, type DomainType } from "../model";
import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import AxiosClient from "@/provider/axios";
import { toast } from "react-toastify";
interface Props{
  data:DomainList
}
const ButtonEditDomain = ({data}:Props) => {
  const [open, setOpen] = useState(false);
 const form = useForm<DomainType>({
    resolver: zodResolver(DomainResolver),
  });

  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  async function handleSave(values: DomainType) {
    setLoading(true);
    try {
      const res = await AxiosClient.put(`/pengaturan/domains/${data.id_domain}`, values);

      if (res.data.status) {
        toast.success(res.data.message);

        await queryClient.invalidateQueries({
          queryKey: ["settings-domain"],
        });
        setOpen(false);
             form.reset();
      }
    } catch (err: any) {
      console.log(err)
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
        title={<p className="text-2xl ">Edit Pengaturan Domain Public</p>}
      >
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSave)}
              className="flex flex-col gap-4"
            >
              <DomainForm form={form} />
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

export default ButtonEditDomain;
