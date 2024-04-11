## Loggbok

# Vecka 15 Måndag (2024-04-08)

Planeringen för slut projeketet är nästan klar och själva strukturen för projektet är redo. Det jag har gjort är att jag skapat projektet utifrån följande:

* Skapa ny mapp mkdir nytt-projekt
* Gå in i mappen cd nytt-projekt
* Initiera npm med npm init -y i terminalen
* Installera alla paket jag behöver med npm i express nunjucks i terminalen
* Jag behöver en databas så jag installerar också npm i mysql2 dotenv
* Installera dev dependencies npm i -D nodemon
* Skapa en .gitignore fil med touch .gitignore
* Lägga till node_modules och .env i .gitignore
* Skapa en server.js fil med touch server.js
* Skapa en .env fil med touch .env
* Initiera git med git init
* Öppna projektet i VS Code med code . och nu är projektet redo

# Vecka 15 Tisdag (2024-04-09)

Planeringen är slutförd och godkänd. Skapade en tabell för använadare i tablePlus som heter gabriel_login och lade till fältet user_id på recensioner i tabellen gabriel_reviews. Jag har lagt till alla njk filer i views mappen för att börja förbereda alla routes. Jag har gjort färdigt login.njk och signup.njk för att kunna börja göra klart login systemet. I index.js har jag gjort en index route, login route och signup route som förberedelse för själva koden som kommer att vara där nästa vecka.

Ett problem som jag har löst idag var att jag fick error meddelande om att Route.use() inte fungerade men detta var ett enkelt problem att lösa eftersom jag hade missat en bit av koden längst ned i index.js som var module.exports = router. Detta fixade problemet och jag kunde fortsätta och testa mina förberedda routes.

# Vecka 15 Torsdag (2024-04-11)

Enligt planeringen bör jag har börjat med att föra in gammal kod och det har jag gjort. Det finns nu en navbar på webbsidan som leder till login, signup, startsida, alla recensioner (även om denna inte är gjord ännu). Själva signup systemet fungerar nu och man kan registrera en använade som sparas i databasen. Lösenordet för användaren sparas som ett hash ifrån bcrypt för säkerhet. För att använda mig utav bcrypt installerade jag det eftersom jag inte gjorde det när jag förberedde projektet.

Ett problem som jag har löst idag är att bcrypt inte fungerade ett tag tills jag kom på att jag inte hade installerat det. För att lösa detta surfade jag till https://www.npmjs.com/package/bcrypt för att se hur man installerade det och sedan kunna använda mig av bcrypt korrekt

