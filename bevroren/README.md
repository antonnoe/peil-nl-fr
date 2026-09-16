# Bevroren versies

Elke publicatie van Peil blijft opvraagbaar onder `/api/versies/<versie>/`. GitHub
Pages vervangt bij elke publicatie de hele site, dus een eerdere versie overleeft
alleen als de build hem meelevert. Daarom staat hier per afgesloten versie een
kopie van de API zoals die toen is uitgeleverd.

`tools/bouw.mjs` kopieert elke map hier naar `dist/api/versies/<versie>/`. De
huidige versie wordt overgeslagen: die wordt vers gebouwd uit de gegevens.

Een bevroren map wordt nooit meer gewijzigd. Een fout in een oude versie wordt
gecorrigeerd in een nieuwe versie, niet met terugwerkende kracht.

Een nieuwe versie bevriezen, na het uitbrengen ervan en voordat de volgende
versie in ontwikkeling gaat:

```
npm run bouw
cp -r dist/api/v1 bevroren/<versie>
```
