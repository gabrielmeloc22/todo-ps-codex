import { Metadata } from "next";
import { Form } from "./components/Form";

export const metadata: Metadata = {
  title: "AllDone | Crie uma conta",
};

export default function SignUpPage() {
  return (
    <main className="flex flex-col h-screen items-center justify-center mx-auto max-w-screen-xl md:px-16 px-6 gap-4">
      <h1 className="flex items-center gap-2 text-xl font-semibold mb-10">
        AllDone <span className="text-xl">✅</span>
      </h1>
      <Form />
    </main>
  );
}
