import { User } from "../domain/model/user";
import { UserDB } from "../domain/data-access/user.db";
import { UserInput, UserProps } from "../domain/data-access/data.types";
import bcrypt from "bcrypt";
import { Role } from "@prisma/client";
import jwt, { Jwt, JwtPayload } from "jsonwebtoken";

const getAllUsers = async (): Promise<User[]> => {
    return await UserDB.getAllUsers();
}

const getFollowingList = async (currentUserId: number): Promise<User[]> => {
    return await UserDB.getFollowingList(currentUserId)
}

const getFollowersList =async (currentUserId: number): Promise<User[]> => {
    return await UserDB.getFollowersList(currentUserId)
}

const getUserById = async (id: number): Promise<User> => {
    return await UserDB.getUserById(id);
}

const getUserByUsername = async (username: string): Promise<User> => {
    return await UserDB.getUserByUsername(username);
}

const getUsersBySearchTerm = async (searchTerm: string): Promise<User[]> => {
    return await UserDB.getUsersBySearchTerm(searchTerm);
}

const addUser = async (userInput: UserInput): Promise<User> => {

    const usernameTaken = await UserDB.isUsernameTaken(userInput.username);

    if (usernameTaken) {
        throw new Error(`User with username ${userInput.username} already exists.`)
    }

    const hashedPassword = await bcrypt.hash(userInput.password, 12);

    const userProps: UserProps = {
        username: userInput.username,
        password: hashedPassword,
        role: Role.USER,
    }

    return await UserDB.addUser(userProps);
}

interface AuthResult {
    username: string;
    userId: number;
    token: string;
  }

const authenticate = async (userInput: UserInput): Promise<AuthResult> => {
    const user = await UserDB.getUserByUsername(userInput.username);
    const isValidPassword = await bcrypt.compare(userInput.password, user.password);

    if(!isValidPassword) {  
        throw new Error("Invalid password, please try again.");
    }

    const username = user.username;
    const userId = user.id;
    const token =  await generateJwtToken(userInput.username);

    return {
        username,
        userId,
        token,
      };
}

const auth = async (token: string, username: string) : Promise<string>  => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload
        const decodedUsername = decoded["username"]
        if(decodedUsername != username) {
            throw new Error("Username and provided token do not match");
        }
        return decodedUsername
    } catch (error) {
        throw new Error("Authentication failed.: " + error.message); 
    }
}


const generateJwtToken = (username: string): string => {
    const jwtSecret = process.env.JWT_SECRET;

    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h` , issuer: 'Mark' };

    try {
        return jwt.sign({ username }, jwtSecret, options);
    } catch (error) {
        console.error(error);
        throw new Error("Error generating JWT token");
    }
}


export default { getAllUsers, getFollowingList, getFollowersList, getUserById, getUserByUsername, getUsersBySearchTerm, addUser, authenticate, auth }
