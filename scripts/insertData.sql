pragma foreign_keys = 'ON';
insert into user (firstname, lastname, email_id, password, username, birthday, gender, sign_up_date) values('Kaustav', 'Chakraborty', 'kaustav.ron@gmail.com', '12345', 'kaustavRon', '24-01-1994', 'male', '20/04/2014');
insert into user (firstname, lastname, email_id, password, username, birthday, gender, sign_up_date) values('Prasenjit', 'Chakraborty', 'prasenjitc@gmail.com', '54321', 'prasen', '01-12-1993', 'male', '20/04/2014');
insert into basicinfo values ('kaustav.ron@gmail.com', 'indian', 'West Bengal', 'single');
insert into friend_req (user_from, user_to) values ('kaustav.ron@gmail.com', 'prasenjitc@gmail.com');