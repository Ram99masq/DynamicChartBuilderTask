import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", width: 120 },
  { field: "class", headerName: "Class", width: 120 },
  { field: "x", headerName: "X", type: "number", width: 100 },
  { field: "y", headerName: "Y", type: "number", width: 100 },
  { field: "timestamp", headerName: "Timestamp", width: 180 },
  { field: "speed", headerName: "Speed", type: "number", width: 100 },
  { field: "heading", headerName: "Heading", type: "number", width: 100 },
  { field: "vest", headerName: "Vest", type: "number", width: 80 },
  { field: "zone", headerName: "Zone", width: 120 },
  { field: "eventType", headerName: "Event Type", width: 140 }
];

const EventDataTable = ({ data }) => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
  const tableData = Array.isArray(data.kpiData) ? data.kpiData: [];

    const formatted = tableData.map((item, index) => ({
      id: item.id | index +1,
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
    <Box sx={{ height: 600, width: "100%", mt: 4 }}>
      <Typography variant="h6" gutterBottom>Event Data Table</Typography>
      <DataGrid
      rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50]}
        disableSelectionOnClick
        sortingOrder={["asc", "desc"]}
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            position: "sticky",
            top: 0,
            backgroundColor: "#f5f5f5",
            zIndex: 1
          }
        }}
      />
    </Box>
  );
};

export default EventDataTable;
