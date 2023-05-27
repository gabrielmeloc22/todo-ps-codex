import { ImageUploader } from "@/components/ImageUploader";
import { useGetUserQuery } from "@/hooks/useGetUserQuery";
import { useUpdateUserMutation } from "@/hooks/useUpdateUserMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FieldError, SubmitHandler, useForm } from "react-hook-form";
import { Button, Input, Label } from "ui";
import { z } from "zod";

const updateUserSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  lastName: z.string(),
  email: z.string().min(1, { message: "E-mail é obrigatório" }).email({
    message: "Por favor, insira um e-mail válido",
  }),
  gender: z.string().nullable(),
  age: z
    .number({ invalid_type_error: "Insira uma idade válida" })
    .min(10, { message: "Insira uma idade válida" })
    .nullable(),
  profilePic: z.string().nullable(),
});

type UpdateUserSchema = z.infer<typeof updateUserSchema>;

export function Form() {
  const { data: user, isSuccess } = useGetUserQuery();
  const { mutateAsync, isLoading } = useUpdateUserMutation();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isDirty },
  } = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    values: {
      name: user?.name || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      age: user?.age || null,
      gender: user?.gender || null,
      profilePic: user?.profilePic || null,
    },
  });

  const setErrorProps = (error: FieldError | undefined) => ({
    errorMessage: error?.message || "",
    variant: (error ? "error" : "default") as "error" | "default",
  });

  const onSubmit: SubmitHandler<UpdateUserSchema> = (data, e) => {
    mutateAsync(data);
    e?.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap gap-10 mt-20">
      <Controller
        control={control}
        name="profilePic"
        render={({ field: { name, value, onChange } }) => (
          <ImageUploader
            value={value || undefined}
            alt={`Foto de perfil de ${user?.name}`}
            name={name}
            onFileChange={onChange}
          />
        )}
      />
      <div className="flex max-w-[clamp(200px,70vw,35rem)] flex-wrap gap-6">
        <Label htmlFor="name" {...setErrorProps(errors.name)}>
          <p className="mb-4">Nome</p>
          <Input id="name" placeholder="nome" {...register("name")} />
        </Label>
        <Label htmlFor="lastName" {...setErrorProps(errors.lastName)}>
          <p className="mb-4">Sobrenome</p>
          <Input id="lastName" placeholder="nome" {...register("lastName")} />
        </Label>
        <Label htmlFor="email" {...setErrorProps(errors.email)}>
          <p className="mb-4">E-mail</p>
          <Input id="email" placeholder="email" {...register("email")} />
        </Label>
        <div className="flex gap-6 flex-wrap">
          <Label htmlFor="age" {...setErrorProps(errors.age)}>
            <p className="mb-4">Idade</p>
            <Input
              id="age"
              type="text"
              placeholder="idade"
              {...register("age", {
                setValueAs: (value) => Number(value) || value || null,
              })}
            />
          </Label>
          <Label htmlFor="gender" {...setErrorProps(errors.gender)}>
            <p className="mb-4">Gênero</p>
            <Input
              placeholder="gênero"
              {...register("gender", {
                setValueAs: (value) => value || null,
              })}
            />
          </Label>
        </div>
        {isDirty && (
          <Button
            loading={isLoading}
            className="w-fit duration-300 animate-in fade-in-10 slide-in-from-top-4 "
            type="submit"
          >
            Editar
          </Button>
        )}
      </div>
    </form>
  );
}
