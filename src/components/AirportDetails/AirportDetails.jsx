import { useNavigate, useParams } from 'react-router-dom';
import './AirportDetails.css'
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AirportsContext } from '../../context/airportsContext';

const AirportDetails = () => {
	const {airportsList, setAirportsList} = useContext(AirportsContext);
	const { id } = useParams();
	const [airportDetails, setAirportDetails] = useState(null);
	const navigate = useNavigate();

	const handleRemoveAirport = async () => {
		try {
			await axios.delete(`http://localhost:4000/airports/${id}`);
			navigate('/dashboard/airports/');
			setAirportsList(airportsList.filter((airport) => airport.id !== id));
		} catch (error) {
			alert(error.message);
		}
	}

	useEffect( () => {
		async function fetchData () {
			try {
				const airportDetailsResponse = await axios.get(`http://localhost:4000/airports/details/${id}`);
				setAirportDetails(airportDetailsResponse.data);
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, [id]);

	return (

		<div  className={"AirportDetails"}>
			<h1>Airport details</h1>
			{airportDetails ? (
				<div>
					<h2>Name: {airportDetails.name}</h2>
					<p>City: {airportDetails.city}</p>
					<p>Country: {airportDetails.country}</p>
					<p>Iata Code: {airportDetails.iata_code}</p>
					<button onClick={handleRemoveAirport}>
						Usuń lotnisko
					</button>
			</div>
			) : (
			<p>Lotnisko nie zostało jeszcze załadowane</p>
			)}
		</div>
	);
}

export default AirportDetails;