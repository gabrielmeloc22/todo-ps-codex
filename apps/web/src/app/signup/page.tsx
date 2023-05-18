import { Metadata } from "next";
import { Form } from "./components/Form";

export const metadata: Metadata = {
  title: "AllDone | Crie uma conta",
};

export default function SignUpPage() {
  return (
    <main className="flex flex-col h-screen items-center justify-center gap-24 mx-auto max-w-screen-xl md:px-16 px-6">
      <h1 className="flex items-center gap-2 text-xl font-semibold">
        AllDone <span className="text-xl">✅</span>
      </h1>
      <div className="flex flex-col justify-center gap-10 mb-14">
        <Form />
      </div>
    </main>
  );
}
