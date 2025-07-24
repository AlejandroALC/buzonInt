import { db, doc, setDoc } from './firebase.js';

const AuthModel = {
  async createUser(userData) {
    try {
      await setDoc(doc(db, 'users', userData.uid)), {
        name: userData.name,
        email: userData.email,
        createdAt: new Date(),
        provider: userData.provider || 'email'
      };
      return true;
    } catch (error) {
      console.error("Error creating user:", error);
      return false;
    }
  }
};

export default AuthModel; 