
import { useEffect } from 'react';

const InitAdmin = () => {
  useEffect(() => {
    // Check if admin user exists
    const USERS_STORAGE_KEY = 'swastik_restaurant_users';
    const storedUsersJson = localStorage.getItem(USERS_STORAGE_KEY);
    let storedUsers = [];
    
    if (storedUsersJson) {
      try {
        storedUsers = JSON.parse(storedUsersJson);
      } catch (e) {
        console.error('Failed to parse users data');
      }
    }
    
    // Create admin user if no admin exists
    const adminExists = storedUsers.some((user: any) => user.isAdmin);
    
    if (!adminExists) {
      const adminUser = {
        id: 'admin-' + Date.now().toString(),
        email: 'admin@swastik.com',
        password: 'admin123', // Adding a simple password for demo
        name: 'Admin User',
        isAdmin: true
      };
      
      storedUsers.push(adminUser);
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(storedUsers));
      console.log('Admin user created:', adminUser.email, 'Password:', adminUser.password);
    }
  }, []);
  
  return null; // This component doesn't render anything
};

export default InitAdmin;
