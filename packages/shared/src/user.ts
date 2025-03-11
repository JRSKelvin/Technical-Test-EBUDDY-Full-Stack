import { DocumentData } from "firebase/firestore";

interface User extends DocumentData {
  id?: string;
  email?: string;
  password?: string;
  fullName?: string;
  phoneNumber?: string;
  totalAverageWeightRatings?: number;
  numberOfRents?: number;
  recentlyActive?: number;
  isActive?: boolean;
}

export default User;
