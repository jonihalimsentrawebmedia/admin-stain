import LoginViewModel from "./LoginViewModel";
import BG from "@/assets/img/bg-modules.png";
import PATERN from "@/assets/img/patern.png";
import LOGO from "@/assets/img/logo.png";
import { Card, CardContent } from "@/components/ui/card";
import { InputText } from "@/components/common/form/InputText";
import { Form } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@radix-ui/react-label";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

const LoginView = () => {
  const { form, handleSave, loading } = LoginViewModel();
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
            <p>Silahkan login terlebih dahulu agar dapat mengakses aplikasi.</p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSave)}
                className="flex flex-col gap-4"
              >
                <InputText
                  form={form}
                  name="email"
                  className=""
                  label="Email"
                />
                <InputText
                  form={form}
                  name="password"
                  className=""
                  label="Password"
                  type="password"
                  suffix={<Eye/>}
                />
                <InputText
                  form={form}
                  name="password"
                  className=""
                  type="number"
                  label={
                    <p>
                      Hasil dari 4x2{" "}
                      <span className="text-blue-500">(ganti soal)</span>
                    </p>
                  }
                />
                <div className="flex gap-4 items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox id="isRemember" />
                    <Label
                      htmlFor="isRemember"
                      className="text-neutral font-normal"
                    >
                      Ingat Saya
                    </Label>
                  </div>
                  <Link
                    to={"/forget-password"}
                    className="underline text-blue-500"
                  >
                    Lupa Password?
                  </Link>
                </div>

                <Button
                  disabled={loading}
                  className="bg-primary w-fit mx-auto text-white                "
                >
                  Login
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginView;
