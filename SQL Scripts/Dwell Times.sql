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
