import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import AppRouter from "api/index";
import { getCookie } from "cookies-next";

export const trpc = createTRPCReact<AppRouter>();
export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: `${process.env.NEXT_PUBLIC_API_URL}/trpc`,
      async headers() {
        return {
          authorization: `Bearer ${getCookie("auth_token")}`,
        };
      },
    }),
  ],
});
