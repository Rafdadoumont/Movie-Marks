import { Mark } from "../domain/model/mark"
import { MarkDB } from "../domain/data-access/mark.db"
import { MarkProps, UpdateMarkProps } from "../domain/data-access/data.types"
import { UserDB } from "../domain/data-access/user.db";

const getAllMarksAsync = async (): Promise<Mark[]> => {
    return await MarkDB.getAllMarks();
}

const getMarksForLoggedInUserAsync = async (userName: string): Promise<Mark[]> => {
    const currentUser = await UserDB.getUserByUsername(userName);
    const marks = currentUser.getMarksFromFollowing().concat(currentUser.getMarks())
    marks.sort((a, b) => {
        return a.createdAt > b.createdAt ? -1 : 1
    })
    return marks
} 

const addMarkAsync = async (markProps: MarkProps): Promise<Mark> => {
    return await MarkDB.addMark(markProps);
}

const updateMarkAsync = async (markProps: UpdateMarkProps): Promise<Mark> => {
    return await MarkDB.updateMark(markProps);
}

const deleteMarkAsync = async (markId: number): Promise<void> => {
    await MarkDB.deleteMark(markId);
}

export default { getAllMarksAsync, addMarkAsync, getMarksForLoggedInUserAsync, updateMarkAsync, deleteMarkAsync }