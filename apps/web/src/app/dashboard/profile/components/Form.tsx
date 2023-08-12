import { useAuth } from "@/components/Auth";
import { ImageUploader, updateProfilePic } from "@/components/ImageUploader";
import { trpc } from "@/services/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FieldError, SubmitHandler, useForm } from "react-hook-form";
import { Button, Input, Label, useToast } from "ui";
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
  const user = useAuth();
  const { data: userProfile } = trpc.user.getUser.useQuery({ id: user?.id });
  const { mutateAsync, isLoading } = trpc.user.updateUser.useMutation();
  const { toast } = useToast();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isDirty },
  } = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    values: {
      name: userProfile?.name || "",
      lastName: userProfile?.lastName || "",
      email: userProfile?.email || "",
      age: userProfile?.age || null,
      gender: userProfile?.gender || null,
      profilePic: userProfile?.profilePic || null,
    },
  });

  const setErrorProps = (error: FieldError | undefined) => ({
    errorMessage: error?.message || "",
    variant: (error ? "error" : "default") as "error" | "default",
  });

  const onSubmit: SubmitHandler<UpdateUserSchema> = async (data, e) => {
    e?.preventDefault();
    const { profilePic, ...rest } = data;
    const updatedProfilePic = profilePic ? await updateProfilePic(profilePic, user.id) : profilePic;

    mutateAsync({ id: user.id, profilePic: updatedProfilePic, ...rest })
      .then(() => {
        toast({
          description:
            "Perfil atualizado com sucesso! Talvez demore um pouco para todas mudanças tomarem efeito!",
          variant: "success",
        });
      })
      .catch(() => {
        toast({
          description: "Algo de errado aconteceu, perfil não atualizado!",
          variant: "destructive",
        });
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-wrap gap-10 mt-10 max-sm:[&_input]:w-full max-sm:[&_label]:w-full max-sm:justify-center"
    >
      <Controller
        control={control}
        name="profilePic"
        render={({ field: { name, value, onChange } }) => (
          <ImageUploader
            value={value || undefined}
            alt={`Foto de perfil de ${userProfile?.name}`}
            name={name}
            onFileChange={onChange}
          />
        )}
      />
      <div className="flex flex-wrap gap-6 max-w-[clamp(200px,70vw,35rem)] max-md:max-w-full ">
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
