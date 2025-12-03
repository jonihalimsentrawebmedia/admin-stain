import { DialogCustom } from "@/components/common/dialog/DialogCustom";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiPlus } from "react-icons/hi";

import ButtonForm from "@/components/common/button/ButtonForm";
import { InputText } from "@/components/common/form/InputText";
import { AcademicRankResolver, type AcademicRankType } from "../model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import AxiosClient from "@/provider/axios";
import { toast } from "react-toastify";

const ButtonAddAcademicRank = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<AcademicRankType>({
    resolver: zodResolver(AcademicRankResolver),
  });

  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  async function handleSave(data: AcademicRankType) {
    setLoading(true);
    try {
      const res = await AxiosClient.post(
        `/pengaturan/referensi/pangkat-akademik`,
        data
      );

      if (res.data.status) {
        toast.success(res.data.message);

        await queryClient.invalidateQueries({
          queryKey: ["settings-academic-rank"],
        });
        setOpen(false);
      }
    } catch (err: any) {
      toast.error(
        err?.response?.data?.error || "Terjadi kesalahan, silakan coba lagi."
      );
    } finally {
      setLoading(false);
      setOpen(false);
      form.reset();
    }
  }
  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
        variant={"outline"}
        className={"bg-white text-primary border-primary hover:text-primary"}
      >
        <HiPlus />
        Tambah Data
      </Button>

      <DialogCustom
        className="max-w-2xl! w-full!"
        open={open}
        setOpen={setOpen}
        title={<p className="text-2xl ">Tambah Pangkat Akademik</p>}
      >
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSave)}
              className="flex flex-col gap-4"
            >
              <InputText
                form={form}
                name="nama_akademik"
                isRow
                label="Nama Pangkat Akademik"
                placeholder="Nama Pangkat Akademik"
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

export default ButtonAddAcademicRank;
