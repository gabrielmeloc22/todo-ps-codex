"use client";

import { Task } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useState } from "react";
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
} from "ui";
import { z } from "zod";

const taskFormValidationSchema = z.object({
  status: z.boolean().optional(),
  title: z.string().nonempty({ message: "Título é obrigatório" }),
  content: z.string().nullable().optional(),
  completionDate: z.date().nullable().optional(),
});

type TaskValidationSchema = z.infer<typeof taskFormValidationSchema>;
export type OnSubmitTask = (data: Partial<Task>) => Promise<void>;

interface TaskDialogProps {
  trigger: ReactNode;
  onSubmit: OnSubmitTask;
  title: string;
  defaultValues?: TaskValidationSchema & { id: string };
}

export function TaskDialog({ title, trigger, onSubmit: onSubmitFunc, defaultValues }: TaskDialogProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TaskValidationSchema>({
    resolver: zodResolver(taskFormValidationSchema),
    values: defaultValues,
  });
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const setErrorProps = (error: FieldError | undefined) => ({
    errorMessage: error?.message || "",
    variant: (error ? "error" : "default") as "error" | "default",
  });
  const onSubmit: SubmitHandler<TaskValidationSchema> = async (data, e) => {
    e?.preventDefault();
    const { completionDate, ...rest } = data;

    setIsLoading(true);
    await onSubmitFunc({
      id: defaultValues?.id,
      ...data,
    } as Task);
    setOpen(false);
    setIsLoading(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        reset();
        setOpen(open);
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="p-10 max-sm:top-[50%] max-sm:translate-y-[-50%] max-sm:max-w-[90vw]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form className="flex flex-wrap gap-10" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap gap-6">
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
              Adicionar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
