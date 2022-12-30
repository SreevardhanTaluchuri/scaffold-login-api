import { Types } from "mongoose";

interface UserInterface {
 _id: Types.ObjectId;
 name: string;
 username: string;
 email: string;
 password?: string;
 user_id?: string;
 signInMethod: string;
 two_auth: Boolean;
}

export default UserInterface;
