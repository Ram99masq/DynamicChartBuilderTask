KPI Dashboard Setup Guide

--------------------------------------------------------------------------------------------------------------------------------------------------------
This guide walks you through setting up the SQL Server database, configuring the backend, installing dependencies, and running the application.
--------------------------------------------------------------------------------------------------------------------------------------------------------
\# KPI Dashboard Backend Setup Guide

 1. SQL Server Database Setup

Restore the database from the backup file located at:

./SQL Scripts/KPIDashboard.bak

Stored procedures and input parameter scripts are also included in the SQL Scripts folder. Refer to API-Helper-Endpoints.docx for REST API input/output specifications in JSON format.

Important:
Name the database KPIDashboard to avoid Entity Framework migration issues and ensure compatibility with the existing codebase.

SQL Restore Command:
RESTORE DATABASE \[KPIDashboard]
FROM DISK = 'C:\\Backup\\KPIDashboard.bak'
WITH MOVE 'KPIDashboard\_Data' TO 'C:\\SQLData\\KPIDashboard.mdf',
MOVE 'KPIDashboard\_Log' TO 'C:\\SQLData\\KPIDashboard.ldf',
REPLACE;

Additional we can restore manually using sql server management studio. Here are the below steps to restore the Database.

  1) Open SSMS 

  2) Right-click Databases → Restore Database

  3) Choose Device → Browse to the .bak file

  4) Let SSMS auto-fill logical file names and paths

  5) Click OK to restore

 


2. Update Connection String in appsettings.json authentication. I have included the appsettings.json and appsettings.Development.json for reference to the current folder.

a. SQL Authentication
json:
"ConnectionStrings": {
"SqlDBConnection": "Server=localhost;Database=KPIDashboard;User Id=your\_user;Password=your\_password;"
}

b. Windows Authentication
json:
"ConnectionStrings": {
"SqlDBConnection": "Server=DESKTOP-AEA61L5;Database=KPIDashboard;Trusted\_Connection=True;TrustServerCertificate=True;"
}

3. Install Required Packages
Use the following .NET CLI commands to install Entity Framework Core and CSV Helper:

bash:
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package CsvHelper --version 33.1.0



4. Entity Framework Setup and Migration
a. Install EF CLI Tool
bash:
dotnet tool install --global dotnet-ef

b. Install EF Design Package
bash:
dotnet add package Microsoft.EntityFrameworkCore.Design --version 9.0.10

c. Create Tables and Update Database
Run the following commands from your terminal or Visual Studios Package Manager Console:

Bash:
dotnet ef migrations add InitialCreate
dotnet ef database update

If using Visual Studio: Go to Tools > NuGet Package Manager > Package Manager Console and run the above commands.

5. Run the Backend Application
a. Using Command Line

bash:
dotnet run
b. Using Visual Studio
Go to Run \& Debug, then click to launch the project in Chrome or your preferred browser.



------------------------------------------------------------------------------------------------------------------------------

\# KPI Dashboard Frontend Setup Guide


This guide outlines the steps to install dependencies and run the React-based frontend application for the KPI Dashboard.



---



\## 📦 1. Install Required Packages



Use the following commands to install all necessary React, Chart.js, and Material UI dependencies.



\### 🧱 Core UI and Charting Libraries



```bash

npm install @mui/material @emotion/react @emotion/styled axios react-chartjs-2 chart.js



