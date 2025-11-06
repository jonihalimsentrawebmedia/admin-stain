import ChangePasswordViewModel from "./ChangePasswordViewModel";
import BG from "@/assets/img/bg-modules.png";
import PATERN from "@/assets/img/patern.png";
import LOGO from "@/assets/img/logo.png";
import { Card, CardContent } from "@/components/ui/card";
import ButtonBack from "@/components/common/button/ButtonBack";
import { Form } from "@/components/ui/form";
import { InputText } from "@/components/common/form/InputText";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

const ChangePasswordView = () => {
  const { form, getClass, handleSave, loading, validations } =
    ChangePasswordViewModel();
  return (
    <div
      style={{
        backgroundImage: `url(${BG})`,
      }}
      className={`w-screen h-screen object-cover bg-cover bg-fixed relative  flex justify-center items-center `}
    >
      <Card className="max-w-3xl w-full backdrop-blur-md bg-white/40 ">
        <CardContent className="flex flex-col gap-4">
          <div className="bg-green-800 rounded-lg">
            <div
              style={{
                backgroundImage: `url(${PATERN})`,
              }}
              className=" p-4 rounded-lg bg-cover object-cover flex w-full justify-between items-center"
            >
              <div className="flex gap-2 items-center">
                <div className="w-[100px] bg-white h-[100px] rounded-xl flex justify-center items-center">
                  <img src={LOGO} alt="logo" width={52} height={52} />
                </div>
                <div>
                  {" "}
                  <div className="text-white">
                    Manajemen Pengelolaan Website
                  </div>
                  <div className="text-2xl font-bold text-white">
                    Sekolah Tinggi Agama Islam Negeri MADINA
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-white flex flex-col gap-4 p-4">
            <ButtonBack />
            <p className="text-neutral font-medium text-3xl">
              Buat Password Baru
            </p>
            <p>Silahkan buat password baru untuk akun anda</p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSave)}
                className="flex flex-col gap-4"
              >
                <InputText
                  form={form}
                  name="password"
                  className=""
                  label="Password Baru"
                  type="password"
                  placeholder="Password Baru"
                />
                <InputText
                  form={form}
                  name="confirm_password"
                  className=""
                  label="Konfirmasi Password Baru"
                  type="password"
                  placeholder="Konfirmasi Password Baru"
                />

                <Button
                  disabled={loading}
                  className="bg-primary w-fit mx-auto text-white                "
                >
                  Simpan
                </Button>
                <div className="mt-5 text-sm">
                  <p className="font-medium text-neutral">Ketentuan Password</p>
                  <ul className="mt-2 space-y-1">
                    <li className={getClass(validations.length)}>
                      {validations.length ? (
                        <Check size={16} />
                      ) : (
                        <X size={16} />
                      )}{" "}
                      Minimal 8 karakter
                    </li>
                    <li className={getClass(validations.upper)}>
                      {validations.upper ? (
                        <Check size={16} />
                      ) : (
                        <X size={16} />
                      )}{" "}
                      Mengandung huruf besar (A–Z)
                    </li>
                    <li className={getClass(validations.lower)}>
                      {validations.lower ? (
                        <Check size={16} />
                      ) : (
                        <X size={16} />
                      )}{" "}
                      Mengandung huruf kecil (a–z)
                    </li>
                    <li className={getClass(validations.number)}>
                      {validations.number ? (
                        <Check size={16} />
                      ) : (
                        <X size={16} />
                      )}{" "}
                      Mengandung angka (0–9)
                    </li>
                    <li className={getClass(validations.symbol)}>
                      {validations.symbol ? (
                        <Check size={16} />
                      ) : (
                        <X size={16} />
                      )}{" "}
                      Mengandung simbol/karakter khusus (seperti ! @ # $ % ^ &
                      *)
                    </li>
                  </ul>
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangePasswordView;
