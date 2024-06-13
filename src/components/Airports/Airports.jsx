import axios from 'axios' 
import './Airports.css'
import { useContext, useState } from 'react'
import { LinearProgress, Snackbar } from '@mui/material';
import { Link } from 'react-router-dom';
import { AirportsContext } from '../../context/airportsContext';


// w komponencie < Airports /> zamiast korzystać z wewnętrznego stanu wykorzystaj ten w nowo utworzonym kontekście (zapisujemy lotniska i je odczytujemy z AirportContext)

const Airports = () => {
	const {airportsList, setAirportsList} = useContext(AirportsContext);
	const [errorMessage, setErrorMessage] = useState("");
	const [airportsResponseStatus, setAirportsResponseStatus] = useState("initial");

	const handleLoadAirports = async (url) => {
		setAirportsResponseStatus("loading");
		try {
			const airportsResponse = await axios.get(url);
			setAirportsResponseStatus("success");
			setAirportsList(airportsResponse.data);
		} catch (error) {
			setErrorMessage(error.message)
			setAirportsResponseStatus("failed");
				}
			}

return <div className={'Airports'}>
	<Snackbar
  open={errorMessage}
  autoHideDuration={6000}
  onClose={() => setErrorMessage("")}
  message={errorMessage}
/>
	<button onClick={ () => handleLoadAirports ('http://localhost:4000/airports/list')}>Załaduj listę lotkisk</button>
	<button onClick={ () => handleLoadAirports ('http://localhost:4000/airports/delayed-list')}>Załaduj listę lotkisk opóżnione</button>
	<button onClick={ () => handleLoadAirports ('http://localhost:4000/airports/delayed-list-failed')}>Załaduj listę lotkisk failed</button>
		<ul>
			{airportsResponseStatus === "loading" ? (
				<LinearProgress />
			) : (
			airportsList.map(( airport) => (
				<Link key={airport.id} to={`/dashboard/airport/${airport.id}`}>
					<li key={airport.id}> {airport.name} </li>
					</Link>
			))
			)}
		</ul>
	</div>
}

export default Airports;