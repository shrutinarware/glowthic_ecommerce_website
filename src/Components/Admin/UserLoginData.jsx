import React, { useEffect, useState } from "react";
import { database } from "../../Firebase";
import { ref, onValue, set } from "firebase/database";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const UserLoginData = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const usersRef = ref(database, "UserLoginData");
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const usersArray = Object.entries(data).map(([id, value]) => ({
          id,
          userId: value.userId || "",
          userName: value.username || "",
          email: value.email,
          contact: value.phone || "",
          password: value.password || "",
          timestamp: value.timestamp || new Date().toISOString(),
        }));
        usersArray.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        setUsers(usersArray);
      } else {
        setUsers([]);
      }
    });

    // ✅ Save latest logged-in user ID to Firebase
    if (users.length > 0) {
      const latestUser = users[0];
      set(ref(database, "CurrentUser"), { activeUserId: latestUser.userId });
    }

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ padding: "120px 5% 0 300px" }}>
      <h1 style={{ color: "#7d0a0a", marginBottom: "20px" }}>
        User Login Data
      </h1>

      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ background: "#D4AF37" }}>
            <TableRow>
              <TableCell>
                <strong>USER ID</strong>
              </TableCell>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell>
                <strong>Contact No.</strong>
              </TableCell>
              <TableCell>
                <strong>Password</strong>
              </TableCell>
              <TableCell>
                <strong>Date</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No users yet.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.userId}</TableCell>
                  <TableCell>{user.userName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.contact}</TableCell>
                  <TableCell>{user.password}</TableCell>
                  <TableCell>
                    {new Date(user.timestamp).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserLoginData;
