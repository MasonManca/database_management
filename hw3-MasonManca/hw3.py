# Mason Manca
# CPSC 321
# Doctor Bowers
# 13 October 2022
# Project 6: Homework 3
# Note: couldn't figure out a bug in c++ in time, so sadly you're left with python. Stay strong Dr.B.

import mysql.connector
import config

def main():
    try: 
        # connection to database
        usr = config.mysql['user']
        pwd = config.mysql['pass']
        hst = config.mysql['host']
        dab = 'mmanca2_DB'
        con = mysql.connector.connect(user=usr,password=pwd, host=hst,database=dab)

        userInput = 0

        # loop continues until exit
        while(userInput != 5):
            print('------------------------------')
            # display main menu
            print('1. List Countries')
            print('2. Add Country')
            print('3. Find Countries based on GDP and Inflation')
            print('4. Update Country GDP and Inflation')
            print('5. Exit')
            userInput = int(input('Please enter your choice (1-5) : '))

            # userInput = 1: list countries
            if (userInput == 1):
                rs = con.cursor()
                q = "SELECT * FROM Country"
                rs.execute(q)
                row = rs.fetchone()
                while (row != None):
                    print(row[1] + " (" + row[0] + ")", "GDP: " + str(row[2]), "Inflation: " + str(row[3]))
                    row = rs.fetchone()
                rs.close()
                rs.reset()

            # userInput = 2: add country
            if (userInput == 2):
                country_code = input("Please enter the country's code: ")
                name = input("Please enter the country's name: ")
                gdp = input("Please enter the country's GDP: ")
                inflation = input("Please enter the country's inflation: ")

                # This section is for ensuring the country is not already in the DB
                rs = con.cursor()
                q = "SELECT * FROM Country WHERE country_code = %s"
                rs.execute(q, (country_code,))
                row = rs.fetchone()
                if row != None:
                    print("This country code is already in the database")
                    rs.close()
                    rs.reset()
                else:
                    q = "INSERT INTO Country VALUES (%s,%s,%s,%s)"
                    rs.execute(q, (country_code, name, gdp, inflation))
                    con.commit()
                    rs.reset()

            # userInput = 3: Find countries using GDP and Inflation
            if (userInput == 3):
                min_gdp = input("Minimum GDP: ")
                max_gdp = input("Maximum GDP: ")
                min_inflation = input("Minimum Inflation: ")
                max_inflation = input("Maximum Inflation: ")

                rs = con.cursor()
                q = "SELECT * FROM Country WHERE GDP > %s AND GDP < %s AND Inflation > %s AND Inflation < %s ORDER BY GDP DESC, Inflation ASC"
                rs.execute(q, (min_gdp, max_gdp, min_inflation, max_inflation))

                row = rs.fetchone() # used to retrieve the next row
                if row == None:
                    print("Country is not in the database")
                while row != None:
                    print(row)
                    row = rs.fetchone()
                rs.close()
                rs.reset()
            
            # userInput = 4: Update country's GDP/inflation
            if (userInput == 4):
                country_code = input("Please enter the country's code: ")
                gdp = input("Please enter the country's GDP: ")
                inflation = input("Please enter the country's inflation: ")

                # Determining if the country is in the db, in order to update it
                rs = con.cursor()
                q = "SELECT * FROM Country WHERE country_code = %s"
                rs.execute(q, (country_code,))
                row = rs.fetchone()
                if row != None:
                    q = "UPDATE Country SET GDP = %s, Inflation = %s WHERE country_code = %s"
                    rs.execute(q, (gdp, inflation, country_code))
                    con.commit()
                    rs.reset()
                else:
                    print("Country is not in database")
                    rs.close()
                    rs.reset()
            # userInput = 5: exit program
            if (userInput == 5):
                con.close()
                break
    except mysql.connector.E as err:
        print(err)
        
main() # run program