import {Form} from "@/components/ui/form.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Label} from "@radix-ui/react-label";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import LoginViewModel from "@/pages/login/LoginViewModel.tsx";
import CaptchaMath from "@/pages/login/component/captchaMath.tsx";
import TextInput from "@/components/common/form/TextInput.tsx";

export const FormLogin = () => {
  const {form, handleSave, loading, setSameValue} = LoginViewModel();

  return (
    <>
      <div className="rounded-lg bg-white flex flex-col gap-4 p-4">
        <p>Silahkan login terlebih dahulu agar dapat mengakses aplikasi.</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSave)}
            className="flex flex-col gap-4"
          >
            <TextInput
              placeholder={'Email'}
              form={form}
              name="email"
              label="Email"
            />
            <TextInput
              placeholder={'Password'}
              form={form}
              name="password"
              label="Password"
              type="password"
            />

            <CaptchaMath setSameAction={setSameValue}/>

            <div className="flex gap-4 items-center justify-between">
              <div className="flex items-center gap-3">
                <Checkbox id="isRemember"/>
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
              className="bg-primary w-fit mx-auto text-white"
            >
              Login
            </Button>
          </form>
        </Form>
      </div>
    </>
  )
}