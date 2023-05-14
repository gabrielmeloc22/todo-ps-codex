"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { Button, Input, Label } from "ui";
import { string, z } from "zod";
import { useCreateUserMutation } from "../lib/useCreateUserMutation";

const createAccountValidation = z
  .object({
    firstName: z.string().nonempty({ message: "Nome é obrigatório" }),
    lastName: z.string().optional(),
    email: z
      .string()
      .nonempty({ message: "Por favor, insira seu e-mail" })
      .email({ message: "Insira um e-mail válido!" }),
    password: string()
      .nonempty({ message: "Por favor, insira uma senha" })
      .min(7, { message: "A senha precisa ter 7 ou mais caracteres" }),
    confirmPassword: string()
      .nonempty({ message: "Por favor, insira uma senha" })
      .min(7, { message: "A senha precisa ter 7 ou mais caracteres" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "A senhas inseridas são diferentes",
    path: ["confirmPassword"],
  });

type CreateAccountValidation = z.infer<typeof createAccountValidation>;

export function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAccountValidation>({ resolver: zodResolver(createAccountValidation) });

  const { mutate, isLoading, isError } = useCreateUserMutation();

  const onSubmit: SubmitHandler<CreateAccountValidation> = (data, e) => {
    e?.preventDefault();
    const { email, password, firstName: name } = data;
    mutate({
      email,
      name,
      password,
    });
  };

  const setErrorProps = (error: FieldError | undefined) => ({
    errorMessage: error?.message || "",
    variant: (error ? "error" : "default") as "error" | "default",
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 sm:items-stretch items-center [&>*]:justify-center"
    >
      <h2 className="text-xl font-semibold">Criar uma nova conta</h2>
      <div className="flex flex-wrap gap-6">
        <Label htmlFor="firstName" {...setErrorProps(errors.firstName)}>
          <p className="font-normal mb-2">Nome</p>
          <Input id="firstName" placeholder="nome" {...register("firstName")} />
        </Label>
        <Label htmlFor="lastName">
          <p className="font-normal mb-2">Sobrenome</p>
          <Input id="lastName" placeholder="sobrenome" {...register("lastName")} />
        </Label>
      </div>
      <Label htmlFor="email" className="max-w-fit" {...setErrorProps(errors.email)}>
        <p className="font-normal mb-2">E-mail</p>
        <Input id="email" placeholder="e-mail" {...register("email")} />
      </Label>
      <div className="flex flex-wrap gap-6">
        <Label htmlFor="password" {...setErrorProps(errors.password)}>
          <p className="font-normal mb-2">Senha</p>
          <Input
            id="password"
            type="password"
            placeholder="senha"
            autoComplete="off"
            {...register("password")}
          />
        </Label>
        <Label htmlFor="confirmPassword" {...setErrorProps(errors.confirmPassword)}>
          <p className="font-normal mb-2">Confirmar senha</p>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="senha"
            autoComplete="off"
            {...register("confirmPassword", {
              deps: "confirmPassword",
            })}
          />
        </Label>
      </div>
      {isError && <p className="text-red-400">E-mail já cadastrado!</p>}
      <Button loading={isLoading} type="submit">
        Criar conta
      </Button>
    </form>
  );
}
