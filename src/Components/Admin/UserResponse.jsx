import React, { useEffect, useState } from "react";
import { database } from "../../Firebase";
import { ref, onValue, get } from "firebase/database";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const UserResponse = () => {
  const [messages, setMessages] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState({});

  useEffect(() => {
    const messagesRef = ref(database, "contactDetails");
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const msgsArray = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        // Group messages by email or contact
        const grouped = {};
        msgsArray.forEach((msg) => {
          const key = msg.email || msg.contact;
          if (!grouped[key]) grouped[key] = [];
          grouped[key].push(msg);
        });
        // Convert grouped object to array
        const groupedArray = Object.values(grouped).map((msgs) => ({
          ...msgs[0], 
          allMessages: msgs, 
        }));
        // Sort by latest timestamp
        groupedArray.sort(
          (a, b) =>
            new Date(b.allMessages[0].timestamp) -
            new Date(a.allMessages[0].timestamp)
        );
        setMessages(groupedArray);
      } else {
        setMessages([]);
      }
    });
    // Fetch all registered users
    const usersRef = ref(database, "UserLoginData");
    get(usersRef).then((snapshot) => {
      if (snapshot.exists()) {
        setRegisteredUsers(snapshot.val());
      } else {
        setRegisteredUsers({});
      }
    });
    return () => unsubscribe();
  }, []);

  const isRegisteredUser = (email) => {
    return Object.values(registeredUsers).some((user) => user.email === email);
  };
  const truncateMessage = (text, wordLimit = 100) => {
  const words = text.split(" ");
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(" ") + "...";
};

  return (
    <div
      style={{ paddingLeft: "300px", paddingRight: "5%", marginTop: "150px" }}
    >
      <h1 style={{ color: "#D63384", marginBottom: "20px" }}>
        User Contact Responses
      </h1>

      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ background: "pink" }}>
            <TableRow>
              <TableCell sx={{ width: "10%" }}>
                <strong>Name</strong>
              </TableCell>
              <TableCell sx={{ width:  "5%"  }}>
                <strong>Contact</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell sx={{ width: "40%" }}>
                <strong>Messages</strong>
              </TableCell>
              <TableCell>
                <strong> Date</strong>
              </TableCell>
              <TableCell>
                <strong>User Type</strong>
              </TableCell>
              <TableCell>
                <strong>Reply</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No messages yet.
                </TableCell>
              </TableRow>
            ) : (
              messages.map((msg) => (
                <TableRow key={msg.id}>
                  <TableCell sx={{ width: "10%" }}>{msg.name}</TableCell>
                  <TableCell sx={{ width: "5%" }}>{msg.contact}</TableCell>
                  <TableCell>{msg.email}</TableCell>
                  <TableCell sx={{ width: "40%" }}>
                    <ul style={{ paddingLeft: "15px", margin: 0 }}>
                      {(msg.allMessages || []).map((m, idx) => (
                       <li key={idx}>{truncateMessage(m.message)}</li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell>
                    {new Date(msg.allMessages[0].timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {isRegisteredUser(msg.email)
                      ? "Registered User"
                      : "Guest User"}
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => {
                        const phone = msg.contact.startsWith("91")
                          ? msg.contact
                          : "91" + msg.contact;
                        const text = `Hello ${
                          msg.name
                        }, thank you for contacting Glowthic!
We have received your messages: 
${(msg.allMessages || []).map((m) => `"${m.message}"`).join("\n")}
Visit our website for more products and updates: https://www.glowthic.com
Our team will get back to you shortly.`;

                        const url = `https://wa.me/${phone}?text=${encodeURIComponent(
                          text
                        )}`;
                        window.open(url, "_blank");
                      }}
                      style={{
                        padding: "5px 10px",
                        background: "#25D366",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Reply on WhatsApp
                    </button>
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

export default UserResponse;
