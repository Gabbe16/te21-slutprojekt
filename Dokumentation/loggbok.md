# Loggbok

## Vecka 15 Måndag (2024-04-08)

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

## Vecka 15 Tisdag (2024-04-09)

Planeringen är slutförd och godkänd. Skapade en tabell för använadare i tablePlus som heter gabriel_login och lade till fältet user_id på recensioner i tabellen gabriel_reviews. Jag har lagt till alla njk filer i views mappen för att börja förbereda alla routes. Jag har gjort färdigt login.njk och signup.njk för att kunna börja göra klart login systemet. I index.js har jag gjort en index route, login route och signup route som förberedelse för själva koden som kommer att vara där nästa vecka.

Ett problem som jag har löst idag var att jag fick error meddelande om att Route.use() inte fungerade men detta var ett enkelt problem att lösa eftersom jag hade missat en bit av koden längst ned i index.js som var module.exports = router. Detta fixade problemet och jag kunde fortsätta och testa mina förberedda routes.

## Vecka 15 Torsdag (2024-04-11)

Enligt planeringen bör jag har börjat med att föra in gammal kod och det har jag gjort. Det finns nu en navbar på webbsidan som leder till login, signup, startsida, alla recensioner (även om denna inte är gjord ännu). Själva signup systemet fungerar nu och man kan registrera en användare som sparas i databasen. Lösenordet för användaren sparas som ett hash ifrån bcrypt för säkerhet. För att använda mig utav bcrypt installerade jag det eftersom jag inte gjorde det när jag förberedde projektet.

Ett problem som jag har löst idag är att bcrypt inte fungerade ett tag tills jag kom på att jag inte hade installerat det. För att lösa detta surfade jag till https://www.npmjs.com/package/bcrypt för att se hur man installerade det och sedan kunna använda mig av bcrypt korrekt

## Vecka 16 Måndag (2024-04-15)

Enligt planeringen ska jag börja fixa login systemet så att det går att:

* Logga in
* Skapa en användare som sparas i databasen (Signup)
* Logga ut

Det som fixades idag var att det går att logga in med den skapade användaren som är sparad i databasen och det går även att logga ut nu när man är inloggad. När man är inloggad syns /minasidor (routen är inte färdig) och om man är utloggad syns den inte.

Ett par problem som jag stötte på idag under arbetet

* Glömde ett / på /minasidor route vilket gjorde att routen inte fungerade
* Testade fel user med ett password som inte var döljt vilket gjorde att man fick fel lösenord
* Id och username sattes innan man loggade in vilket är en stor säkerhetsrisk

För att lösa dessa problem frågade jag Jens först eftersom jag inte visste vart jag skulle börja när alla problem uppstod. Det första var att sätta ett /-tecken i routen med /minasidor eftersom jag hade glömt det. För det andra problemet testade jag en user där lösenordet inte var döljt med bcrypt vilket gjorde att det alltid var fel lösenord. Detta problem uppstod för att jag själv hade inte tagit bort eller använt bcrypt på den användaren när jag testade tidigare. För det sista flyttade jag så att id och username sätts när man väl loggar in och inte före eftersom detta är en stor säkerhetsrisk

## Vecka 16 Tisdag (2024-04-16)

I nuläget ligger jag före planeringen och har påbörjat att föra in så att man kan skriva och se recensioner. Det som gjordes idag var följande:

* Nya views för att se recensioner (review.njk, reviews.njk och newreview.njk)
* Nya routes för att kunna navigera till de nya njk-filerna och skapa recensioner med get och post (/review/:id, /reviews och /review/new)

Idag har jag inte löst några problem utan bara fört in kod och redigerat om den på det sättet som jag behöver det till. Ett exempel på detta skulle kunna vara när jag flyttade att man bara kan navigera till skriv en recension när man är inloggad. Det är fortfarande relativt mycket kvar att göra och nedan är en lista på vad:

* Man kan ta bort recensioner när man är utloggad (sina egna och andra)
* Det syns inte vem som har skrivit vilken recension när man klickar in på en enskild (ska fixas med userid)
* Det går inte att se bara sina egna recensioner på minasidor ännu, detta kommer göras om till minarecensioner istället för att göra namngivningen smidigare och även navigationen.
* Möjligtvis flytta att man bara kan ta bort sina egna recensioner på minarecensioner (föredetta minasidor)

## Vecka 17 Måndag + Tisdag (2024-04-22 och 2024-04-23)

### Måndag

Under måndagen fixade jag userid och så att man kan se vem som har skrivit vilken recension. Detta är även kopplat till den som skapar en recension i inloggat läge.

Ett problem jag fixade då var att ändra SQL-Frågan för att göra en JOIN på user_id från gabriel_login på gabriel_reviews för att få user_id under reviews för att sedan kunna sätta det till en user/användare.

### Tisdag

Under tisdagen gjorde jag följande:

* Gjorde en fix för att posta user_id eftersom det blev null annars och kraschade individuella sidor på reviews
* Säkerställde routen /reviews/new genom att redirect till login om man inte är inloggad så att personer som inte är i inloggat läge kan skriva recensioner
* Små text ändringar i njk-filer för tydlighet
* Formatering på filer
* Påbörjat designen på webbsidan med gammal css-kod (Denna är inte klar ännu)

Ett problem som jag löste idag var att fixa att posta user_id eftersom det kraschade individuella sidor inom reviews. Detta löstes genom att ändra på SQL frågan från:

 `INSERT INTO gabriel_reviews (title, text, score, game_id)
        VALUES (?, ?, ?, ?),
            [req.body.title, req.body.text, req.body.score, req.body.game]`

Till:

`INSERT INTO gabriel_reviews (title, text, score, game_id, user_id)
        VALUES (?, ?, ?, ?, ?),
            [req.body.title, req.body.text, req.body.score, req.body.game, req.session.userid]`

Det jag gjorde var att jag lade till ett extra frågetecken som ska vara ett fält där user_id hamnar i databasen och sedan en request för att få den inloggade användarens user_id

## Vecka 17 Torsdag (2024-04-25)

Idag har jag fortsatt med designen på min webbsida med css och även ändrat text på njk filer. Jag har fortfarande kvar att göra designen och sedan göra så att man kan se sina egna recensioner när man är inloggad. Har jag tid kvar kommer jag också göra att man kan ta bort sina egna recensioner i inloggat läge.

## Vecka 18 Måndag (2024-04-29) 

Idag har jag färdigställt mina recensioner sidan (föredetta mina sidor) så att man kan se sina egna recensioner när man är inloggad samt som man kan ta bort dem. Det går inte att ta bort andra användares recensioner eller se andra recensioner än sina egna på mina recensioner sidan. Det jag också gjorde var att fixa .card i css så att texten inte for utanför kortet på sidan.

Ett problem jag löste idag var när jag frågade Jens om hur jag skulle fixa css för kortet. Fixen var att ta bort max width 100% och sedan ta bort all padding right, left och bottom och istället sätta den till bara padding: 2rem

## Vecka 19 Tisdag (2024-05-07)

Idag har jag arbetat med css och med hjälp av Jens så började jag använda mig utav utopia.fyi med variabler för css. Jag har även börjat kolla på videon "Be the browsers mentor, not it's micromanager" av Andy Bell där han förklarar vad utopia.fyi är och hur man på ett smidigare sätt kan skriva css.

## Vecka 20 Tisdag (2024-05-14)

Under denn lektion har jag arbetat med att färdigställa min kod för slutprojektet genom att formatera filer, hantera problem som till exemepl om man loggar in med fel lösenord eller inte fyller i formuläret och till sist att arbeta med css utifrån och med hjälp av utopia.fyi.

## Vecka 21 Måndag (2024-05-23)

Wave validering (Endast label errors)
- 2 alerts på reviews sidan
- 2 errors på logga in och registrera sidan
- 2 errors och alerts på skapa recension sidan

HTML och CSS validering
- Login har error med Element title must not be empty, bad value for attribute for on label element, The value of the for attribute of the label element must be the ID of a non-hidden form control.

- Registering har samma errors som Login

Under denna lektion har jag påbörjat validera min kod och sakta men säkert lösa problemen som börjar dyka om som borde lösas. När det kommer till WAVE validering så har jag endast label fel vilket kommer att fixas under nästa lektion. Det fanns inga kontrastfel på min sida och därför kommer inga färger eller kontraster ändras ännu. Till sist kommer jag också självklart gå igenom mitt projekt under nästa lektion också med mer HTML och CSS validering.

## Vecka 22 Måndag (2024-05-27)

WAVE och Validering med validator.nu är helt klar då jag har kollat igenom hela sidan.

Validator.nu färdigställd med följande:
- Stray end tag a removed
- Bad value for " " for attribute for on element label fixed on signup

WAVE
- 2 alerts fixade genom att byta p-element till h2-element
- 2 alerts fixade genom att byta ett h2-element till h1-element
- 2 errors/alerts fixad genom att byta namn på label text så att den matchar med id texten

Jag har även fört in en bild för att arbeta med hur jag hanterar bilder vilket syns nedan.

Införa bild i projektet
- Komprimerad bild med Optimizilla (https://imagecompressor.com/)
- Gjorde bilden mindre genom att öppna den i paint och ändra storlek.
- Image CSS med max-width: 100%:, width: 100%: och height: auto: