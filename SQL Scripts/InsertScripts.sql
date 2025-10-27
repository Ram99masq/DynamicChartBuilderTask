
  INSERT INTO [KPIDashboard].[dbo].[Detections] ([Id], [Class], [X], [Y], [Timestamp], [Speed], [Heading], [Vest], [Zone], [EventType])
VALUES
-- Close calls
('H001', 'human', 12.5, 8.3, '2025-10-26 08:05', 1.2, 90, 0, 'ZoneA', 'CloseCallzzzz'),
('V001', 'vehicle', 12.6, 8.4, '2025-10-26 08:05', 3.5, 95, 1, 'ZoneA', 'CloseCall'),
('H002', 'human', 14.1, 9.0, '2025-10-26 09:15', 1.0, 180, 0, 'ZoneB', 'CloseCall'),
('V002', 'vehicle', 14.2, 9.1, '2025-10-26 09:15', 4.8, 185, 1, 'ZoneB', 'CloseCall'),

-- Overspeeding
('V003', 'vehicle', 10.0, 5.0, '2025-10-26 08:30', 6.2, 270, 1, 'ZoneC', 'Movement'),
('V004', 'vehicle', 11.0, 6.0, '2025-10-26 09:00', 7.5, 300, 1, 'ZoneC', 'Movement'),
('V005', 'vehicle', 12.0, 7.0, '2025-10-26 10:00', 5.5, 320, 1, 'ZoneD', 'Movement'),

-- Vest violations
('H003', 'human', 13.0, 8.0, '2025-10-26 08:45', 1.5, 100, 0, 'ZoneA', 'Movement'),
('H004', 'human', 13.5, 8.5, '2025-10-26 09:30', 2.0, 110, 0, 'ZoneB', 'Movement'),
('H005', 'human', 14.0, 9.0, '2025-10-26 10:15', 1.8, 120, 0, 'ZoneC', 'Movement'),

-- Dwell time
('H006', 'human', 15.0, 10.0, '2025-10-26 08:00', 0.5, 60, 1, 'ZoneA', 'Movement'),
('H006', 'human', 15.1, 10.1, '2025-10-26 08:30', 0.6, 65, 1, 'ZoneA', 'Movement'),
('H006', 'human', 15.2, 10.2, '2025-10-26 09:00', 0.7, 70, 1, 'ZoneA', 'Movement'),

-- Near-miss density
('H007', 'human', 16.0, 11.0, '2025-10-26 08:10', 1.0, 90, 1, 'ZoneB', 'NearMiss'),
('V006', 'vehicle', 16.1, 11.1, '2025-10-26 08:10', 3.0, 95, 1, 'ZoneB', 'NearMiss'),
('H008', 'human', 17.0, 12.0, '2025-10-26 09:20', 1.2, 180, 1, 'ZoneD', 'NearMiss'),
('V007', 'vehicle', 17.1, 12.1, '2025-10-26 09:20', 3.5, 185, 1, 'ZoneD', 'NearMiss'),

-- Additional movement events
('H009', 'human', 18.0, 13.0, '2025-10-26 10:00', 1.0, 270, 1, 'ZoneE', 'Movement'),
('V008', 'vehicle', 18.1, 13.1, '2025-10-26 10:00', 4.0, 275, 1, 'ZoneE', 'Movement');

--

--Dwell time
INSERT INTO [KPIDashboard].[dbo].[Detections] ([Id], [Class], [X], [Y], [Timestamp], [Speed], [Heading], [Vest], [Zone], [EventType])
VALUES
-- Human H001 enters ZoneA at 08:00 and stays until 09:30
('H001', 'human', 10.0, 5.0, '2025-10-26 08:00', 0.5, 45, 1, 'ZoneA', 'Movement'),
('H001', 'human', 10.1, 5.1, '2025-10-26 08:15', 0.6, 50, 1, 'ZoneA', 'Movement'),
('H001', 'human', 10.2, 5.2, '2025-10-26 08:30', 0.4, 55, 1, 'ZoneA', 'Movement'),
('H001', 'human', 10.3, 5.3, '2025-10-26 08:45', 0.7, 60, 1, 'ZoneA', 'Movement'),
('H001', 'human', 10.4, 5.4, '2025-10-26 09:00', 0.5, 65, 1, 'ZoneA', 'Movement'),
('H001', 'human', 10.5, 5.5, '2025-10-26 09:15', 0.6, 70, 1, 'ZoneA', 'Movement'),
('H001', 'human', 10.6, 5.6, '2025-10-26 09:30', 0.5, 75, 1, 'ZoneA', 'Movement'),

-- Human H002 enters ZoneB at 08:30 and stays until 10:00
('H002', 'human', 11.0, 6.0, '2025-10-26 08:30', 0.4, 90, 1, 'ZoneB', 'Movement'),
('H002', 'human', 11.1, 6.1, '2025-10-26 08:45', 0.5, 95, 1, 'ZoneB', 'Movement'),
('H002', 'human', 11.2, 6.2, '2025-10-26 09:00', 0.6, 100, 1, 'ZoneB', 'Movement'),
('H002', 'human', 11.3, 6.3, '2025-10-26 09:15', 0.5, 105, 1, 'ZoneB', 'Movement'),
('H002', 'human', 11.4, 6.4, '2025-10-26 09:30', 0.4, 110, 1, 'ZoneB', 'Movement'),
('H002', 'human', 11.5, 6.5, '2025-10-26 09:45', 0.6, 115, 1, 'ZoneB', 'Movement'),
('H002', 'human', 11.6, 6.6, '2025-10-26 10:00', 0.5, 120, 1, 'ZoneB', 'Movement'),

-- Human H003 enters ZoneC at 09:00 and stays until 10:30
('H003', 'human', 12.0, 7.0, '2025-10-26 09:00', 0.5, 135, 1, 'ZoneC', 'Movement'),
('H003', 'human', 12.1, 7.1, '2025-10-26 09:15', 0.6, 140, 1, 'ZoneC', 'Movement'),
('H003', 'human', 12.2, 7.2, '2025-10-26 09:30', 0.4, 145, 1, 'ZoneC', 'Movement'),
('H003', 'human', 12.3, 7.3, '2025-10-26 09:45', 0.5, 150, 1, 'ZoneC', 'Movement'),
('H003', 'human', 12.4, 7.4, '2025-10-26 10:00', 0.6, 155, 1, 'ZoneC', 'Movement'),
('H003', 'human', 12.5, 7.5, '2025-10-26 10:15', 0.5, 160, 1, 'ZoneC', 'Movement'),
('H003', 'human', 12.6, 7.6, '2025-10-26 10:30', 0.4, 165, 1, 'ZoneC', 'Movement');

--Overspeeding – Rate Per Hour
INSERT INTO [KPIDashboard].[dbo].[Detections] ([Id], [Class], [X], [Y], [Timestamp], [Speed], [Heading], [Vest], [Zone], [EventType])
VALUES
-- 08:00–08:30
('V456', 'vehicle', 11.0, 6.0, '2025-10-26 08:05', 6.2, 90, 1, 'ZoneB', 'Movement'),
('V456', 'vehicle', 11.1, 6.1, '2025-10-26 08:10', 6.5, 100, 1, 'ZoneB', 'Movement'),
('V456', 'vehicle', 11.2, 6.2, '2025-10-26 08:20', 7.0, 110, 1, 'ZoneB', 'Movement'),
('V456', 'vehicle', 11.3, 6.3, '2025-10-26 08:25', 6.8, 120, 1, 'ZoneB', 'Movement'),
('V456', 'vehicle', 11.4, 6.4, '2025-10-26 08:28', 7.2, 130, 1, 'ZoneB', 'Movement'),

-- 08:30–09:00
('V456', 'vehicle', 11.5, 6.5, '2025-10-26 08:35', 6.9, 140, 1, 'ZoneB', 'Movement'),
('V456', 'vehicle', 11.6, 6.6, '2025-10-26 08:40', 7.1, 150, 1, 'ZoneB', 'Movement'),
('V456', 'vehicle', 11.7, 6.7, '2025-10-26 08:45', 6.3, 160, 1, 'ZoneB', 'Movement'),
('V456', 'vehicle', 11.8, 6.8, '2025-10-26 08:50', 7.4, 170, 1, 'ZoneB', 'Movement'),
('V456', 'vehicle', 11.9, 6.9, '2025-10-26 08:55', 6.6, 175, 1, 'ZoneB', 'Movement'),

-- 09:00–09:30
('V456', 'vehicle', 12.0, 7.0, '2025-10-26 09:05', 6.8, 90, 1, 'ZoneB', 'Movement'),
('V456', 'vehicle', 12.1, 7.1, '2025-10-26 09:10', 7.2, 100, 1, 'ZoneB', 'Movement'),
('V456', 'vehicle', 12.2, 7.2, '2025-10-26 09:15', 6.9, 110, 1, 'ZoneB', 'Movement'),
('V456', 'vehicle', 12.3, 7.3, '2025-10-26 09:20', 7.5, 120, 1, 'ZoneB', 'Movement'),
('V456', 'vehicle', 12.4, 7.4, '2025-10-26 09:25', 6.7, 130, 1, 'ZoneB', 'Movement'),

-- 09:30–10:00
('V456', 'vehicle', 12.5, 7.5, '2025-10-26 09:35', 6.4, 140, 1, 'ZoneB', 'Movement'),
('V456', 'vehicle', 12.6, 7.6, '2025-10-26 09:40', 7.0, 150, 1, 'ZoneB', 'Movement'),
('V456', 'vehicle', 12.7, 7.7, '2025-10-26 09:45', 6.6, 160, 1, 'ZoneB', 'Movement'),
('V456', 'vehicle', 12.8, 7.8, '2025-10-26 09:50', 7.3, 170, 1, 'ZoneB', 'Movement'),
('V456', 'vehicle', 12.9, 7.9, '2025-10-26 09:55', 6.5, 175, 1, 'ZoneB', 'Movement'),

-- 10:00–10:30
('V456', 'vehicle', 13.0, 8.0, '2025-10-26 10:05', 6.9, 90, 1, 'ZoneB', 'Movement'),
('V456', 'vehicle', 13.1, 8.1, '2025-10-26 10:10', 7.1, 100, 1, 'ZoneB', 'Movement'),
('V456', 'vehicle', 13.2, 8.2, '2025-10-26 10:15', 6.8, 110, 1, 'ZoneB', 'Movement'),
('V456', 'vehicle', 13.3, 8.3, '2025-10-26 10:20', 7.4, 120, 1, 'ZoneB', 'Movement'),
('V456', 'vehicle', 13.4, 8.4, '2025-10-26 10:25', 6.6, 130, 1, 'ZoneB', 'Movement');


--Vest Violations by Class and Zone

INSERT INTO [KPIDashboard].[dbo].[Detections] ([Id], [Class], [X], [Y], [Timestamp], [Speed], [Heading], [Vest], [Zone], [EventType])
VALUES
-- 08:00–09:00 bucket
('H789', 'human', 12.0, 7.0, '2025-10-26 08:05', 1.2, 90, 0, 'ZoneC', 'Movement'),
('H789', 'human', 12.1, 7.1, '2025-10-26 08:15', 2.0, 100, 0, 'ZoneC', 'Movement'),
('H789', 'human', 12.2, 7.2, '2025-10-26 08:30', 1.8, 110, 0, 'ZoneC', 'Movement'),
('H789', 'human', 12.3, 7.3, '2025-10-26 08:45', 2.5, 120, 0, 'ZoneC', 'Movement'),
('H789', 'human', 12.4, 7.4, '2025-10-26 08:55', 1.5, 130, 0, 'ZoneC', 'Movement'),

-- 09:00–10:00 bucket
('H789', 'human', 12.5, 7.5, '2025-10-26 09:05', 2.8, 135, 0, 'ZoneC', 'Movement'),
('H789', 'human', 12.6, 7.6, '2025-10-26 09:15', 1.0, 95, 0, 'ZoneC', 'Movement'),
('H789', 'human', 12.7, 7.7, '2025-10-26 09:25', 2.2, 85, 0, 'ZoneC', 'Movement'),
('H789', 'human', 12.8, 7.8, '2025-10-26 09:35', 1.7, 75, 0, 'ZoneC', 'Movement'),
('H789', 'human', 12.9, 7.9, '2025-10-26 09:45', 2.9, 65, 0, 'ZoneC', 'Movement'),

-- 10:00–11:00 bucket
('H789', 'human', 13.0, 8.0, '2025-10-26 10:05', 1.3, 90, 0, 'ZoneC', 'Movement'),
('H789', 'human', 13.1, 8.1, '2025-10-26 10:15', 2.1, 100, 0, 'ZoneC', 'Movement'),
('H789', 'human', 13.2, 8.2, '2025-10-26 10:25', 1.9, 110, 0, 'ZoneC', 'Movement'),
('H789', 'human', 13.3, 8.3, '2025-10-26 10:35', 2.6, 120, 0, 'ZoneC', 'Movement'),
('H789', 'human', 13.4, 8.4, '2025-10-26 10:45', 1.6, 130, 0, 'ZoneC', 'Movement'),

-- 11:00–12:00 bucket
('H789', 'human', 13.5, 8.5, '2025-10-26 11:05', 2.7, 135, 0, 'ZoneC', 'Movement'),
('H789', 'human', 13.6, 8.6, '2025-10-26 11:15', 1.1, 95, 0, 'ZoneC', 'Movement'),
('H789', 'human', 13.7, 8.7, '2025-10-26 11:25', 2.3, 85, 0, 'ZoneC', 'Movement'),
('H789', 'human', 13.8, 8.8, '2025-10-26 11:35', 1.6, 75, 0, 'ZoneC', 'Movement'),
('H789', 'human', 13.9, 8.9, '2025-10-26 11:45', 2.9, 65, 0, 'ZoneC', 'Movement');


--RiskyAreas for event type NearMiss by class & Zone

INSERT INTO [KPIDashboard].[dbo].[Detections] ([Id], [Class], [X], [Y], [Timestamp], [Speed], [Heading], [Vest], [Zone], [EventType])
VALUES
-- ZoneD (high density)
('H999', 'human', 14.0, 9.0, '2025-10-26 08:05', 1.2, 90, 0, 'ZoneD', 'NearMiss'),
('H999', 'human', 14.1, 9.1, '2025-10-26 08:15', 2.0, 100, 0, 'ZoneD', 'NearMiss'),
('H999', 'human', 14.2, 9.2, '2025-10-26 08:25', 1.8, 110, 0, 'ZoneD', 'NearMiss'),
('H999', 'human', 14.3, 9.3, '2025-10-26 08:35', 2.5, 120, 0, 'ZoneD', 'NearMiss'),
('H999', 'human', 14.4, 9.4, '2025-10-26 08:45', 1.5, 130, 0, 'ZoneD', 'NearMiss'),
('H999', 'human', 14.5, 9.5, '2025-10-26 09:00', 2.8, 135, 0, 'ZoneD', 'NearMiss'),
('H999', 'human', 14.6, 9.6, '2025-10-26 09:15', 1.0, 95, 0, 'ZoneD', 'NearMiss'),
('H999', 'human', 14.7, 9.7, '2025-10-26 09:30', 2.2, 85, 0, 'ZoneD', 'NearMiss'),
('H999', 'human', 14.8, 9.8, '2025-10-26 09:45', 1.7, 105, 0, 'ZoneD', 'NearMiss'),
('H999', 'human', 14.9, 9.9, '2025-10-26 10:00', 2.9, 115, 0, 'ZoneD', 'NearMiss'),

-- ZoneE (moderate density)
('H999', 'human', 15.0, 10.0, '2025-10-26 08:10', 1.3, 100, 0, 'ZoneE', 'NearMiss'),
('H999', 'human', 15.1, 10.1, '2025-10-26 08:20', 2.1, 110, 0, 'ZoneE', 'NearMiss'),
('H999', 'human', 15.2, 10.2, '2025-10-26 08:30', 1.9, 120, 0, 'ZoneE', 'NearMiss'),
('H999', 'human', 15.3, 10.3, '2025-10-26 08:40', 2.6, 130, 0, 'ZoneE', 'NearMiss'),
('H999', 'human', 15.4, 10.4, '2025-10-26 08:50', 1.6, 140, 0, 'ZoneE', 'NearMiss'),

-- ZoneF (low density)
('H999', 'human', 16.0, 11.0, '2025-10-26 09:05', 1.1, 150, 0, 'ZoneF', 'NearMiss'),
('H999', 'human', 16.1, 11.1, '2025-10-26 09:15', 2.3, 160, 0, 'ZoneF', 'NearMiss'),
('H999', 'human', 16.2, 11.2, '2025-10-26 09:25', 1.4, 170, 0, 'ZoneF', 'NearMiss'),

-- ZoneG (very low density)
('H999', 'human', 17.0, 12.0, '2025-10-26 10:10', 1.5, 180, 0, 'ZoneG', 'NearMiss'),
('H999', 'human', 17.1, 12.1, '2025-10-26 10:20', 2.0, 190, 0, 'ZoneG', 'NearMiss'),

-- ZoneH (tie for 5th)
('H999', 'human', 18.0, 13.0, '2025-10-26 11:00', 1.8, 200, 0, 'ZoneH', 'NearMiss'),
('H999', 'human', 18.1, 13.1, '2025-10-26 11:10', 2.4, 210, 0, 'ZoneH', 'NearMiss'),

-- Additional background detections (non-NearMiss) to simulate density
('H999', 'human', 14.0, 9.0, '2025-10-26 08:05', 1.2, 90, 0, 'ZoneD', 'Movement'),
('H999', 'human', 15.0, 10.0, '2025-10-26 08:10', 1.3, 100, 0, 'ZoneE', 'Movement'),
('H999', 'human', 16.0, 11.0, '2025-10-26 09:05', 1.1, 150, 0, 'ZoneF', 'Movement'),
('H999', 'human', 17.0, 12.0, '2025-10-26 10:10', 1.5, 180, 0, 'ZoneG', 'Movement'),
('H999', 'human', 18.0, 13.0, '2025-10-26 11:00', 1.8, 200, 0, 'ZoneH', 'Movement');


---KPIType = 'Overspeeding'.

INSERT INTO [KPIDashboard].[dbo].[Detections] (
    [Timestamp], [Class], [Zone], [Id], [Vest], [Speed], [Heading], [EventType]
)
VALUES
-- Matching rows (Overspeeding > 5.0, human, ZoneA, Vest = 0, Speed between 1.0 and 5.0, Heading 90–270)
('2025-10-26 08:05:00', 'human', 'ZoneA', 'H001', 0, 5.5, 180, 'Overspeed'),
('2025-10-26 08:10:00', 'human', 'ZoneA', 'H002', 0, 6.2, 120, 'Overspeed'),
('2025-10-26 08:20:00', 'human', 'ZoneA', 'H003', 0, 5.8, 200, 'Overspeed'),
('2025-10-26 08:35:00', 'human', 'ZoneA', 'H004', 0, 6.0, 150, 'Overspeed'),
('2025-10-26 09:00:00', 'human', 'ZoneA', 'H005', 0, 5.6, 100, 'Overspeed'),

-- Non-matching rows (wrong class, zone, vest, speed, or heading)
('2025-10-26 08:15:00', 'vehicle', 'ZoneA', 'V001', 0, 6.0, 180, 'Overspeed'), -- wrong class
('2025-10-26 08:25:00', 'human', 'ZoneB', 'H006', 0, 6.0, 180, 'Overspeed'),   -- wrong zone
('2025-10-26 08:30:00', 'human', 'ZoneA', 'H007', 1, 6.0, 180, 'Overspeed'),   -- wrong vest
('2025-10-26 08:40:00', 'human', 'ZoneA', 'H008', 0, 4.5, 180, 'Overspeed'),   -- speed too low
('2025-10-26 08:45:00', 'human', 'ZoneA', 'H009', 0, 6.0, 280, 'Overspeed');   -- heading out of range
