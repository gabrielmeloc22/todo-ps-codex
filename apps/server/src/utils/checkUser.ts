
import HttpError from "./HttpError";

class CheckUser {
    static check (userId: string, authorId: string, text: string) {

        if (userId !== authorId) {
            throw new HttpError(text, 401);
        }

    }

}

export default CheckUser;