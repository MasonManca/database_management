
/**********************************************************************
 * NAME: Mason Manca
 * CLASS: CPSC 321 Sec. 01
 * DATE: 11 October 2022
 * HOMEWORK: Homework 2
 * DESCRIPTION: CIA World Factbook
 **********************************************************************/

-- Drop table statements

DROP TABLE IF EXISTS Border;
DROP TABLE IF EXISTS City;
DROP TABLE IF EXISTS Province;
DROP TABLE IF EXISTS Country;

-- create table statements
CREATE TABLE Country
(
    country_code char(2) NOT NULL,
    country_name VARCHAR(50) NOT NULL,
    gdp INT NOT NULL,
    inflation FLOAT NOT NULL,
    PRIMARY KEY (country_code,country_name)
);

CREATE TABLE Province
(
    province_name VARCHAR(50) NOT NULL,
    country_code CHAR(2) NOT NULL,
    area INT NOT NULL,
    PRIMARY KEY (province_name, country_code),
    FOREIGN KEY (country_code) REFERENCES Country(country_code)
);

CREATE TABLE City
(
    city_name VARCHAR(50) NOT NULL,
    province_name VARCHAR(50) NOT NULL,
    country_code CHAR(2) NOT NULL,
    population INT NOT NULL,
    PRIMARY KEY (city_name, province_name, country_code),
    FOREIGN KEY (province_name, country_code) REFERENCES Province(province_name, country_code)
);

CREATE TABLE Border
(
    country_code_1 CHAR(2) NOT NULL,
    country_code_2 CHAR(2) NOT NULL,
    border_length INT NOT NULL,
    PRIMARY KEY (country_code_1, country_code_2),
    FOREIGN KEY (country_code_1) REFERENCES Country(country_code),
    FOREIGN KEY (country_code_2) REFERENCES Country(country_code)
);


-- Insert statements

-- Country inserts
INSERT INTO Country
VALUES('FR', 'France', 40000, 4.3 );
INSERT INTO Country
VALUES('DE', 'Germany', 49000, 5.1 );
INSERT INTO Country
VALUES('CH', 'Switzerland', 65000, 2.3 );
INSERT INTO Country
VALUES('GR', 'Greece', 55000, 1.7);

-- Province inserts
-- France
INSERT INTO Province
VALUES('Brittany', 'FR', 22000 );
INSERT INTO Province
VALUES('Corsica', 'FR', 22300 );
INSERT INTO Province
VALUES('Paris Region', 'FR', 21000 );
-- Germany
INSERT INTO Province
VALUES('Lublin Voivodeship', 'DE', 13450 );
INSERT INTO Province
VALUES('Mazowsze Voivodeship', 'DE', 12480 );
INSERT INTO Province
VALUES('Kalisz Voivodeship', 'DE', 12410 );
-- Switzerland
INSERT INTO Province
VALUES('Uri', 'CH', 12900 );
INSERT INTO Province
VALUES('Zug', 'CH', 15300 );
INSERT INTO Province
VALUES('Bern', 'CH', 18900 );
-- Greece
INSERT INTO Province
VALUES('Achaea', 'GR', 53000 );
INSERT INTO Province
VALUES('Arcadia', 'GR', 51000 );
INSERT INTO Province
VALUES('Boeotia', 'GR', 55000 );

--  City insert statements
-- France
INSERT INTO City
VALUES('Dinan', 'Brittany', 'FR', 47000);
INSERT INTO City
VALUES('Lovronan', 'Brittany', 'FR', 32000);
INSERT INTO City
VALUES('Saint-Malo', 'Brittany', 'FR', 24900);
INSERT INTO City
VALUES('Dinan', 'Corsica', 'FR', 66000);
INSERT INTO City
VALUES('Lovronan', 'Corsica', 'FR', 24000);
INSERT INTO City
VALUES('Saint-Malo', 'Corsica', 'FR', 12800);
INSERT INTO City
VALUES('Paris', 'Paris Region', 'FR', 222000000);
INSERT INTO City
VALUES('Montreuil', 'Paris Region', 'FR', 660000);
INSERT INTO City
VALUES('Versailles', 'Paris Region', 'FR', 24600);
-- 'Germany'
INSERT INTO City
VALUES('Lublin', 'Lublin Voivodeship', 'DE', 340000);
INSERT INTO City
VALUES('Chelm', 'Lublin Voivodeship', 'DE', 24500);
INSERT INTO City
VALUES('Wlodawa', 'Lublin Voivodeship', 'DE', 15000);
INSERT INTO City
VALUES('Warsaw', 'Mazowsze Voivodeship', 'DE', 22000000);
INSERT INTO City
VALUES('Radom', 'Mazowsze Voivodeship', 'DE', 243000);
INSERT INTO City
VALUES('Siedlce', 'Mazowsze Voivodeship', 'DE', 12500);
INSERT INTO City
VALUES('Warsaw', 'Kalisz Voivodeship', 'DE', 220000000);
INSERT INTO City
VALUES('Radom', 'Kalisz Voivodeship', 'DE', 245000);
INSERT INTO City
VALUES('Siedlce', 'Kalisz Voivodeship', 'DE', 12500);
-- Switzerland
INSERT INTO City
VALUES('Altdorf', 'Uri', 'CH', 24500);
INSERT INTO City
VALUES('Erstfeld', 'Uri', 'CH', 12550);
INSERT INTO City
VALUES('Schattdorf', 'Uri', 'CH', 245000);
INSERT INTO City
VALUES('Zug', 'Zug', 'CH', 17000);
INSERT INTO City
VALUES('Cham', 'Zug', 'CH', 36000);
INSERT INTO City
VALUES('Baar', 'Zug', 'CH', 69000);
INSERT INTO City
VALUES('Bern', 'Bern', 'CH', 140000);
INSERT INTO City
VALUES('Biel', 'Bern', 'CH', 50000);
INSERT INTO City
VALUES('Thun', 'Bern', 'CH', 17000);
-- Greece
INSERT INTO City
VALUES('Akrata', 'Achaea', 'GR', 16000000);
INSERT INTO City
VALUES('Patra', 'Achaea', 'GR', 500000);
INSERT INTO City
VALUES('Diakofto', 'Achaea', 'GR', 17000);
INSERT INTO City
VALUES('Tripoli', 'Arcadia', 'GR', 14000);
INSERT INTO City
VALUES('Levidi', 'Arcadia', 'GR', 94000);
INSERT INTO City
VALUES('Vitina', 'Arcadia', 'GR', 640000);
INSERT INTO City
VALUES('Thiva', 'Boeotia', 'GR', 36000);
INSERT INTO City
VALUES('Tanagra', 'Boeotia', 'GR', 21000);
INSERT INTO City
VALUES('Thespiae', 'Boeotia', 'GR', 64000);

-- border insert statements

INSERT INTO Border
VALUES('CH', 'FR', 400);
INSERT INTO Border
VALUES('DE', 'FR', 200);
INSERT INTO Border
VALUES('GR', 'FR', 150);

-- cities with same population

SELECT *
FROM Country;
SELECT *
FROM Province;
SELECT *
FROM City;
SELECT *
FROM Border;
