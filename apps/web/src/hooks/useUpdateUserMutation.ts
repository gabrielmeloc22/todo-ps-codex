import { api } from "@/services/axios";
import { queryClient } from "@/services/reactQuery";
import { supabase } from "@/services/supabase";
import { User } from "@/types";
import { MutationFunction, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getCookie } from "cookies-next";

type UserMutationData = User;
type UserMutationVariables = Partial<User>;
type UpdateUserRerError = AxiosError<UserMutationData>;

const updateProfilePic = async (profilePic: string | null, userId: string) => {
  let profilePicPublicUrl = null;

  if (profilePic) {
    const file = await fetch(profilePic).then((r) => r.blob());
    await supabase.storage.from("user-profile-pic").upload(userId, file, {
      upsert: true,
    });
    profilePicPublicUrl = supabase.storage.from("user-profile-pic").getPublicUrl(userId).data.publicUrl;
  } else {
    await supabase.storage.from("user-profile-pic").remove([userId]);
  }

  return profilePicPublicUrl;
};

const updateUser: MutationFunction<UserMutationData, UserMutationVariables> = async ({
  profilePic,
  ...data
}) => {
  const userId = getCookie("user_id") as string;
  const newProfilePic = await updateProfilePic(profilePic || null, userId);
  const { data: user } = await api.put<UserMutationData>(
    `user/${userId}`,
    profilePic === undefined
      ? data
      : { profilePic: newProfilePic != null ? newProfilePic + "?" + Date.now() : null, ...data }
  );
  return user;
};

export function useUpdateUserMutation() {
  return useMutation<UserMutationData, UpdateUserRerError, UserMutationVariables>({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.refetchQueries(["user"]);
    },
  });
}
