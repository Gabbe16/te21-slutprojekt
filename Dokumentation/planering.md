# Projekt: Planering

## Vad?

Min tanke på projektet är att använda login systemet som vi precis arbetat med och kombinera det med spel recensionerna som jag gjorde i ett tidigare projekt. Detta kommer fungera genom att använda och justera gammal kod ifrån de äldre projekten.

## Hur?

Jag gör detta projekt genom att se över de gamla delarna av min kod där jag plockar ut det jag behöver när det gäller databas.js och server.js. Efter det behöver jag göra en .gitignore och .env för att inte ladda upp onödig eller känslig information. Strukturen från de andra projekten kommer även användas här men jag kommer att behöva planera vilka routes som kommer att användas.

Planen för routes är /reviews där man kan se alla recensioner, /review/:id för att se en specifik recensionen, /newreview eller /review/new där man kan posta sin egna recension, en /signup för att göra en användare, en /login för att logga in med en användare och en /minaSidor för att se sina egna recensioner. Själva designen när det kommer till färg syns nedan.

![Css color scheme](/public/images/Colors.JPG "CSS Color plan")

Jag kommer även använda den gamla databasen för spel och spel recensioner men också skapa en ny för att kunna spara skapade användare för login. Data som behöver sparas är spel (id, namn, description), recensioner (id, game_id, title, text, score) och användare (id, username, password). Ifall jag behöver hjälp så frågar jag eller använder mig av video guides som Jens har gjort. 

## Varför?

Jag vill göra detta eftersom jag vill fördjupa min kunskap och detta projekt skulle göra att jag förstår mer hur ett login-system fungerar och hur man kan kombinera det med andra saker jag gjort sedan tidigare som spelrecensionerna.

## Mål

Målet med projektet är att repetera och fördjupa mina kunskaper och se till att saker och ting sitter när det kommer till databaser och login system genom att kombinera spelrecensioner och login. Repetition gäller mest när det kommer till html, css och Javascript där jag bör förstå hur dessa fungerar och sedan kunna använda mig av.

## Ordningsplanering

V. 15
Planering + början av projekt (Se över gammal kod och planera routes)

V. 16
Kopiera in och fixa login system från gammalt projekt

V. 17
Kopiera in och fixa spel recensioner så att det fungerar med login systemet

V. 18
Färdigställa kod för spel recensioner och login så att det fungerar

V. 19
Om koden är klar påbörja design annars fortsätt färdigställa kod

V. 20
Börja med design och färdigställa design

V. 21
Färdigställ projektet med kod och design
