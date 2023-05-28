"use client";

import { Separator } from "ui";
import { DeleteAccountDialog } from "./components/DeleteAccountDialog";
import { Form } from "./components/Form";
import { Header } from "./components/Header";

export default function ProfilePage() {
  return (
    <div className="flex flex-col h-fit gap-10 max-sm:items-center">
      <Header />
      <Form />
      <Separator orientation="horizontal" className="bg-zinc-600" />
      <DeleteAccountDialog />
    </div>
  );
}
