"use client";

import { Button } from "ui";
import { signOut, useAuth } from "@/components/Auth";
import NextLink from "next/link";
import NextImage from "next/image";
import { useRouter } from "next/navigation";

export function Profile() {
  const user = useAuth();
  const router = useRouter();

  return (
    <div className="flex gap-6 h-14">
      {user?.profilePic ? (
        <div className="relative aspect-square h-full">
          <NextImage
            className="absolute w-full h-full rounded-md"
            src={user.profilePic}
            fill
            alt={`${user?.name}`}
          />
        </div>
      ) : (
        <div className="w-10 h-10 bg-zinc-400 rounded-md" />
      )}
      <div>
        <p className="leading-none font-semibold text-lg">
          {user?.name} {user?.lastName}
        </p>
        <div className="mt-2 flex gap-4 leading-none text">
          <NextLink href="/dashboard/profile">
            <Button variant="link" className="text-zinc-300 font-light p-0 w-fit h-fit">
              Meu perfil
            </Button>
          </NextLink>
          <Button
            variant="link"
            className="text-zinc-300 font-light p-0 w-fit h-fit"
            onClick={() => {
              signOut();
              router.replace("login");
            }}
          >
            Sair
          </Button>
        </div>
      </div>
    </div>
  );
}
