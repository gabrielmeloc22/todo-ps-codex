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
    <div className="flex gap-6 h-fit mt-6 bg-zinc-900/40 p-4 rounded-md">
      {user?.profilePic ? (
        <div className="relative aspect-square h-12">
          <img
            className="absolute rounded-full aspect-square object-cover"
            src={user.profilePic}
            alt={`${user?.name}`}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center w-12 h-12 bg-zinc-600 rounded-full">
          {(user?.name[0] + (user?.lastName?.charAt(0) || "")).toUpperCase()}
        </div>
      )}
      <div>
        <p className="leading-none font-semibold text-md">
          {user?.name} {user?.lastName}
        </p>
        <div className="mt-1 flex gap-2 leading-none ">
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
