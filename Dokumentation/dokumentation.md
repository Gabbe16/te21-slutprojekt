# Dokumentation om säkerhet, validation, bilder och en färdig produkt

## Validation

Under projektets sista lektioner har jag arbetat med att validera min kod med hjälp av validator.nu och genom att göra detta hittade jag ett par exempel på problem som:

* Stray end tag a
* Bad value for "" for attribute for on element label

Problem som dessa är perfekta exempel på varför jag ska validera min kod utifrån automatiserade tester. Ifall jag inte gjort detta hade jag inte kunnat fixa problemen som påverkar min sida som jag själv hade missat. Jag har även validerat och kollat kontraster med WAVE och ett par exempel på problem som jag stötte på där var följande:

* 2 Alerts with header (h1, h2, etc.)
* 2 Alerts with labels
* 2 Errors with form label

Dessa problem är relativt lätta att fixa men ifall jag inte hade använt mig av automatiserade testet från WAVE är jag väldigt säker på att jag hade missat dessa problem också. När jag väl fixat alla problem kollade jag kontrasterna på min sida och enligt WAVE fanns det inga kontrastfel. Detta gjorde att jag inte behövde ändra min färgdesign som jag hade planerat utifrån planerings dokumentationen med hjälp av coolors. När jag fixat alla problem med både validator.nu och WAVE så var valideringen klar.

## Bilder

För detta projekt har jag infört en bild på startsidan där jag gjort följande steg för att hantera den:

* Komprimera den med hjälp av automatiska online verktyg som t.ex Optimizilla (https://imagecompressor.com/)
* Göra bildens storlek mindre på något sätt som t.ex photoshop eller paint
* Använda CSS som max-width: 100%:, width: 100%: och height: auto: för att få korrekt storlek på sidan

## Säkerhet

Säkerhet för projektet handlar om express-validator som ska kolla ifall de värden som kommer från en användare är säkra. Detta görs genom att i detta fall kolla om en sträng är en integer annars säger den ifrån och ifall det är kod som skrivs som en sql injection körs den inte. Däremot eftersom jag inte jobbat särskilt mycket med detta var det väldigt svårt att använda express-validator. Något som jag borde tänka på för framtiden att arbeta på är hur, varför och när jag ska använda express-validator.

## Produkten/Färdigt projekt

Det färdiga projektet reflekterar det som jag har planerat eftersom målet med projektet var att kombinera spel recensioner med login systemet vi gjorde från alc-login projektet tidigare. Dessutom har jag även lärt mig mycket av att arbeta med detta projekt enligt en planering som gjorde att jag alltid visste vad jag skulle göra.