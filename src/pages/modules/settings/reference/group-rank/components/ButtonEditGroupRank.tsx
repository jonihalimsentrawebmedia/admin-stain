import { DialogCustom } from "@/components/common/dialog/DialogCustom";

import { Form } from "@/components/ui/form";
import { useState } from "react";
import { useForm } from "react-hook-form";

import ButtonForm from "@/components/common/button/ButtonForm";
import { InputText } from "@/components/common/form/InputText";
import { IconEdit } from "@/components/common/table/icon";
import {
  GroupRankResolver,
  type GroupRankList,
  type GroupRankType,
} from "../model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import AxiosClient from "@/provider/axios";
import { toast } from "react-toastify";
interface Props {
  data: GroupRankList;
}
const ButtonEditGroupRank = ({ data }: Props) => {
  const [open, setOpen] = useState(false);
  const form = useForm<GroupRankType>({
    resolver: zodResolver(GroupRankResolver),
  });

  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  async function handleSave(values: GroupRankType) {
    setLoading(true);
    try {
      const res = await AxiosClient.post(
        `/pengaturan/referensi/pangkat-golongan/${data.id_golongan}`,
        values
      );

      if (res.data.status) {
        toast.success(res.data.message);

        await queryClient.invalidateQueries({
          queryKey: ["settings-group-rank"],
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
        className="cursor-pointer"
        onClick={() => {
          setOpen(true);
          form.reset({
            ...data,
          });
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
                name="nama_golongan"
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
