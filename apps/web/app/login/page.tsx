import { Metadata } from "next";
import { Form } from "./components/Form";

export const metadata: Metadata = {
  title: "AllDone | Entrar",
};

export default function LoginPage() {
  return (
    <main className="flex flex-wrap h-screen gap-4 md:gap-10 sm:[&>*]:items-start [&>*]:items-center mx-auto max-w-screen-xl md:px-16 px-6">
      <div className="flex-1 md:flex-grow-[6] md:items-center md:justify-start justify-center self-center">
        <h1 className="flex items-center gap-2 text-5xl font-semibold">
          AllDone <span className="text-3xl">✅</span>
        </h1>
      </div>
      <div className="flex flex-1 md:flex-grow-[4] flex-col justify-center gap-10 mb-14">
        <h2 className="text-xl font-semibold">Olá! Entre ou cria uma conta</h2>
        <Form />
      </div>
    </main>
  );
}
