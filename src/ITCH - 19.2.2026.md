```
Pořídili jsme čtvercovou fotografii, v jednom řádku je 1565 pixelů, Kvantování je zvoleno na 7 bitů. Před uložením byla provedena komprese na formát jpg v poměru 1:10. 

Jakou velikost bude obrázek zabírat na úložišti počítače?
Kolik různosti barev bude obrázek obsahovat?
```


# Kódodání a jak přemýšlí počítač
- Veškere jeho "uvažování" probíhá pomocí binárníjo kódu

- Tento binární kód reprezentujeme pomocích maličkých tranzistorů, 0=Ne, 1=Ano
- Čislo můžeme reprezento pomocí jakékoliv číselné soustany
## Code page - kódovací tabulka

- Funguje jako "slovník" který každému znaku přiřadí číselnou hodnotu.
- Např: a=97, h=104, o=111, j=106

- Tato čísla potom můžeme převést do dvojkové soustavy

![Alt](https://janav.wordpress.com/wp-content/uploads/2013/04/437-us.gif)

## Nastává problém
- Různé čisla ve dvojkové soustavě mají různé velikosti
- Všechny čísla ve dvojkové soustavě musí mít 8 čísel
- Když číslo ve dvojkové soustavě je menší než 8 tak se před něj zapíšou nuly

## Kódovací tabulka ASCII

- V PC je osmibitová logika (jeden bajt může reprezentovat 256 stavů)
- **Kódy 0-31:** řídící znaky (určují to co má program udělat když na specifický znak narazí)
- **Kódy 32-127:** všechny kódové stránky mají stejné (písmena, znaky, číslice)
- **Kódy 128-255:** speciální symboly typické pro různé abecedy

> ASCII (American Stanard Code for Information Interchange)

>existuje i UNICODE (mezinárodní)
