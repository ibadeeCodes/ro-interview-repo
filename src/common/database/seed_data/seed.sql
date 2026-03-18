-- Truncate the tables to reset the auto-increment counters, using CASCADE to handle foreign key constraints
TRUNCATE TABLE users RESTART IDENTITY CASCADE;
TRUNCATE TABLE partners RESTART IDENTITY CASCADE;
TRUNCATE TABLE courses RESTART IDENTITY CASCADE;
TRUNCATE TABLE students RESTART IDENTITY CASCADE;
TRUNCATE TABLE enrollments RESTART IDENTITY CASCADE;
TRUNCATE TABLE certificates RESTART IDENTITY CASCADE;

-- Insert data into the users table
INSERT INTO users (first_name, last_name, email, password, role, is_active, created_at, updated_at)
VALUES
('Admin', 'User', 'admin@sdc.com', '$2b$12$eI0eTUcd2lGytAjRxNmYkuLyzLUz34pGv9yI1jq7ifm3BQAK0QnoS', 'SUPER_ADMIN', true, NOW(), NOW()),
('John', 'Doe', 'john.doe@example.com', '$2b$12$eI0eTUcd2lGytAjRxNmYkuLyzLUz34pGv9yI1jq7ifm3BQAK0QnoS', 'TRAINING_PARTNER', true, NOW(), NOW()),
('Jane', 'Smith', 'jane.smith@example.com', '$2b$12$eI0eTUcd2lGytAjRxNmYkuLyzLUz34pGv9yI1jq7ifm3BQAK0QnoS', 'TRAINING_PARTNER', true, NOW(), NOW()),
('Alice', 'Johnson', 'alice.johnson@example.com', '$2b$12$eI0eTUcd2lGytAjRxNmYkuLyzLUz34pGv9yI1jq7ifm3BQAK0QnoS', 'TRAINING_PARTNER', true, NOW(), NOW());

-- Insert data into the partners table
INSERT INTO partners (user_id, partner_code, wallet_balance, phone, organization_name, website_url, zip_code, country, city, created_at, updated_at)
VALUES
(2, 'A123T456P', 1000, '123-456-7890', 'Tech Solutions', 'https://techsolutions.example.com', '12345', 'Pakistan', 'Karachi', NOW(), NOW()),
(3, 'A124T457P', 2000, '234-567-8901', 'Innovatech', 'https://innovatech.example.com', '54321', 'Pakistan', 'Karachi', NOW(), NOW()),
(4, 'A125T458P', 1500, '345-678-9012', 'FutureTech', 'https://futuretech.example.com', '67890', 'Pakistan', 'Karachi', NOW(), NOW());

-- Insert data into the courses table
INSERT INTO courses (name, partner_id, cpd_hours, course_outline_pdf_url, created_at, updated_at)
VALUES
('Introduction to Full Stack Development', 1, 40,'https://firebasestorage.googleapis.com/v0/b/sdc-dashboard-3d2d3.appspot.com/o/SDC%2Fpdfs%2FDesign%20%26%20IT%20Services%20Package.pdf?alt=media&token=f84ddfea-2d8e-438e-90d3-7f81651efe27', NOW(), NOW()),
('Advanced JavaScript', 2, 30,'https://firebasestorage.googleapis.com/v0/b/sdc-dashboard-3d2d3.appspot.com/o/SDC%2Fpdfs%2FDesign%20%26%20IT%20Services%20Package.pdf?alt=media&token=f84ddfea-2d8e-438e-90d3-7f81651efe27', NOW(), NOW()),
('Machine Learning Basics', 3, 50,'https://firebasestorage.googleapis.com/v0/b/sdc-dashboard-3d2d3.appspot.com/o/SDC%2Fpdfs%2FDesign%20%26%20IT%20Services%20Package.pdf?alt=media&token=f84ddfea-2d8e-438e-90d3-7f81651efe27', NOW(), NOW()),
('Cloud Computing Fundamentals', 1, 35,'https://firebasestorage.googleapis.com/v0/b/sdc-dashboard-3d2d3.appspot.com/o/SDC%2Fpdfs%2FDesign%20%26%20IT%20Services%20Package.pdf?alt=media&token=f84ddfea-2d8e-438e-90d3-7f81651efe27', NOW(), NOW()),
('Data Structures and Algorithms', 2, 45,'https://firebasestorage.googleapis.com/v0/b/sdc-dashboard-3d2d3.appspot.com/o/SDC%2Fpdfs%2FDesign%20%26%20IT%20Services%20Package.pdf?alt=media&token=f84ddfea-2d8e-438e-90d3-7f81651efe27', NOW(), NOW()),
('Cybersecurity Essentials', 3, 25,'https://firebasestorage.googleapis.com/v0/b/sdc-dashboard-3d2d3.appspot.com/o/SDC%2Fpdfs%2FDesign%20%26%20IT%20Services%20Package.pdf?alt=media&token=f84ddfea-2d8e-438e-90d3-7f81651efe27', NOW(), NOW());


-- Insert data into the students table
INSERT INTO students (name, father_name, mother_name, date_of_birth, country, city, phone, email, address, identity_document_img_url, img_url, latest_edu_transcript_img_url, partner_id, created_at, updated_at)
VALUES
('John Smith', 'Michael Smith', 'Emily Smith', '1998-05-15', 'Pakistan', 'Karachi', '123-456-7890', 'john.smith@example.com', '123 Main St', 'https://firebasestorage.googleapis.com/v0/b/sdc-dashboard-3d2d3.appspot.com/o/SDC%2Fimages%2FWhatsApp%20Image%202024-08-01%20at%2020.28.51_df8b9118.jpg?alt=media&token=81c18052-eea2-4cdd-af10-a241e8ef120d', 'https://firebasestorage.googleapis.com/v0/b/sdc-dashboard-3d2d3.appspot.com/o/SDC%2Fimages%2FcertificateDetails.jpeg?alt=media&token=f91b40c6-bb67-49cc-bfe3-bf793a0a1d34', 'https://firebasestorage.googleapis.com/v0/b/sdc-dashboard-3d2d3.appspot.com/o/SDC%2Fimages%2FWhatsApp%20Image%202024-08-01%20at%2020.29.26_41dee0c8.jpg?alt=media&token=7d50f63a-1b8d-4c40-a221-9364982b4f68', 1, NOW(), NOW()),
('Alice Johnson', 'David Johnson', 'Emma Johnson', '1999-02-20', 'Pakistan', 'Karachi', '234-567-8901', 'alice.johnson@example.com', '456 Elm St', 'https://firebasestorage.googleapis.com/v0/b/sdc-dashboard-3d2d3.appspot.com/o/SDC%2Fimages%2FWhatsApp%20Image%202024-08-01%20at%2020.28.51_df8b9118.jpg?alt=media&token=81c18052-eea2-4cdd-af10-a241e8ef120d', 'https://firebasestorage.googleapis.com/v0/b/sdc-dashboard-3d2d3.appspot.com/o/SDC%2Fimages%2FcertificateDetails.jpeg?alt=media&token=f91b40c6-bb67-49cc-bfe3-bf793a0a1d34', 'https://firebasestorage.googleapis.com/v0/b/sdc-dashboard-3d2d3.appspot.com/o/SDC%2Fimages%2FWhatsApp%20Image%202024-08-01%20at%2020.29.26_41dee0c8.jpg?alt=media&token=7d50f63a-1b8d-4c40-a221-9364982b4f68', 2, NOW(), NOW()),
('Emily Brown', 'Daniel Brown', 'Sophia Brown', '2000-09-10', 'Pakistan', 'Karachi', '345-678-9012', 'emily.brown@example.com', '789 Oak St', 'https://firebasestorage.googleapis.com/v0/b/sdc-dashboard-3d2d3.appspot.com/o/SDC%2Fimages%2FWhatsApp%20Image%202024-08-01%20at%2020.28.51_df8b9118.jpg?alt=media&token=81c18052-eea2-4cdd-af10-a241e8ef120d', 'https://firebasestorage.googleapis.com/v0/b/sdc-dashboard-3d2d3.appspot.com/o/SDC%2Fimages%2FcertificateDetails.jpeg?alt=media&token=f91b40c6-bb67-49cc-bfe3-bf793a0a1d34', 'https://firebasestorage.googleapis.com/v0/b/sdc-dashboard-3d2d3.appspot.com/o/SDC%2Fimages%2FWhatsApp%20Image%202024-08-01%20at%2020.29.26_41dee0c8.jpg?alt=media&token=7d50f63a-1b8d-4c40-a221-9364982b4f68', 3, NOW(), NOW()),
('James Wilson', 'Andrew Wilson', 'Olivia Wilson', '1997-11-25', 'Australia', 'Sydney', '456-789-0123', 'james.wilson@example.com', '987 Pine St', 'https://firebasestorage.googleapis.com/v0/b/sdc-dashboard-3d2d3.appspot.com/o/SDC%2Fimages%2FWhatsApp%20Image%202024-08-01%20at%2020.28.51_df8b9118.jpg?alt=media&token=81c18052-eea2-4cdd-af10-a241e8ef120d', 'https://firebasestorage.googleapis.com/v0/b/sdc-dashboard-3d2d3.appspot.com/o/SDC%2Fimages%2FcertificateDetails.jpeg?alt=media&token=f91b40c6-bb67-49cc-bfe3-bf793a0a1d34', 'https://firebasestorage.googleapis.com/v0/b/sdc-dashboard-3d2d3.appspot.com/o/SDC%2Fimages%2FWhatsApp%20Image%202024-08-01%20at%2020.29.26_41dee0c8.jpg?alt=media&token=7d50f63a-1b8d-4c40-a221-9364982b4f68', 1, NOW(), NOW()),
('Sophia Martinez', 'Carlos Martinez', 'Isabella Martinez', '1998-08-05', 'Spain', 'Madrid', '567-890-1234', 'sophia.martinez@example.com', '654 Maple St', 'https://firebasestorage.googleapis.com/v0/b/sdc-dashboard-3d2d3.appspot.com/o/SDC%2Fimages%2FWhatsApp%20Image%202024-08-01%20at%2020.28.51_df8b9118.jpg?alt=media&token=81c18052-eea2-4cdd-af10-a241e8ef120d', 'https://firebasestorage.googleapis.com/v0/b/sdc-dashboard-3d2d3.appspot.com/o/SDC%2Fimages%2FcertificateDetails.jpeg?alt=media&token=f91b40c6-bb67-49cc-bfe3-bf793a0a1d34', 'https://firebasestorage.googleapis.com/v0/b/sdc-dashboard-3d2d3.appspot.com/o/SDC%2Fimages%2FWhatsApp%20Image%202024-08-01%20at%2020.29.26_41dee0c8.jpg?alt=media&token=7d50f63a-1b8d-4c40-a221-9364982b4f68', 2, NOW(), NOW()),
('Michael Davis', 'Kevin Davis', 'Ava Davis', '1999-04-30', 'Germany', 'Berlin', '678-901-2345', 'michael.davis@example.com', '321 Cedar St', 'https://firebasestorage.googleapis.com/v0/b/sdc-dashboard-3d2d3.appspot.com/o/SDC%2Fimages%2FWhatsApp%20Image%202024-08-01%20at%2020.28.51_df8b9118.jpg?alt=media&token=81c18052-eea2-4cdd-af10-a241e8ef120d', 'https://firebasestorage.googleapis.com/v0/b/sdc-dashboard-3d2d3.appspot.com/o/SDC%2Fimages%2FcertificateDetails.jpeg?alt=media&token=f91b40c6-bb67-49cc-bfe3-bf793a0a1d34', 'https://firebasestorage.googleapis.com/v0/b/sdc-dashboard-3d2d3.appspot.com/o/SDC%2Fimages%2FWhatsApp%20Image%202024-08-01%20at%2020.29.26_41dee0c8.jpg?alt=media&token=7d50f63a-1b8d-4c40-a221-9364982b4f68', 3, NOW(), NOW()),
('Emma Thompson', 'David Thompson', 'Chloe Thompson', '2000-01-15', 'France', 'Paris', '789-012-3456', 'emma.thompson@example.com', '456 Birch St', 'https://firebasestorage.googleapis.com/v0/b/sdc-dashboard-3d2d3.appspot.com/o/SDC%2Fimages%2FWhatsApp%20Image%202024-08-01%20at%2020.28.51_df8b9118.jpg?alt=media&token=81c18052-eea2-4cdd-af10-a241e8ef120d', 'https://firebasestorage.googleapis.com/v0/b/sdc-dashboard-3d2d3.appspot.com/o/SDC%2Fimages%2FcertificateDetails.jpeg?alt=media&token=f91b40c6-bb67-49cc-bfe3-bf793a0a1d34', 'https://firebasestorage.googleapis.com/v0/b/sdc-dashboard-3d2d3.appspot.com/o/SDC%2Fimages%2FWhatsApp%20Image%202024-08-01%20at%2020.29.26_41dee0c8.jpg?alt=media&token=7d50f63a-1b8d-4c40-a221-9364982b4f68', 1, NOW(), NOW()),
('Matthew Garcia', 'Jose Garcia', 'Mia Garcia', '1997-06-20', 'Italy', 'Rome', '890-123-4567', 'matthew.garcia@example.com', '789 Oak St', 'https://firebasestorage.googleapis.com/v0/b/sdc-dashboard-3d2d3.appspot.com/o/SDC%2Fimages%2FWhatsApp%20Image%202024-08-01%20at%2020.28.51_df8b9118.jpg?alt=media&token=81c18052-eea2-4cdd-af10-a241e8ef120d', 'https://firebasestorage.googleapis.com/v0/b/sdc-dashboard-3d2d3.appspot.com/o/SDC%2Fimages%2FcertificateDetails.jpeg?alt=media&token=f91b40c6-bb67-49cc-bfe3-bf793a0a1d34', 'https://firebasestorage.googleapis.com/v0/b/sdc-dashboard-3d2d3.appspot.com/o/SDC%2Fimages%2FWhatsApp%20Image%202024-08-01%20at%2020.29.26_41dee0c8.jpg?alt=media&token=7d50f63a-1b8d-4c40-a221-9364982b4f68', 2, NOW(), NOW()),
('Olivia Clark', 'Michael Clark', 'Abigail Clark', '1998-03-10', 'Brazil', 'Rio de Janeiro', '901-234-5678', 'olivia.clark@example.com', '123 Walnut St', 'https://firebasestorage.googleapis.com/v0/b/sdc-dashboard-3d2d3.appspot.com/o/SDC%2Fimages%2FWhatsApp%20Image%202024-08-01%20at%2020.28.51_df8b9118.jpg?alt=media&token=81c18052-eea2-4cdd-af10-a241e8ef120d', 'https://firebasestorage.googleapis.com/v0/b/sdc-dashboard-3d2d3.appspot.com/o/SDC%2Fimages%2FcertificateDetails.jpeg?alt=media&token=f91b40c6-bb67-49cc-bfe3-bf793a0a1d34', 'https://firebasestorage.googleapis.com/v0/b/sdc-dashboard-3d2d3.appspot.com/o/SDC%2Fimages%2FWhatsApp%20Image%202024-08-01%20at%2020.29.26_41dee0c8.jpg?alt=media&token=7d50f63a-1b8d-4c40-a221-9364982b4f68', 3, NOW(), NOW());

-- Insert data into the enrollments table
INSERT INTO enrollments (student_id, course_id, partner_id, status, start_date, end_date, fees, created_at, updated_at)
VALUES
-- Enrollment 1
(1, 1, 1, 'IN_PROCESS', NOW(), NOW(),  200, NOW(), NOW()), 
(1, 4, 1, 'IN_PROCESS', NOW(), NOW(), 300, NOW(), NOW()), 
-- Enrollment 2
(4, 1, 1, 'IN_PROCESS', NOW(), NOW(), 300, NOW(), NOW()), 
(4, 4, 1, 'IN_PROCESS', NOW(), NOW(), 400, NOW(), NOW()), 
-- Enrollment 3
(7, 1, 1, 'IN_PROCESS', NOW(), NOW(), 400, NOW(), NOW()), 
(7, 4, 1, 'IN_PROCESS', NOW(), NOW(), 200, NOW(), NOW()), 
-- Enrollment 4
(2, 2, 2, 'IN_PROCESS', NOW(), NOW(), 200, NOW(), NOW()), 
(2, 5, 2, 'IN_PROCESS', NOW(), NOW(), 300, NOW(), NOW()), 
-- Enrollment 5
(5, 2, 2, 'IN_PROCESS', NOW(), NOW(), 300, NOW(), NOW()), 
(5, 5, 2, 'IN_PROCESS', NOW(), NOW(), 400, NOW(), NOW()), 
-- Enrollment 6
(8, 2, 2, 'IN_PROCESS', NOW(), NOW(), 400, NOW(), NOW()), 
(8, 5, 2, 'IN_PROCESS', NOW(), NOW(), 200, NOW(), NOW()), 
-- Enrollment 7
(3, 3, 3, 'IN_PROCESS', NOW(), NOW(), 200, NOW(), NOW()), 
(3, 6, 3, 'IN_PROCESS', NOW(), NOW(), 300, NOW(), NOW()), 
-- Enrollment 8
(6, 3, 3, 'IN_PROCESS', NOW(), NOW(), 300, NOW(), NOW()), 
(6, 6, 3, 'IN_PROCESS', NOW(), NOW(), 400, NOW(), NOW()), 
-- Enrollment 9
(9, 3, 3, 'IN_PROCESS', NOW(), NOW(), 400, NOW(), NOW()), 
(9, 6, 3, 'IN_PROCESS', NOW(), NOW(), 200, NOW(), NOW()); 


-- Insert data into the certificates table
INSERT INTO certificates (certificate_number, status, enrollment_id, created_at, updated_at)
VALUES
-- Certificates for Partner 1's enrollments
('S1D' || EXTRACT(EPOCH FROM NOW())::BIGINT || 'C', 'PENDING', 1, NOW(), NOW()), 
('S2D' || EXTRACT(EPOCH FROM NOW())::BIGINT || 'C', 'PENDING', 2, NOW(), NOW()), 
('S3D' || EXTRACT(EPOCH FROM NOW())::BIGINT || 'C', 'PENDING', 3, NOW(), NOW()), 
('S4D' || EXTRACT(EPOCH FROM NOW())::BIGINT || 'C', 'PENDING', 4, NOW(), NOW()), 
('S5D' || EXTRACT(EPOCH FROM NOW())::BIGINT || 'C', 'PENDING', 5, NOW(), NOW()), 
('S6D' || EXTRACT(EPOCH FROM NOW())::BIGINT || 'C', 'PENDING', 6, NOW(), NOW()), 

-- Certificates for Partner 2's enrollments
('S7D' || EXTRACT(EPOCH FROM NOW())::BIGINT || 'C', 'PENDING', 7, NOW(), NOW()), 
('S8D' || EXTRACT(EPOCH FROM NOW())::BIGINT || 'C', 'PENDING', 8, NOW(), NOW()), 
('S9D' || EXTRACT(EPOCH FROM NOW())::BIGINT || 'C', 'PENDING', 9, NOW(), NOW()), 
('S10D' || EXTRACT(EPOCH FROM NOW())::BIGINT || 'C', 'PENDING', 10, NOW(), NOW()), 
('S11D' || EXTRACT(EPOCH FROM NOW())::BIGINT || 'C', 'PENDING', 11, NOW(), NOW()), 
('S12D' || EXTRACT(EPOCH FROM NOW())::BIGINT || 'C', 'PENDING', 12, NOW(), NOW()), 

-- Certificates for Partner 3's enrollments
('S13D' || EXTRACT(EPOCH FROM NOW())::BIGINT || 'C', 'PENDING', 13, NOW(), NOW()), 
('S14D' || EXTRACT(EPOCH FROM NOW())::BIGINT || 'C', 'PENDING', 14, NOW(), NOW()), 
('S15D' || EXTRACT(EPOCH FROM NOW())::BIGINT || 'C', 'PENDING', 15, NOW(), NOW()), 
('S16D' || EXTRACT(EPOCH FROM NOW())::BIGINT || 'C', 'PENDING', 16, NOW(), NOW()), 
('S17D' || EXTRACT(EPOCH FROM NOW())::BIGINT || 'C', 'PENDING', 17, NOW(), NOW()), 
('S18D' || EXTRACT(EPOCH FROM NOW())::BIGINT || 'C', 'PENDING', 18, NOW(), NOW()); 



