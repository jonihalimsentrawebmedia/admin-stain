import { DialogCustom } from "@/components/common/dialog/DialogCustom";
import DetailField from "@/components/common/field/DetailField";
import { InputCheckbox } from "@/components/common/form/InputCheckbox";
import { InputText } from "@/components/common/form/InputText";
import { SelectCustom } from "@/components/common/form/SelectCustom";
import { Form } from "@/components/ui/form";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { optionSatuan } from "../data";
import { InputRadio } from "@/components/common/form/InputRadio";
import { IconEdit } from "@/components/common/table/icon";

const ButtonEditLevelUser = () => {
  const form = useForm();
  const [open, setOpen] = useState(false);
  async function handleSave() {}
  const field = [
    {
      label: "Nama Lengkap",
      name: "nama_lengkap",
    },
    {
      label: "Jabatan",
      name: "jabatan",
    },
    {
      label: "Level User 1",
      name: "level_user",
    },
  ];

  useEffect(() => {
    form.reset({
      nama_lengkap: "Rudi Tabuti",
      level_user: "Kaprodi",
      jabatan: "Admin Fakultas",
    });
  }, []);
  return (
    <>
      <div
        onClick={() => {
          setOpen(true);
        }}
        className="flex items-center cursor-pointer gap-4"
      >
        <IconEdit />
      </div>
      <DialogCustom
        className="max-w-2xl! w-full!"
        open={open}
        setOpen={setOpen}
        title={<p className="text-2xl ">Tambah Level User</p>}
      >
        <div className="flex flex-col gap-4">
          <div className="p-4 border-primary border rounded-xl bg-[#F5FFFA]">
            <DetailField data={field} form={form} isRow />
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSave)}
              className="flex flex-col gap-4"
            >
              <SelectCustom
                data={[]}
                name="level_user"
                placeholder="Pilih"
                label="Level User"
                isFilter
                isRow
                level1
                form={form}
                inputClassName="lg:max-w-[300px]"
              />
              <InputRadio
                isRow
                form={form}
                name="ada_satuan_kerja"
                label="Ada Satuan Kerja?"
                data={[
                  {
                    label: "Ya",
                    value: "Ya",
                  },
                  {
                    label: "Tidak",
                    value: "Tidak",
                  },
                ]}
              />
              {form.watch("ada_satuan_kerja") == "Ya" ? (
                <InputCheckbox
                  isRow
                  form={form}
                  name="satuan_kerja"
                  label="Pilih Satuan Kerja"
                  data={optionSatuan}
                  isSingle
                  isGrid
                />
              ) : (
                <InputText
                  form={form}
                  name="satuan_kerja"
                  label="Pilih Satuan Kerja"
                  defaultValue="Tidak Ada Satker"
                  placeholder="Tidak Ada Satker"
                  isRow
                  isDisabled
                  inputClassName="lg:max-w-[300px]"
                />
              )}
            </form>
          </Form>
        </div>
      </DialogCustom>
    </>
  );
};

export default ButtonEditLevelUser;
