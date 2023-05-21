"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { Button, Input, Label } from "ui";
import { string, z } from "zod";
import { useCreateUserMutation } from "../lib/useCreateUserMutation";

const createAccountValidation = z
  .object({
    firstName: z.string().nonempty({ message: "Nome é obrigatório" }),
    lastName: z.string().nonempty({ message: "Sobrenome é obrigatório" }),
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

  const { mutate, isLoading, isError, error } = useCreateUserMutation();

  const onSubmit: SubmitHandler<CreateAccountValidation> = (data, e) => {
    e?.preventDefault();
    const { email, password, firstName: name, lastName } = data;
    mutate({
      email,
      name,
      lastName,
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
      className="flex flex-wrap gap-6 max-w-[clamp(200px,70vw,35rem)] [&>*]:flex-grow [&>*>input]:w-full"
    >
      <h2 className="text-xl font-semibold w-full max-md:text-center">Criar uma nova conta</h2>

      <Label htmlFor="firstName" {...setErrorProps(errors.firstName)}>
        <p className="font-normal mb-2">Nome</p>
        <Input id="firstName" placeholder="nome" {...register("firstName")} />
      </Label>
      <Label htmlFor="lastName" {...setErrorProps(errors.lastName)}>
        <p className="font-normal mb-2">Sobrenome</p>
        <Input id="lastName" placeholder="sobrenome" {...register("lastName")} />
      </Label>
      <Label htmlFor="email" className="w-full" {...setErrorProps(errors.email)}>
        <p className="font-normal mb-2">E-mail</p>
        <Input
          id="email"
          placeholder="e-mail"
          className="md:max-w-[calc(50%-0.75rem)]"
          {...register("email")}
        />
      </Label>
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
      <div className="flex w-full max-md:justify-center">
        <Button loading={isLoading} type="submit">
          Criar conta
        </Button>
        {isError && (
          <p
            role="alert"
            className="absolute mt-4 text-sm text-red-400 duration-300 animate-in fade-in-10 slide-in-from-bottom-10 ease-[cubic-bezier(0.17,0.67,0.22,1.05)]"
          >
            {error.response.data.message}
          </p>
        )}
      </div>
    </form>
  );
}
