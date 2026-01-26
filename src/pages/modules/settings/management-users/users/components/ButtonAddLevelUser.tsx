import { DialogCustom } from "@/components/common/dialog/DialogCustom";
import DetailField from "@/components/common/field/DetailField";
import { InputCheckbox } from "@/components/common/form/InputCheckbox";
import { InputText } from "@/components/common/form/InputText";
import { SelectCustom } from "@/components/common/form/SelectCustom";
import { Form } from "@/components/ui/form";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import type { UserList } from "../model";
import useGetUsersDetail from "../controller/useGetUsersDetail";

import { Skeleton } from "@/components/ui/skeleton";

import type { SatuanOrganisasiList } from "../../../model";

import type { LevelUserList } from "../../level/model";

import usePostLevelUser from "../controller/usePostLevelUser";
import ButtonForm from "@/components/common/button/ButtonForm";
interface Props {
  data: UserList
  levelUser: LevelUserList[]
  satuanOrganisasi: SatuanOrganisasiList[]
}
const ButtonAddLevelUser = ({ data, levelUser, satuanOrganisasi }: Props) => {
  const {handleSave,loading:loadingSave,open,setOpen,form}=usePostLevelUser({id_user:data.id_user})
  const { loading, user } = useGetUsersDetail({ idUser: data.id_user })

   const formDetail=useForm()

  
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
      name: "level_users_multi",
      component: (
        <div>
          {data.level_users.length == 1 ? data.level_users[0] : <ul className="ml-2 pl-2 list-outside list-disc">
            {data.level_users.map((item) => (
              <li key={data.id_user + item}>{item}</li>
            ))}

          </ul>}
        </div>
      )
    },
  ];

  const idLevelUser = form.watch("id_level_user");
  const [isSatuanKerja, setIsSatuanKerja] = useState(false);

  useEffect(() => {
    if (idLevelUser) {
      const temp = levelUser.filter((item) => item.id_level == idLevelUser)[0];

      setIsSatuanKerja(temp.is_satker);
    }
  }, [idLevelUser]);


  useEffect(() => {
    if (user) {
      formDetail.reset({
       ...user
      })
    }
  }, [user])


  return (
    <>
      <div
        onClick={() => {
          setOpen(true);
         

        }}
        className="flex items-center space-x-4 cursor-pointer "
      >
        <Plus className="text-primary size-4" />
        <div className="text-[#464646]">Tambah Level</div>
      </div>
      <DialogCustom
        className="max-w-2xl! w-full! rounded"
        open={open}
        setOpen={setOpen}
        title={<p className="text-2xl ">Tambah Level User</p>}
      >
        <div className="flex flex-col gap-4">
          <div className="p-4 border-primary border rounded-xl bg-[#F5FFFA]">
            {loading ? <Skeleton className="h-[100px]" /> : <DetailField data={field} form={formDetail} isRow />}
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
              <SelectCustom
                data={levelUser.map((item) => {
                  return {
                    value: item.id_level,
                    label: item.nama,
                  };
                })}
                name="id_level_user"
                label="Level User"
                placeholder="Masukkan Level User"
                form={form}
                isRow
                level5
                inputClassName="lg:max-w-[300px]"
              />

              {isSatuanKerja ? (
                <InputCheckbox
                  isRow
                  form={form}
                  name="list_unit"
                  label="Pilih Satuan Kerja"
                  data={satuanOrganisasi.map((item) => {
                    return {
                      label: item.nama,
                      value: item.id_satuan_organisasi,
                    };
                  })}
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
              <ButtonForm loading={loadingSave}/>
            </form>
          </Form>
        </div>
      </DialogCustom>
    </>
  );
};

export default ButtonAddLevelUser;
