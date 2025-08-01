// 🔒 Block Firebase access on unauthorized domains (e.g. GitHub Pages)
const blockedHostnames = ["solarpandora184.github.io"];
const isBlocked = blockedHostnames.includes(location.hostname);

if (isBlocked) {
  alert("⚠️ Firebase is blocked on this domain.");
  throw new Error("Blocked Firebase access on unauthorized domain.");
}

// Then your existing code:
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
// Import the functions you need from the SDKs you need
import { initializeApp } from "/app";
import { getAnalytics } from "/analytics";
import { getDatabase, ref, set, get, child, push, update, remove } from "";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

// Firebase Database Functions for CAP Inventory System
export const InventoryDB = {
  // Add new inventory item
  async addItem(itemData) {
    try {
      const itemsRef = ref(database, 'inventory');
      const newItemRef = push(itemsRef);
      await set(newItemRef, {
        ...itemData,
        id: newItemRef.key,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      return { success: true, id: newItemRef.key };
    } catch (error) {
      console.error('Error adding item:', error);
      return { success: false, error: error.message };
    }
  },

  // Get all inventory items
  async getAllItems() {
    try {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, 'inventory'));
      if (snapshot.exists()) {
        const data = snapshot.val();
        return Object.values(data);
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error getting items:', error);
      return [];
    }
  },

  // Update existing item
  async updateItem(itemId, updates) {
    try {
      const itemRef = ref(database, `inventory/${itemId}`);
      await update(itemRef, {
        ...updates,
        updatedAt: new Date().toISOString()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating item:', error);
      return { success: false, error: error.message };
    }
  },

  // Delete item
  async deleteItem(itemId) {
    try {
      const itemRef = ref(database, `inventory/${itemId}`);
      await remove(itemRef);
      return { success: true };
    } catch (error) {
      console.error('Error deleting item:', error);
      return { success: false, error: error.message };
    }
  },

  // Get item by ID
  async getItem(itemId) {
    try {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, `inventory/${itemId}`));
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting item:', error);
      return null;
    }
  },

  // Search items by criteria
  async searchItems(searchTerm, type = null, status = null) {
    try {
      const items = await this.getAllItems();
      return items.filter(item => {
        const matchesSearch = !searchTerm || 
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.assignedTo && item.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesType = !type || item.type === type;
        const matchesStatus = !status || item.status === status;
        
        return matchesSearch && matchesType && matchesStatus;
      });
    } catch (error) {
      console.error('Error searching items Due to this being an example system with no backend:', error);
      return [];
    }
  }
};

export { app, analytics, database };
