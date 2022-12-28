import { Types } from "mongoose";

interface UserInterface {
 _id: Types.ObjectId;
 name: string;
 username: string;
 email: string;
 password: string;
}

export default UserInterface;
