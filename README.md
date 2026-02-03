# 💸 Mint-Sense Ledger
### SDE Assignment Submission | Karbon Business
---

## 🚀 Project Overview
Mint-Sense is a robust **MERN Stack** application designed for group expense management. It automates the process of splitting bills and tracking debts, ensuring a transparent and real-time ledger for all participants.

## 🛠️ Tech Stack
* **Frontend:** React.js (Hooks, Context API)
* **Backend:** Node.js & Express.js
* **Database:** MongoDB Atlas
* **Auth:** JSON Web Tokens (JWT)
* **API Client:** Axios

---

## ✨ Key Features (Requirement Checklist)

### 1. User Authentication
* Secure **Register** and **Login** flow.
* JWT-protected routes to keep financial data private.

### 2. Group Management
* Create groups for specific trips or events.
* Add up to 3 participants per group (Requirement #3).
* Delete groups when they are no longer needed.

### 3. Smart Split Engine
* **Equal Split Logic:** Enter a total amount, and the system automatically divides the cost among all members (Requirement #4).
* **Who Paid?** Select any group member as the payer.

### 4. Real-time Balance Ledger
* **Requirement #5:** A custom engine calculates the net balance for every member.
* **Requirement #6:** Visual cards show exactly who owes money (Red) and who is owed money (Blue).

### 5. Search & Filters
* **Requirement #7:** An integrated search bar to filter through long transaction histories instantly.

---

## 🧠 Technical Logic: The Balance Engine
The system uses an aggregation algorithm to calculate net status:
$$Net Position = Total Payments Made - Total Shared Cost$$

If a user's net position is positive, they are "Owed." If negative, they "Owe."



---

## 📦 How to Run Locally

### Backend Setup
1. `cd server`
2. `npm install`
3. Create a `.env` file with your `MONGO_URI` and `JWT_SECRET`.
4. `npm start`

### Frontend Setup
1. `cd client`
2. `npm install`
3. `npm start`

---

## 👨‍💻 Author
**Vikas** *Final Year B.Tech, MNNIT Allahabad (Batch of 2026)* GitHub: [vikas9392345479](https://github.com/vikas9392345479)