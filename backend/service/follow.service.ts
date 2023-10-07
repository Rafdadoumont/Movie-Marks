import { UserDB } from "../domain/data-access/user.db"
import { User } from "../domain/model/user"

const addToFollowing = async (currentUserId: number, otherUserId: number): Promise<User> => {
    return await UserDB.addToFollowing(currentUserId, otherUserId)
}

const removeFromFollowing = async (currentUserId: number, otherUserId: number): Promise<User> => {
    return await UserDB.removeFromFollowing(currentUserId, otherUserId)
}

export default { addToFollowing, removeFromFollowing }