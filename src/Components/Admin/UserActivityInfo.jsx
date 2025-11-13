import React, { useEffect, useState } from "react";
import { database } from "../../Firebase";
import { ref, onValue, update } from "firebase/database";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
} from "@mui/material";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const UserActivityInfo = () => {
  const [clicks, setClicks] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    const clicksRef = ref(database, "UserActivityInfo");
    const usersRef = ref(database, "UserLoginData");

    const unsubscribeClicks = onValue(clicksRef, (clicksSnap) => {
      const clicksData = clicksSnap.val();
      if (!clicksData) {
        setClicks([]);
        return;
      }

      onValue(usersRef, (usersSnap) => {
        const usersData = usersSnap.val() || {};
        const clicksArray = Object.entries(clicksData).map(([id, value]) => {
          const userInfo = Object.values(usersData).find(
            (user) => user.userId === value.userId
          );

          const userName = userInfo ? userInfo.username : "Guest";

          if (value.username !== userName && value.userId) {
            update(ref(database, `UserActivityInfo/${id}`), {
              username: userName,
            });
          }

          return {
            id,
            UserId: value.userId || "Guest",
            Username: userName,
            category: value.category,
            productName: value.productName,
            productLink: value.productLink,
            timestamp: value.timestamp || new Date().toISOString(),
          };
        });

        // Sort latest first
        clicksArray.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        setClicks(clicksArray);
      });
    });

    return () => unsubscribeClicks();
  }, []);

  // ✅ Filter by date range
  const filteredData = clicks.filter((click) => {
    if (!fromDate && !toDate) return true;
    const date = new Date(click.timestamp);
    const from = fromDate ? new Date(fromDate) : new Date("2000-01-01");
    const to = toDate ? new Date(toDate) : new Date("2999-12-31");
    return date >= from && date <= to;
  });

  // ✅ Export filtered data
  const exportToExcel = () => {
    if (filteredData.length === 0) {
      alert("No data found for selected range!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(
      filteredData.map((c) => ({
        "User ID": c.UserId,
        "User Name": c.Username,
        Category: c.category,
        "Product Name": c.productName,
        Link: c.productLink,
        Date: new Date(c.timestamp).toLocaleString(),
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Filtered Activity");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const fileName = `UserActivity_${fromDate || "start"}_to_${
      toDate || "end"
    }.xlsx`;
    saveAs(blob, fileName);
  };

  // ✅ Helper to format date as YYYY-MM-DD
  const getDateString = (timestamp) =>
    new Date(timestamp).toISOString().split("T")[0];

  return (
    <div
      style={{
        padding: "100px 5% 0 260px",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <h1 style={{ color: "#D63384", marginBottom: "20px" }}>
          User Activity
        </h1>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <TextField
            type="date"
            label="From"
            InputLabelProps={{ shrink: true }}
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            size="small"
            style={{
              border: "1px solid #D63384",
              borderRadius: "6px",
            }}
            inputProps={{
              style: { color: "#D63384", cursor: "pointer" },
            }}
          />
          <TextField
            type="date"
            label="To"
            InputLabelProps={{ shrink: true }}
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            size="small"
            style={{
              border: "1px solid #D63384",
              borderRadius: "6px",
            }}
            inputProps={{
              style: { color: "#D63384", cursor: "pointer" },
            }}
          />

          <Button
            variant="contained"
            onClick={exportToExcel}
            style={{
              backgroundColor: "#D63384",
              color: "white",
              borderRadius: "8px",
              padding: "10px 20px",
              whiteSpace: "nowrap",
            }}
          >
            📥 Download Excel
          </Button>
        </div>
      </div>

      <TableContainer component={Paper} style={{ maxHeight: "auto" }}>
        <Table>
          <TableHead style={{ background: "pink" }}>
            <TableRow>
              <TableCell>
                <strong>User Id</strong>
              </TableCell>
              <TableCell>
                <strong>User Name</strong>
              </TableCell>
              <TableCell>
                <strong>Category</strong>
              </TableCell>
              <TableCell>
                <strong>Product Name</strong>
              </TableCell>
              <TableCell>
                <strong>Link</strong>
              </TableCell>
              <TableCell>
                <strong>Date</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No activity found for selected range.
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((click, index) => {
                const currentDate = getDateString(click.timestamp);
                const prevDate =
                  index > 0
                    ? getDateString(filteredData[index - 1].timestamp)
                    : null;

                return (
                  <React.Fragment key={click.id}>
                    {/* ✅ Pink divider when date changes */}
                    {index > 0 && currentDate !== prevDate && (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          style={{
                            background: "#ffb6c1",
                            height: "4px",
                            padding: 0,
                          }}
                        ></TableCell>
                      </TableRow>
                    )}

                    <TableRow>
                      <TableCell>{click.UserId}</TableCell>
                      <TableCell>{click.Username}</TableCell>
                      <TableCell>{click.category}</TableCell>
                      <TableCell>{click.productName}</TableCell>
                      <TableCell>
                        <a
                          href={click.productLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View Product
                        </a>
                      </TableCell>
                      <TableCell>
                        {new Date(click.timestamp).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserActivityInfo;
