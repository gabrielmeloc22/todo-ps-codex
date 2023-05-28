"use client";

import { useUpdateTaskMutation } from "@/hooks/useUpdateTaskMutation";
import { Task } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "lucide-react";
import { useState } from "react";
import { Controller, FieldError, SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  DatePicker,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  TextArea,
  useToast,
} from "ui";
import { z } from "zod";

const updateTaskValidationSchema = z.object({
  title: z.string().nonempty({ message: "Título é obrigatório" }),
  content: z.string().nullable().optional(),
  completionDate: z.date().nullable().optional(),
});

type UpdateTaskValidationSchema = z.infer<typeof updateTaskValidationSchema>;

interface TaskDialogProps {
  task: Task;
}

export function UpdateTaskDialog({ task: { title, completionDate, content, id } }: TaskDialogProps) {
  const { mutateAsync, isLoading } = useUpdateTaskMutation();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<UpdateTaskValidationSchema>({
    values: {
      title: title,
      completionDate: completionDate ? new Date(completionDate) : undefined,
      content,
    },
    resolver: zodResolver(updateTaskValidationSchema),
  });
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const setErrorProps = (error: FieldError | undefined) => ({
    errorMessage: error?.message || "",
    variant: (error ? "error" : "default") as "error" | "default",
  });
  const onSubmit: SubmitHandler<UpdateTaskValidationSchema> = async (data, e) => {
    e?.preventDefault();
    const { completionDate, ...rest } = data;

    await mutateAsync({
      id,
      completionDate: completionDate?.toISOString() || null,
      ...rest,
    })
      .then(() => {
        setOpen(false);
        toast({
          description: "Tarefa editada com sucesso!",
          variant: "success",
        });
      })
      .catch(() => {
        toast({
          description: "Algo de errado aconteceu!",
          variant: "destructive",
        });
      });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        reset();
        setOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="icon" size="sm">
          <Edit strokeWidth={1.5} size={20} />
        </Button>
      </DialogTrigger>

      <DialogContent className="p-10">
        <DialogHeader>
          <DialogTitle>Editar tarefa</DialogTitle>
        </DialogHeader>
        <form className="flex flex-wrap gap-10" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-6">
            <Label htmlFor="title" {...setErrorProps(errors.title)}>
              <p className="mb-4">Título</p>
              <Input id="title" placeholder="título" {...register("title")} />
            </Label>
            <Label htmlFor="date" {...setErrorProps(errors.completionDate)}>
              <p className="mb-4">Data</p>
              <Controller
                render={({ field: { value, onBlur, onChange } }) => (
                  <DatePicker
                    id="date"
                    onDayBlur={onBlur}
                    selected={value ?? undefined}
                    onSelect={onChange}
                  />
                )}
                name="completionDate"
                control={control}
              />
            </Label>
          </div>
          <Label htmlFor="content" className="w-full" {...setErrorProps(errors.content)}>
            <p className="mb-4">Descrição</p>
            <TextArea
              id="content"
              placeholder="detalhes sobre minha tarefa legal :)"
              maxLength={140}
              {...register("content")}
            />
          </Label>
          <div className="mx-auto">
            <Button
              variant="secondary"
              className="mr-4"
              onClick={() => {
                reset();
                setOpen(false);
              }}
            >
              Descartar
            </Button>
            <Button type="submit" loading={isLoading}>
              Editar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
