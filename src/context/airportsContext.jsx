import { createContext, useState } from "react";

// ++  utwórz nowy Context o nazwie AirportsContext, który będzie zawierał stan airportsList
// ++ opakuj aplikację z AirportsProvider aby można było korzystać z kontekstu wewnątrz komponentów
// w komponencie < Airports /> zamiast korzystać z wewnętrznego stanu wykorzystaj ten w nowo utworzonym kontekście (zapisujemy lotniska i je odczytujemy z AirportContext)
// dodatkowo w Headerz'e w tabie Airports wypisz sumę lotnisk, które zostały pobrane (możesz to zrobić w prosty sposób dzięki temu, że lotniska zostały przeniesione do wspólnego kontekstu

const AirportsContext = createContext();

const AirportsProvider = ({ children }) => {
  const [airportsList, setAirportsList] = useState([]);

  return (
    <AirportsContext.Provider value={{ airportsList, setAirportsList }}>
      {children}
    </AirportsContext.Provider>
  );
};

export { AirportsContext, AirportsProvider }; 