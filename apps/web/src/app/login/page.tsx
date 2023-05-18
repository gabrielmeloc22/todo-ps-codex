import { Metadata } from "next";
import { Form } from "./components/Form";

export const metadata: Metadata = {
  title: "AllDone | Entrar",
};

export default function LoginPage() {
  return (
    <main className="flex max-sm:flex-col  flex-wrap h-screen gap-10 max-sm:gap-20 items-center justify-center mx-auto max-w-screen-xl md:px-16 px-6">
      <div className="md:flex-grow-[6]">
        <h1 className="flex items-center gap-2 text-5xl font-semibold justify-center">
          AllDone <span className="text-3xl">✅</span>
        </h1>
      </div>
      <div className="flex md:flex-grow-[4] flex-col gap-10 mb-14">
        <h2 className="text-xl font-semibold">Olá! Entre ou crie uma conta</h2>
        <Form />
      </div>
    </main>
  );
}
