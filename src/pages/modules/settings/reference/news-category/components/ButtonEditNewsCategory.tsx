import { DialogCustom } from "@/components/common/dialog/DialogCustom";

import { Form } from "@/components/ui/form";
import { useState } from "react";
import { useForm } from "react-hook-form";

import ButtonForm from "@/components/common/button/ButtonForm";
import { InputText } from "@/components/common/form/InputText";
import { IconEdit } from "@/components/common/table/icon";
import {
  NewsCategoryResolver,
  type NewsCategoryList,
  type NewsCategoryType,
} from "../model";
import AxiosClient from "@/provider/axios";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
interface Props {
  data: NewsCategoryList;
}
const ButtonEditNewsCategory = ({ data }: Props) => {
  const [open, setOpen] = useState(false);
  const form = useForm<NewsCategoryType>({
    resolver: zodResolver(NewsCategoryResolver),
  });

  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  async function handleSave(values: NewsCategoryType) {
    setLoading(true);
    try {
      const res = await AxiosClient.put(
        `/pengaturan/referensi/kategori-berita/${data.id_kategori}`,
        values
      );

      if (res.data.status) {
        toast.success(res.data.message);

        await queryClient.invalidateQueries({
          queryKey: ["settings-news-category"],
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
    setLoading(false);
  }
  return (
    <>
      <button
        className="cursor-pointer"
        onClick={() => {
          setOpen(true);

          form.reset({
            nama_kategori: data.nama_kategori,
          });
        }}
      >
        <IconEdit />
      </button>

      <DialogCustom
        className="max-w-2xl! w-full!"
        open={open}
        setOpen={setOpen}
        title={<p className="text-2xl ">Edit Kategori Berita</p>}
      >
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSave)}
              className="flex flex-col gap-4"
            >
              <InputText
                form={form}
                name="nama_kategori"
                isRow
                label="Nama Kategori"
                placeholder="Nama Kategori"
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

export default ButtonEditNewsCategory;
