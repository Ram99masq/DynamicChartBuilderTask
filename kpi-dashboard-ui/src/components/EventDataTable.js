import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Chip,
  Tooltip
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "class", headerName: "Class", width: 120 },
  { field: "x", headerName: "X", type: "number", width: 100 },
  { field: "y", headerName: "Y", type: "number", width: 100 },
  {
    field: "timestamp",
    headerName: "Timestamp",
    width: 180,
    renderCell: (params) => (
      <Tooltip title={params.value}>
        <span>{new Date(params.value).toLocaleString()}</span>
      </Tooltip>
    )
  },
  {
    field: "speed",
    headerName: "Speed (m/s)",
    type: "number",
    width: 120
  },
  {
    field: "heading",
    headerName: "Heading (°)",
    type: "number",
    width: 120
  },
  {
    field: "vest",
    headerName: "Vest",
    type: "number",
    width: 80,
    renderCell: (params) =>
      params.value === 1 ? (
        <Chip label="Yes" color="success" size="small" />
      ) : (
        <Chip label="No" color="error" size="small" />
      )
  },
  { field: "zone", headerName: "Zone", width: 120 },
  { field: "eventType", headerName: "Event Type", width: 140 }
];

const EventDataTable = ({ data }) => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const tableData = Array.isArray(data.kpiData) ? data.kpiData : [];

    const formatted = tableData.map((item, index) => ({
      id: item.id ?? index + 1,
      class: item.class,
      x: item.x,
      y: item.y,
      timestamp: item.timestamp,
      speed: item.speed,
      heading: item.heading,
      vest: item.vest,
      zone: item.zone,
      eventType: item.eventType
    }));

    setRows(formatted);
  }, [data]);

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Event Data Table
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          disableSelectionOnClick
          sortingOrder={["asc", "desc"]}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f5f5f5",
              fontWeight: "bold"
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#fafafa"
            },
            "& .MuiDataGrid-cell": {
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }
          }}
        />
      </Box>
    </Paper>
  );
};

export default EventDataTable;
