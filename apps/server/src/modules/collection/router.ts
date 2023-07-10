import { router } from "../../trpc";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { createCollection } from "./procedures/create";
import { deleteCollection } from "./procedures/delete";
import { getCollection } from "./procedures/get";
import { updateCollection } from "./procedures/update";

export type CollectionRouterInputs = inferRouterInputs<typeof collectionRouter>;
export type CollectionRouterOutputs = inferRouterOutputs<typeof collectionRouter>;

export const collectionRouter = router ({
    createCollection: createCollection,
    deleteCollection: deleteCollection,
    getCollection: getCollection,
    updateCollection: updateCollection,
})