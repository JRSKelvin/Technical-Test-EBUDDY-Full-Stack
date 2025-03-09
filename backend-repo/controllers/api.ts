import bcrypt from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, QueryOrderByConstraint, updateDoc, where } from "firebase/firestore";
/*
import jwt from "jsonwebtoken";
*/
import { auth, db } from "../config/firebaseConfig";
import { AuthRequest } from "../middleware/authMiddleware";
import User from "../models/user";

/*
const secretKey = process.env.JWT_SECRET || "your_secret_key";
*/

class ApiController {
  async authSignIn(req: Request, res: Response, next: NextFunction) {
    try {
      /* Disable Manual Firebase FireStore Data Authentication And Using Firebase Authentication
      const refQuery = query(collection(db, "users"), where("email", "==", req.body.email));
      const existingData = await getDocs(refQuery);
      if (existingData.empty) {
        res.status(500).json({ success: false, data: undefined, message: "Invalid credentials." });
        return;
      }
      const fetchedData = existingData.docs[0];
      const isMatch = await bcrypt.compare(req.body.password, fetchedData.data().password);
      if (!isMatch) {
        res.status(500).json({ success: false, data: undefined, message: "Invalid credentials." });
        return;
      }
      const { password, ...restData }: User = { id: fetchedData.id, ...fetchedData.data() };
      const token = jwt.sign({ ...restData }, secretKey, { expiresIn: "1d" });
      */
      /* Using Firebase Authentication */
      const userCredential = await signInWithEmailAndPassword(auth, req.body.email, req.body.password);
      const restData = userCredential.user;
      const token = await restData.getIdToken();
      const returnData = {
        uid: restData.uid,
        email: restData.email,
        displayName: restData.displayName,
        phoneNumber: restData.phoneNumber,
        photoURL: restData.photoURL,
      };
      res.status(200).json({ success: true, data: { token, ...returnData }, message: "User sign in successfully." });
    } catch (error: any) {
      res.status(500).json({ success: false, data: undefined, message: error.message });
    }
  }
  async authSignUp(req: Request, res: Response, next: NextFunction) {
    try {
      const refQuery = query(collection(db, "users"), where("email", "==", req.body.email));
      const existingData = await getDocs(refQuery);
      if (!existingData.empty) {
        /* Keep Save Sign Up Data To Firebase FireStore And Also Using Firebase Authentication As Authenticator
        res.status(500).json({ success: false, data: undefined, message: "Email already in use." });
        return;
        */
      }
      const newData: User = {
        email: String(req.body.email),
        password: await bcrypt.hash(String(req.body.password), 10),
        fullName: String(req.body.fullName),
        phoneNumber: String(req.body.phoneNumber),
        totalAverageWeightRatings: Number(req.body.totalAverageWeightRatings),
        numberOfRents: Number(req.body.numberOfRents),
        recentlyActive: Number(req.body.recentlyActive),
        isActive: Boolean(true),
      };
      const docRef = await addDoc(collection(db, "users"), newData);
      const createdData = await getDoc(doc(db, "users", docRef.id));
      if (!createdData.exists()) {
        res.status(500).json({ success: false, data: undefined, message: "Failed to retrieve created user." });
        return;
      }
      /* Disable Data And Token Generation
      const { password, ...restData }: User = { id: createdData.id, ...createdData.data() };
      const token = jwt.sign({ ...restData }, secretKey, { expiresIn: "1d" });
      */
      /* Using Firebase Authentication */
      const userCredential = await createUserWithEmailAndPassword(auth, req.body.email, req.body.password);
      const restData = userCredential.user;
      const token = await restData.getIdToken();
      const returnData = {
        uid: restData.uid,
        email: restData.email,
        displayName: restData.displayName,
        phoneNumber: restData.phoneNumber,
        photoURL: restData.photoURL,
      };
      res.status(200).json({ success: true, data: { token, ...returnData }, message: "User sign up successfully." });
    } catch (error: any) {
      res.status(500).json({ success: false, data: undefined, message: error.message });
    }
  }
  async usersCreate(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const newData: User = {
        email: String(req.body.email),
        password: await bcrypt.hash(String(req.body.password), 10),
        fullName: String(req.body.fullName),
        phoneNumber: String(req.body.phoneNumber),
        totalAverageWeightRatings: Number(req.body.totalAverageWeightRatings),
        numberOfRents: Number(req.body.numberOfRents),
        recentlyActive: Number(req.body.recentlyActive),
        isActive: Boolean(true),
      };
      const docRef = await addDoc(collection(db, "users"), newData);
      const createdData = await getDoc(doc(db, "users", docRef.id));
      if (!createdData.exists()) {
        res.status(500).json({ success: false, data: undefined, message: "Failed to retrieve created user." });
        return;
      }
      const { password, ...restData }: User = { id: createdData.id, ...createdData.data() };
      res.status(200).json({ success: true, data: restData, message: "User created successfully." });
    } catch (error: any) {
      res.status(500).json({ success: false, data: undefined, message: error.message });
    }
  }
  async usersGetAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      /* This Is Optional Code For Question Number 4 Regarding Multi Order By With Priority Not Order By Multiple Times */
      const orderFields: string[] | undefined = Array.isArray(req.query.orderBy) ? req.query.orderBy as string[] : (req.query.orderBy ? [req.query.orderBy as string] : undefined);
      const orderDirections: string[] | undefined = Array.isArray(req.query.orderDir) ? req.query.orderDir as string[] : (req.query.orderDir ? [req.query.orderDir as string] : undefined);
      const finalOrder: QueryOrderByConstraint[] = [];
      if (orderFields) {
        orderFields.forEach((field, index) => {
          finalOrder.push(orderBy(field, orderDirections?.[index] === "asc" ? "asc" : "desc"));
        });
      }
      const fetchedData = await getDocs(query(collection(db, "users"), ...finalOrder));
      const mappedData = fetchedData.docs.map((data) => {
        const { password, ...restData }: User = { id: data.id, ...data.data() };
        return restData;
      });
      res.status(200).json({ success: true, data: mappedData, message: "User created successfully." });
    } catch (error: any) {
      res.status(500).json({ success: false, data: undefined, message: error.message });
    }
  }
  async usersGetByID(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const fetchedData = await getDoc(doc(db, "users", req.params.id));
      if (!fetchedData.exists()) {
        res.status(500).json({ success: false, data: undefined, message: "User not found." });
        return;
      }
      const { password, ...restData }: User = { id: fetchedData.id, ...fetchedData.data() };
      res.status(200).json({ success: true, data: restData, message: "User created successfully." });
    } catch (error: any) {
      res.status(500).json({ success: false, data: undefined, message: error.message });
    }
  }
  async usersUpdate(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const refData = doc(db, "users", req.params.id);
      const fetchedData = await getDoc(refData);
      if (!fetchedData.exists()) {
        res.status(500).json({ success: false, data: undefined, message: "User not found." });
        return;
      }
      const updatedDocData: Partial<User> = {};
      if (req.body.email) updatedDocData.email = String(req.body.email);
      if (req.body.password) updatedDocData.password = await bcrypt.hash(String(req.body.password), 10);
      if (req.body.fullName) updatedDocData.fullName = String(req.body.fullName);
      if (req.body.phoneNumber) updatedDocData.phoneNumber = String(req.body.phoneNumber);
      if (req.body.totalAverageWeightRatings) updatedDocData.totalAverageWeightRatings = Number(req.body.totalAverageWeightRatings);
      if (req.body.numberOfRents) updatedDocData.numberOfRents = Number(req.body.numberOfRents);
      if (req.body.recentlyActive) updatedDocData.recentlyActive = Number(req.body.recentlyActive);
      if (req.body.isActive) updatedDocData.isActive = Boolean(req.body.isActive);
      await updateDoc(refData, updatedDocData);
      const updatedData = await getDoc(refData);
      const { password, ...restData }: User = { id: updatedData.id, ...updatedData.data() };
      res.status(200).json({ success: true, data: restData, message: "User updated successfully." });
    } catch (error: any) {
      res.status(500).json({ success: false, data: undefined, message: error.message });
    }
  }
  async usersDelete(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const refData = doc(db, "users", req.params.id);
      const fetchedData = await getDoc(refData);
      if (!fetchedData.exists()) {
        res.status(500).json({ success: false, data: undefined, message: "User not found." });
        return;
      }
      const { password, ...restData }: User = { id: fetchedData.id, ...fetchedData.data() };
      await deleteDoc(refData);
      res.status(200).json({ success: true, data: restData, message: "User deleted successfully." });
    } catch (error: any) {
      res.status(500).json({ success: false, data: undefined, message: error.message });
    }
  }
}

const apiController = new ApiController();
export default apiController;
