# PS 9 - 12.05.2024 Integracja z API / Axios - https://axios-http.com/docs/intro

Instalacja Axios:

Axios - `npm install axios`

Instalacja i odpalenie API:

- w oddzielnym terminalu wejdź do folderu z API

- npm install

- npm run start

API powinno zostać odpalone lokalnie z portem `4000` , aby sprawdzić czy działa poprawnie wejdź pod adres `http://localhost:4000/`, powinieneś zobaczyć stosowny komunikat

API posiada dokumentacje (opis endpointów) utworzoną za pomocą narzędzia swagger, jest ona dostępna pod adresem  `http://localhost:4000/swagger`

Ponadto poniżej opis endpointów z których będziemy korzystali na zajęciach

`http://localhost:4000/airports/list` GET - zwraca podstswową listę lotnisk (id oraz nazwę lotniska)

`http://localhost:4000/airports/delayed-list` GET - jak wyżej z opóźnieniem (czasem wykonania) - 3s

`http://localhost:4000/airports/delayed-list-failed` GET - zapytanie z opóźnieniem 3s które zawsze zwraca błąd (`500 Internal Server Error`)

`http://localhost:9000/airports/details/:id` GET - zwraca szczegółowe dane lotniska o podanym id

`http://localhost:9000/airports/:id` DELETE - usuwa lotnisko o podanym id

`http://localhost:9000/airports/new` POST - dodaje nowe lotnisko, wymaga wysłania obiektu (JSON)

{
"name": "Luton",
"city": "Luton",
"country": "UK",
"iata_code": "LUT",
}

# Zadanie 1 - Przygotowanie komponentu Airports

  - utwórz nowy route /dashboard/airports
  - utworzona ścieżka potrzebuje nowego komponentu < Airports /> który wyświetli przycisk `<button> Załaduj listę lotnisk </button />`
  - do komponentu Header dodaj nowy tab z tekstem "Airports", który będzie przenosił użytkownika do /dashboard/airports
  - upewnij się, że utworzony komponent wyświetla się po naciśnięciu utworzonego tab'a
  -
# Zadanie 2 - Pobranie i wyświetlenie lotnisk z API
- po naciśnięciu przycisku "Załaduj listę" wywołaj funkcję (asynchroniczną), która pobierze listę lotnisk z API `http://localhost:4000/airports/list`, wykorzystaj do tego bibliotekę axios
- pobrane lotniska przypisz do stanu i wyświetl w komponencie jako liste nazw lotnisk

# Zadanie 3 - AirportsContext
- utwórz nowy Context o nazwie AirportsContext, który będzie zawierał stan airportsList
- opakuj aplikację z AirportsProvider aby można było korzystać z kontekstu wewnątrz komponentów
- w komponencie < Airports /> zamiast korzystać z wewnętrznego stanu wykorzystaj ten w nowo utworzonym kontekście (zapisujemy lotniska i je odczytujemy z AirportContext)
- dodatkowo w Headerz'e w tabie Airports wypisz sumę lotnisk, które zostały pobrane (możesz to zrobić w prosty sposób dzięki temu, że lotniska zostały przeniesione do wspólnego kontekstu

# Zadanie 4 - Monitorowanie etapów zapytania, stany "initial" / "loading" / "success" / "error"

Zapytania do API z różnych przyczyn mogą zajmować mniej lub więcej czasu, w związku z tym możemy wyróżnić kilka zauważalnych etapów każdego zapytania:

-   `initial`  - stan początkowy przed wywołaniem

-   `loading`  - stan utrzymujący się podczas obługi zapytania

-   `success`  - stan po pomyślnym zakończeniu zapytania

-   `error`  - stan po niepomyślnym zakończeniu zapytania (np. błędny adres)


W ramach tego zadania:
- w komponencie < Airports /> utwórz stan o nazwie "airportsLoadingStatus" o wartości domyślnej "initial"
- w utworzonej asynchronicznej funkcji w odpowiednich miejscach modyfikuj stan zgodnie z powyższymi opisami
- wypisz stan w konsoli i sprawdź czy zmienia się on zgodnie z oczekiwaniami
-  sprawdź również zapytanie `http://localhost:4000/airports/delayed-list-failed`, które po 3 sekundach powinno zwrócić błąd


# Zadanie 5 - Pobranie z opóźnieniem / obsługa statusu "error"
Aby wizualnie zaobserwować wyniki tego zadania wykorzystaj zapytania do API, które wykonują się 3 sekundy tj.
- `http://localhost:4000/airports/delayed-list`
- `http://localhost:4000/airports/delayed-list-failed`

- wykorzystując utworzony stany z zadania 4, dla statusu loading wyświetl w komponencie komponent ładowania https://mui.com/material-ui/react-progress/#linear-indeterminate jako informację dla użytkownika o procesie przetwarzania zapytania
- po pomyślnym zakończeniu zapytania schowaj komponen ładowania i pokaż listę lotnisk
- jeżeli zapytanie zwróci błąd, pobierz jego tekst w sekcji catch i wyświetl na 3 sekundy za pomocą komponentu Snackbar https://mui.com/material-ui/react-snackbar/#introduction, aby t ozrobić bedziesz musiał zapisać tekst błędy do stanu, na podstawie tego wyświetlić wspomniany komponent, a następnie wyczyścić ten stan po upływie czasu


# Zadanie 6 - Szczegóły lotniska - pobierane z API

- utwórz nowy route /dashboar/airport/:id który będzie wyświetlał nowy komponent < AirportDetails>
- kliknięcie na nazwę lotniska w komponencie < Airports /> powinna przenosić użytkownika na adres /dashboard/airport/:id
- funkcja return w komponencie < AirportDetails > będzie wyświetlała szczegóły lotniska (przykład funkcji return poniżej)
```jsx
return (

	<div  className={"AirportDetails"}>

		<h1>Airport details</h1>

		{selectedAirport ? (

			<div>

				<h2>Name: {selectedAirport.name}</h2>

				<p>City: {selectedAirport.city}</p>

				<p>Country: {selectedAirport.country}</p>

				<p>Iata Code: {selectedAirport.iata_code}</p>

		</div>

		) : (

		<p>Lotnisko nie zostało jeszcze załadowane</p>

		)}

	</div>

);
```
  - komponent przed wywołaniem powyższej metody return powinien:
	  - odczytać id wybranego lotniska ze ścieżki (wykorzystaj hook useParams z poprzednich zajęć)
	  - wykorzystać uzysjane id, pobrać z API i przypisać do stanu "selectedAirport" detale lotniska o wybranym id, wykorzystaj do tego API `bashhttp://localhost:4000/airports/details/:id`

# Zadanie 7 - Usuwanie lotniska z bazy danych (API)

- w komponencie < AirportDetails > dodaj przycisk "Remove airport"
- po kliknięciu na przycisk:
	- usuń lotnisko z bazy danych za pomogą zapytania DELETE `bashhttp://localhost:4000/airports/:id`
	- przenieś użytkownika na stronę /dashboard/airports
	- zmowyfikuj komponent < Airports /> w taki sposób aby za każdym razem gdy będzie wyświetlany, wczytywał listę lotnisk z API
	- usuń kilka lotnisk, upewnij się że licznik w Headerz'e również działa poprawnie,
	- aby przywrócić listę lotnisk do stanu początkowego wyłącz i włącz ponownie API
