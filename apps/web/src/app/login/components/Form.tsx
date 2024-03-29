"use client";

import { trpc } from "@/services/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCookie } from "cookies-next";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Input, Label } from "ui";
import { z } from "zod";

const loginValidationSchema = z.object({
  email: z.string().min(1, { message: "Por favor, insira seu e-mail" }).email({ message: "E-mail inválido" }),
  password: z.string().min(1, { message: "Por favor, insira sua senha" }),
});

type LoginValidationSchema = z.infer<typeof loginValidationSchema>;

export function Form() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValidationSchema>({ resolver: zodResolver(loginValidationSchema) });
  const { mutate, isLoading, isError, error } = trpc.user.authenticateUser.useMutation({
    onSuccess: ({ User, token }) => {
      setCookie("auth_token", token);
      setCookie("user_id", User.id);
      router.push("dashboard");
    },
  });

  const onSubmit: SubmitHandler<LoginValidationSchema> = (data, e) => {
    e?.preventDefault();
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center gap-8 max-sm:items-center"
    >
      <Label
        htmlFor="email-input"
        variant={errors.email ? "error" : "default"}
        errorMessage={errors.email?.message}
      >
        <p className="font-normal mb-2">E-mail</p>
        <Input id="email-input" placeholder="e-mail" {...register("email")} />
      </Label>
      <Label
        htmlFor="password-input"
        variant={errors.password ? "error" : "default"}
        errorMessage={errors.password?.message}
      >
        <p className="font-normal mb-2">Senha</p>
        <Input id="password-input" type="password" placeholder="senha" {...register("password")} />
      </Label>
      <div className="h-full">
        <div className="flex gap-5">
          <NextLink href="/signup">
            <Button variant="outline" type="button">
              Criar conta
            </Button>
          </NextLink>
          <Button loading={isLoading} type="submit">
            Entrar
          </Button>
        </div>
        {isError && (
          <p
            role="alert"
            className="absolute mt-4 text-sm text-red-400 duration-300 animate-in fade-in-10 slide-in-from-bottom-10 ease-[cubic-bezier(0.17,0.67,0.22,1.05)]"
          >
            {error.message}
          </p>
        )}
      </div>
    </form>
  );
}
