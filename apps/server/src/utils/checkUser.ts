
import HttpError from "./HttpError";

class CheckUser {
    static check (userId: string, authorId: string) {

        if (userId !== authorId) {
            throw new HttpError("Token de outro usuário", 401);
        }

    }

}

export default CheckUser;