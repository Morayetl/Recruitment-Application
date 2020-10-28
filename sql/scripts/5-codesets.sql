USE A;
CREATE TABLE IF NOT EXISTS codesets(  
  id 	        INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  type        VARCHAR(100) NOT NULL,
  value       INT NOT NULL,
  en          VARCHAR(1000) NOT NULL,
  fi          VARCHAR(1000) NOT NULL,
  se          VARCHAR(1000),
  UNIQUE KEY  (type, value)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* Create jobtype codesets */

INSERT INTO codesets(type,value, fi,en,se) VALUES ('jobType',1,'Osa-aikainen','Part-time','Deltids');
INSERT INTO codesets(type,value, fi,en,se) VALUES ('jobType',2,'Määräaikainen','Temporary','Tillfällig');
INSERT INTO codesets(type,value, fi,en,se) VALUES ('jobType',3,'Vakituinen','Permanent','Permanent');
INSERT INTO codesets(type,value, fi,en,se) VALUES ('jobType',4,'Kokoaikainen','Full-time','Heltid');
INSERT INTO codesets(type,value, fi,en,se) VALUES ('jobType',5,'Harjoittelija','Trainee','Praktikant');
INSERT INTO codesets(type,value, fi,en,se) VALUES ('jobType',6,'Alihankkija','Contractor','Entreprenör');


/* Create codesets for qualification level */

INSERT INTO codesets(type,value, en,fi,se) VALUES ('qualificationLevel',0,'Upper secondary degree','Ylioppilastutkinto','');
INSERT INTO codesets(type,value, en,fi,se) VALUES ('qualificationLevel',1,'Vocational degree','Ammattitutkinto','');
INSERT INTO codesets(type,value, en,fi,se) VALUES ('qualificationLevel',2,"Bachelor's degree",'Kandidaatintutkinto','');
INSERT INTO codesets(type,value, en,fi,se) VALUES ('qualificationLevel',3,"Master's degree",'Maisterin tutkinto','');
INSERT INTO codesets(type,value, en,fi,se) VALUES ('qualificationLevel',4,"Doctoral degree",'Tohtorin tutkinto','');

/* Create codesets for career level */

INSERT INTO codesets(type,value, en,fi,se) VALUES ('careerLevel',1,'Junior','Aloittelija / Vasta valmistunut','');
INSERT INTO codesets(type,value, en,fi,se) VALUES ('careerLevel',2,'Medior','Keskiaste','');
INSERT INTO codesets(type,value, en,fi,se) VALUES ('careerLevel',3,'Senior','Kokenut','');


/* Create codesets for company size */

INSERT INTO codesets(type,value, en,fi,se) VALUES ('companySize',1,'10 <','10 <','10 <');
INSERT INTO codesets(type,value, en,fi,se) VALUES ('companySize',2,'10 - 50','10 - 50','10 - 50');
INSERT INTO codesets(type,value, en,fi,se) VALUES ('companySize',3,'50 - 100','50 - 100','50 - 100');
INSERT INTO codesets(type,value, en,fi,se) VALUES ('companySize',4,'100 - 500','100 - 500','100 - 500');
INSERT INTO codesets(type,value, en,fi,se) VALUES ('companySize',5,'500 - 1000','500 - 1000','500 - 1000');
INSERT INTO codesets(type,value, en,fi,se) VALUES ('companySize',6,'> 1000','> 1000','> 1000');

/* Create codesets for Products */

INSERT INTO codesets(type,value, en,fi,se) VALUES ('productName',1,'Job post','Työpaikkailmoitus','');
INSERT INTO codesets(type,value, en,fi,se) VALUES ('productName',2,'Front page advertisement','Etusivu mainostus','');
INSERT INTO codesets(type,value, en,fi,se) VALUES ('productName',3,'Sponsored advertisement','Sponsoroitu mainos','');
INSERT INTO codesets(type,value, en,fi,se) VALUES ('productName',4,'Free','Ilmainen','');
INSERT INTO codesets(type,value, en,fi,se) VALUES ('productName',5,'Bronze','Pronssi','');
INSERT INTO codesets(type,value, en,fi,se) VALUES ('productName',6,'Silver','Hopea','');
INSERT INTO codesets(type,value, en,fi,se) VALUES ('productName',7,'Gold','Kulta','');

/* Create codesets for email frequency */

INSERT INTO codesets(type,value, en,fi,se) VALUES ('emailFrequency',1,'Once a day','Kerran päivässä', '');
INSERT INTO codesets(type,value, en,fi,se) VALUES ('emailFrequency',2,'Once every 3 days','Kerran 3 päivässä','');
INSERT INTO codesets(type,value, en,fi,se) VALUES ('emailFrequency',3,'Once a week','Kerran viikossa','');

/* used for for employers sear*/

INSERT INTO codesets(type,value, en,fi,se) VALUES ('jobApplicantSearchOptions',1,'Name','Nimi', '');
INSERT INTO codesets(type,value, en,fi,se) VALUES ('jobApplicantSearchOptions',2,'Skill','Ammattitaito','');
INSERT INTO codesets(type,value, en,fi,se) VALUES ('jobApplicantSearchOptions',3,'Letter','Saatekirje','');


