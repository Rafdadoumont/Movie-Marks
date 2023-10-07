import {Mark} from "./mark"
import { Role } from "@prisma/client"

export class User {
    readonly id?: number
    readonly username: string
    readonly password: string
    readonly marks: Mark[]
    readonly followedBy: User[]
    readonly following: User[]
    readonly role?: Role

    constructor(username: string, password: string, marks: Mark[], followedBy: User[], following: User[], role?: Role, id?: number) {
        this.id = id
        this.username = username
        this.password = password
        this.marks = marks
        this.followedBy = followedBy
        this.following = following
        this.role = role
    }

    getMarksFromFollowing = () : Mark[] => {
        let marks : Mark[] = []
        for (let i = 0; i < this.following.length; i++) {
            marks = marks.concat(this.following[i].getMarks())
        }
        return marks
    }


    getMarks = () : Mark[] => {
        return this.marks
    }

    addToFollowing = (other: User) => {
        this.following.push(other)
    }

}