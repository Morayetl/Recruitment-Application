USE A;
CREATE TABLE IF NOT EXISTS categories(  
  categoryId 	VARCHAR(100) NOT NULL PRIMARY KEY,
  en          VARCHAR(100) NOT NULL,
  fi          VARCHAR(100) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* Create top categories */

INSERT INTO categories(en,fi,categoryId) VALUES ('development and tourism','kehitys ja turismi','1');
INSERT INTO categories(en,fi,categoryId) VALUES ('logistics','kuljetus','2');
INSERT INTO categories(en,fi,categoryId) VALUES ('literature and art','kirjallisuus ja taide','3');
INSERT INTO categories(en,fi,categoryId) VALUES ('business','liiketoiminta','4');
INSERT INTO categories(en,fi,categoryId) VALUES ('broadcasting and entertainment','lähetystoiminta ja viihde','5');
INSERT INTO categories(en,fi,categoryId) VALUES ('information technology','informaatio teknologia','6');
INSERT INTO categories(en,fi,categoryId) VALUES ('law and order','laki ja järjestys','7');
INSERT INTO categories(en,fi,categoryId) VALUES ('retail','vähittäiskauppa','8');
INSERT INTO categories(en,fi,categoryId) VALUES ('education','koulutus','9');
INSERT INTO categories(en,fi,categoryId) VALUES ('scientific work','tieteen alan työt','10');
INSERT INTO categories(en,fi,categoryId) VALUES ('health care and social work','hyvinvointi ja sosiaalityö','11');
INSERT INTO categories(en,fi,categoryId) VALUES ('other professions','muut ammatit','12');

/* Create subcategories */

/* Development and tourisim */
INSERT INTO categories(en,fi,categoryId) VALUES ('barman','baarimestari (mies)','1/1');
INSERT INTO categories(en,fi,categoryId) VALUES ('barmaid','baarimestari (nainen)','1/2');
INSERT INTO categories(en,fi,categoryId) VALUES ('bartender','baarimikko','1/3');
INSERT INTO categories(en,fi,categoryId) VALUES ('bouncer','ovimies','1/4');
INSERT INTO categories(en,fi,categoryId) VALUES ('cook','kokki','1/5');
INSERT INTO categories(en,fi,categoryId) VALUES ('chef','keittiömestari','1/6');
INSERT INTO categories(en,fi,categoryId) VALUES ('hotel manager','hotellin johtaja','1/7');
INSERT INTO categories(en,fi,categoryId) VALUES ('hotel porter','hotellin vahtimestari','1/8');
INSERT INTO categories(en,fi,categoryId) VALUES ('pub landlord','baarin omistaja','1/9');
INSERT INTO categories(en,fi,categoryId) VALUES ('tour guide tai tourist guide','matkaopas','1/10');
INSERT INTO categories(en,fi,categoryId) VALUES ('waiter','tarjoilija (mies)','1/11');
INSERT INTO categories(en,fi,categoryId) VALUES ('waitress','tarjoilija (nainen)','1/12');


/* Logistics */
INSERT INTO categories(en,fi,categoryId) VALUES ('air traffic controller','lennonjohtaja','2/1');
INSERT INTO categories(en,fi,categoryId) VALUES ('baggage handler','matkatavarakasittelijä','2/2');
INSERT INTO categories(en,fi,categoryId) VALUES ('bus driver','linja-autonkuljettaja','2/3');
INSERT INTO categories(en,fi,categoryId) VALUES ('flight attendant','lentoemäntä / stuertti','2/4');
INSERT INTO categories(en,fi,categoryId) VALUES ('lorry driver','rekkakuski','2/5');
INSERT INTO categories(en,fi,categoryId) VALUES ('sea captain tai ship''s captain','merikapteeni','2/6');
INSERT INTO categories(en,fi,categoryId) VALUES ('taxi driver','taksikuski','2/7');
INSERT INTO categories(en,fi,categoryId) VALUES ('train driver','junankuljettaja','2/8');
INSERT INTO categories(en,fi,categoryId) VALUES ('pilot','lentäjä','2/9');

/* Literature and art */

INSERT INTO categories(en,fi,categoryId) VALUES ('artist','taiteilija','3/1');
INSERT INTO categories(en,fi,categoryId) VALUES ('editor','päätoimittaja','3/2');
INSERT INTO categories(en,fi,categoryId) VALUES ('fashion designer','muotisuunnittelija','3/3');
INSERT INTO categories(en,fi,categoryId) VALUES ('graphic designer','graafinen suunnittelija','3/4');
INSERT INTO categories(en,fi,categoryId) VALUES ('illustrator','kuvittaja','3/5');
INSERT INTO categories(en,fi,categoryId) VALUES ('journalist','toimittaja','3/6');
INSERT INTO categories(en,fi,categoryId) VALUES ('painter','taidemaalari','3/7');
INSERT INTO categories(en,fi,categoryId) VALUES ('photographer','kuvaaja','3/8');
INSERT INTO categories(en,fi,categoryId) VALUES ('playwright','näytelmäkirjailija','3/9');
INSERT INTO categories(en,fi,categoryId) VALUES ('poet','runoilija','3/10');
INSERT INTO categories(en,fi,categoryId) VALUES ('sculptor','kuvanveistäjä','3/11');
INSERT INTO categories(en,fi,categoryId) VALUES ('writer','kirjailija','3/12');

/* Business */

INSERT INTO categories(en,fi,categoryId) VALUES ('accountant','kirjanpitäjä','4/1');
INSERT INTO categories(en,fi,categoryId) VALUES ('actuary','vakuutusmatemaatikko, aktuaari','4/2');
INSERT INTO categories(en,fi,categoryId) VALUES ('advertising executive','mainonnan johtaja','4/3');
INSERT INTO categories(en,fi,categoryId) VALUES ('bank clerk','pankkivirkailija','4/4');
INSERT INTO categories(en,fi,categoryId) VALUES ('bank manager','pankin johtaja','4/5');
INSERT INTO categories(en,fi,categoryId) VALUES ('businessman','liikemies','4/6');
INSERT INTO categories(en,fi,categoryId) VALUES ('businesswoman','liikenainen','4/7');
INSERT INTO categories(en,fi,categoryId) VALUES ('economist','taloustieteilijä','4/8');
INSERT INTO categories(en,fi,categoryId) VALUES ('financial adviser','talousneuvoja','4/9');
INSERT INTO categories(en,fi,categoryId) VALUES ('health and safety officer','työsuojeluvaltuutettu','4/10');
INSERT INTO categories(en,fi,categoryId) VALUES ('HR manager (Human resources manager)','henkilöstövastaava','4/11');
INSERT INTO categories(en,fi,categoryId) VALUES ('insurance broker','vakuutusasiamies','4/12');
INSERT INTO categories(en,fi,categoryId) VALUES ('PA (Personal assistant)','assistentti, henkilökohtainen avustaja','4/13');
INSERT INTO categories(en,fi,categoryId) VALUES ('investment analyst','sijoitusneuvoja','4/14');
INSERT INTO categories(en,fi,categoryId) VALUES ('project manager','projektipäällikkö','4/15');
INSERT INTO categories(en,fi,categoryId) VALUES ('marketing director','markkinointijohtaja','4/16');
INSERT INTO categories(en,fi,categoryId) VALUES ('management consultant','hallinnon konsultti','4/17');
INSERT INTO categories(en,fi,categoryId) VALUES ('manager','johtaja, esimies','4/18');
INSERT INTO categories(en,fi,categoryId) VALUES ('office worker','toimistotyöntekijä','4/19');
INSERT INTO categories(en,fi,categoryId) VALUES ('receptionist','vastaanottovirkailija','4/20');
INSERT INTO categories(en,fi,categoryId) VALUES ('recruitment consultant','rekrytointikonsultti','4/21');
INSERT INTO categories(en,fi,categoryId) VALUES ('sales rep (Sales representative)','myyntiedustaja','4/22');
INSERT INTO categories(en,fi,categoryId) VALUES ('salesman / saleswoman','myyntimies/ myyntinainen','4/23');
INSERT INTO categories(en,fi,categoryId) VALUES ('secretary','sihteeri','4/24');
INSERT INTO categories(en,fi,categoryId) VALUES ('stockbroker','arvopaperimeklari','4/25');
INSERT INTO categories(en,fi,categoryId) VALUES ('telephonist','puhelunvälittäjä, vaihde','4/26');

/* Broadcasting and entertainment */

INSERT INTO categories(en,fi,categoryId) VALUES ('actor','miesnäyttelijä','5/1');
INSERT INTO categories(en,fi,categoryId) VALUES ('actress','naisnäyttelijä','5/2');
INSERT INTO categories(en,fi,categoryId) VALUES ('comedian','koomikko','5/3');
INSERT INTO categories(en,fi,categoryId) VALUES ('composer','säveltäjä','5/4');
INSERT INTO categories(en,fi,categoryId) VALUES ('dancer','tanssija','5/5');
INSERT INTO categories(en,fi,categoryId) VALUES ('film director','elokuvaohjaaja','5/6');
INSERT INTO categories(en,fi,categoryId) VALUES ('DJ (lyhennelmä sanoista disc jockey)','DJ, tiskijukka','5/7');
INSERT INTO categories(en,fi,categoryId) VALUES ('musician','muusikko','5/8');
INSERT INTO categories(en,fi,categoryId) VALUES ('newsreader','uutistenlukija','5/9');
INSERT INTO categories(en,fi,categoryId) VALUES ('singer','laulaja','5/10');

/* Information technology */

INSERT INTO categories(en,fi,categoryId) VALUES ('database administrator','tietokantahallinnoija','6/1');
INSERT INTO categories(en,fi,categoryId) VALUES ('software developer','ohjelmiston kehittäjä','6/2');
INSERT INTO categories(en,fi,categoryId) VALUES ('web designer','web-suunnittelija','6/3');

/* Law and order */

INSERT INTO categories(en,fi,categoryId) VALUES ('barrister','asianajaja','7/1');
INSERT INTO categories(en,fi,categoryId) VALUES ('bodyguard','turvamies','7/2');
INSERT INTO categories(en,fi,categoryId) VALUES ('customs officer','tullivirkailija','7/3');
INSERT INTO categories(en,fi,categoryId) VALUES ('detective','etsivä','7/4');
INSERT INTO categories(en,fi,categoryId) VALUES ('forensic scientist','rikostekninen tutkija','7/5');
INSERT INTO categories(en,fi,categoryId) VALUES ('judge','tuomari','7/6');
INSERT INTO categories(en,fi,categoryId) VALUES ('lawyer','lakimies','7/7');
INSERT INTO categories(en,fi,categoryId) VALUES ('magistrate','käräjätuomari','7/8');
INSERT INTO categories(en,fi,categoryId) VALUES ('police officer (perinteisesti policeman tai policewoman)','poliisi','7/9');
INSERT INTO categories(en,fi,categoryId) VALUES ('prison officer','vanginvartija','7/10');
INSERT INTO categories(en,fi,categoryId) VALUES ('private detective','yksityisetsivä','7/11');
INSERT INTO categories(en,fi,categoryId) VALUES ('security officer','järjestyksenvalvoja','7/12');
INSERT INTO categories(en,fi,categoryId) VALUES ('solicitor','asianajaja','7/13');
INSERT INTO categories(en,fi,categoryId) VALUES ('traffic warden','pysäköinninvalvoja','7/14');

/* Retail */

INSERT INTO categories(en,fi,categoryId) VALUES ('antique dealer','antiikkikauppias','8/1');
INSERT INTO categories(en,fi,categoryId) VALUES ('art dealer','taidekauppias','8/2');
INSERT INTO categories(en,fi,categoryId) VALUES ('baker','leipuri','8/3');
INSERT INTO categories(en,fi,categoryId) VALUES ('barber','parturi','8/4');
INSERT INTO categories(en,fi,categoryId) VALUES ('beautician','kauneudenhoitaja','8/5');
INSERT INTO categories(en,fi,categoryId) VALUES ('bookkeeper','kirjanpitäjä','8/6');
INSERT INTO categories(en,fi,categoryId) VALUES ('bookmaker','vedonvälittäjä','8/7');
INSERT INTO categories(en,fi,categoryId) VALUES ('butcher','lihakauppias','8/8');
INSERT INTO categories(en,fi,categoryId) VALUES ('buyer','ostaja','8/9');
INSERT INTO categories(en,fi,categoryId) VALUES ('cashier','kassatyöntekijä','8/10');
INSERT INTO categories(en,fi,categoryId) VALUES ('estate agent','kiinteistönvälittäjä','8/11');
INSERT INTO categories(en,fi,categoryId) VALUES ('fishmonger','kalakauppias','8/12');
INSERT INTO categories(en,fi,categoryId) VALUES ('florist','kukkakauppias','8/13');
INSERT INTO categories(en,fi,categoryId) VALUES ('greengrocer','vihanneskauppias','8/14');
INSERT INTO categories(en,fi,categoryId) VALUES ('hairdresser','kampaaja','8/15');
INSERT INTO categories(en,fi,categoryId) VALUES ('sales assistant','myyntiapulainen','8/16');
INSERT INTO categories(en,fi,categoryId) VALUES ('shop assistant','myymäläapulainen','8/17');
INSERT INTO categories(en,fi,categoryId) VALUES ('shopkeeper','kauppias','8/18');
INSERT INTO categories(en,fi,categoryId) VALUES ('store detective','myymäläetsivä','8/19');
INSERT INTO categories(en,fi,categoryId) VALUES ('store manager','myymälänjohtaja','8/20');
INSERT INTO categories(en,fi,categoryId) VALUES ('tailor','räätäli','8/21');
INSERT INTO categories(en,fi,categoryId) VALUES ('travel agent','matkatoimistovirkailija','8/22');
INSERT INTO categories(en,fi,categoryId) VALUES ('wine merchant','viinikauppias','8/23');

/* Education */

INSERT INTO categories(en,fi,categoryId) VALUES ('lecturer','luennoitsija','9/1');
INSERT INTO categories(en,fi,categoryId) VALUES ('music teacher','musiikinopettaja','9/2');
INSERT INTO categories(en,fi,categoryId) VALUES ('teacher','opettaja','9/3');
INSERT INTO categories(en,fi,categoryId) VALUES ('teaching assistant','koulunkäyntiavustaja','9/4');

/* Scientific work */

INSERT INTO categories(en,fi,categoryId) VALUES ('biologist','biologi','10/1');
INSERT INTO categories(en,fi,categoryId) VALUES ('botanist','kasvitieteilijä','10/2');
INSERT INTO categories(en,fi,categoryId) VALUES ('chemist','kemisti','10/3');
INSERT INTO categories(en,fi,categoryId) VALUES ('lab technician (Laboratory technician)','laboratorioteknikko','10/4');
INSERT INTO categories(en,fi,categoryId) VALUES ('meteorologist','meterologi','10/5');
INSERT INTO categories(en,fi,categoryId) VALUES ('physicist','fyysikko','10/6');
INSERT INTO categories(en,fi,categoryId) VALUES ('researcher','tutkija','10/7');
INSERT INTO categories(en,fi,categoryId) VALUES ('scientist','tiedemies','10/8');

/* Health care and social work */

INSERT INTO categories(en,fi,categoryId) VALUES ('carer','hoitaja, huoltaja','11/1');
INSERT INTO categories(en,fi,categoryId) VALUES ('counsellor','valtuutettu','11/2');
INSERT INTO categories(en,fi,categoryId) VALUES ('dentist','hammaslääkäri','11/3');
INSERT INTO categories(en,fi,categoryId) VALUES ('dental hygienist','hammashygienisti','11/4');
INSERT INTO categories(en,fi,categoryId) VALUES ('doctor','lääkäri','11/5');
INSERT INTO categories(en,fi,categoryId) VALUES ('midwife','kätilö','11/6');
INSERT INTO categories(en,fi,categoryId) VALUES ('nanny','lastenhoitaja','11/7');
INSERT INTO categories(en,fi,categoryId) VALUES ('nurse','sairaanhoitaja','11/8');
INSERT INTO categories(en,fi,categoryId) VALUES ('optician','optikko','11/9');
INSERT INTO categories(en,fi,categoryId) VALUES ('paramedic','ensiapuhoitaja','11/10');
INSERT INTO categories(en,fi,categoryId) VALUES ('pharmacist tai chemist','farmaseutti','11/11');
INSERT INTO categories(en,fi,categoryId) VALUES ('physiotherapist','fysioterapeutti','11/12');
INSERT INTO categories(en,fi,categoryId) VALUES ('psychiatrist','psykiatri','11/13');
INSERT INTO categories(en,fi,categoryId) VALUES ('social worker','sosiaalityöntekijä','11/14');
INSERT INTO categories(en,fi,categoryId) VALUES ('surgeon','kirurgi','11/15');
INSERT INTO categories(en,fi,categoryId) VALUES ('veterinary surgeon','eläinlääkäri','11/16');

/* Other professions */

INSERT INTO categories(en,fi,categoryId) VALUES ('blacksmith','seppä','12/1');
INSERT INTO categories(en,fi,categoryId) VALUES ('bricklayer','muurari','12/2');
INSERT INTO categories(en,fi,categoryId) VALUES ('builder','rakentaja','12/3');
INSERT INTO categories(en,fi,categoryId) VALUES ('carpenter','puuseppä','12/4');
INSERT INTO categories(en,fi,categoryId) VALUES ('chimney sweep','nuohooja','12/5');
INSERT INTO categories(en,fi,categoryId) VALUES ('cleaner','siivoja','12/6');
INSERT INTO categories(en,fi,categoryId) VALUES ('decorator','sisustussuunnittelija','12/7');
INSERT INTO categories(en,fi,categoryId) VALUES ('driving instructor','autokoulun opettaja','12/8');
INSERT INTO categories(en,fi,categoryId) VALUES ('electrician','sähkömies','12/9');
INSERT INTO categories(en,fi,categoryId) VALUES ('gardener','puutarhuri','12/10');
INSERT INTO categories(en,fi,categoryId) VALUES ('glazier','lasittaja','12/11');
INSERT INTO categories(en,fi,categoryId) VALUES ('groundsman','kentänhoitaja','12/12');
INSERT INTO categories(en,fi,categoryId) VALUES ('masseur','hieroja (mies)','12/13');
INSERT INTO categories(en,fi,categoryId) VALUES ('masseuse','hieroja (nainen)','12/14');
INSERT INTO categories(en,fi,categoryId) VALUES ('mechanic','mekaanikko','12/15');
INSERT INTO categories(en,fi,categoryId) VALUES ('pest controller','tuholaistorjuja','12/16');
INSERT INTO categories(en,fi,categoryId) VALUES ('plasterer','rappaaja','12/17');
INSERT INTO categories(en,fi,categoryId) VALUES ('plumber','putkimies','12/18');
INSERT INTO categories(en,fi,categoryId) VALUES ('roofer','katontekijä','12/19');
INSERT INTO categories(en,fi,categoryId) VALUES ('stonemason','kivenhakkaaja','12/20');
INSERT INTO categories(en,fi,categoryId) VALUES ('tattooist','tatuoija','12/21');
INSERT INTO categories(en,fi,categoryId) VALUES ('tiler','laatoittaja','12/22');
INSERT INTO categories(en,fi,categoryId) VALUES ('tree surgeon','arboristi','12/23');
INSERT INTO categories(en,fi,categoryId) VALUES ('welder','hitsaaja','12/24');
INSERT INTO categories(en,fi,categoryId) VALUES ('window cleaner','ikkunanpesijä','12/25');

INSERT INTO categories(en,fi,categoryId) VALUES ('archaeologist','arkeologi','12/26');
INSERT INTO categories(en,fi,categoryId) VALUES ('architect','arkkitehti','12/27');
INSERT INTO categories(en,fi,categoryId) VALUES ('charity worker','hyväntekeväisyystyöntekijä','12/28');
INSERT INTO categories(en,fi,categoryId) VALUES ('civil servant','valtion virkamies','12/29');
INSERT INTO categories(en,fi,categoryId) VALUES ('construction manager','rakennusjohtaja','12/30');
INSERT INTO categories(en,fi,categoryId) VALUES ('council worker','valtuuston työntekijä','12/31');
INSERT INTO categories(en,fi,categoryId) VALUES ('diplomat','diplomaatti','12/32');
INSERT INTO categories(en,fi,categoryId) VALUES ('engineer','insinööri','12/33');
INSERT INTO categories(en,fi,categoryId) VALUES ('factory worker','tehdastyöntekijä','12/34');
INSERT INTO categories(en,fi,categoryId) VALUES ('farmer','maanviljelijä','12/35');
INSERT INTO categories(en,fi,categoryId) VALUES ('firefighter (perinteisesti fireman)','palomies','12/36');
INSERT INTO categories(en,fi,categoryId) VALUES ('fisherman','kalastaja','12/37');
INSERT INTO categories(en,fi,categoryId) VALUES ('housewife','kotiäiti','12/38');
INSERT INTO categories(en,fi,categoryId) VALUES ('interior designer','sisustussuunnittelija','12/39');
INSERT INTO categories(en,fi,categoryId) VALUES ('interpreter','tulkki','12/40');
INSERT INTO categories(en,fi,categoryId) VALUES ('landlord','vuokraisäntä','12/41');
INSERT INTO categories(en,fi,categoryId) VALUES ('librarian','kirjastonhoitaja','12/42');
INSERT INTO categories(en,fi,categoryId) VALUES ('miner','kaivosmies','12/43');
INSERT INTO categories(en,fi,categoryId) VALUES ('model','malli','12/44');
INSERT INTO categories(en,fi,categoryId) VALUES ('politician','politiikko','12/45');
INSERT INTO categories(en,fi,categoryId) VALUES ('postman','postinkantaja','12/46');
INSERT INTO categories(en,fi,categoryId) VALUES ('property developer','aluerakentaja','12/47');
INSERT INTO categories(en,fi,categoryId) VALUES ('refuse collector (tunnetaan myös nimellä bin man)','roskakuski','12/48');
INSERT INTO categories(en,fi,categoryId) VALUES ('surveyor','maanmittari, tarkastaja','12/49');
INSERT INTO categories(en,fi,categoryId) VALUES ('temp (lyhennelmä sanoista temporary worker)','määräaikainen työntekijä','12/50');
INSERT INTO categories(en,fi,categoryId) VALUES ('translator','kääntäjä','12/51');
INSERT INTO categories(en,fi,categoryId) VALUES ('undertaker','hautausurakoitsija','12/52');

