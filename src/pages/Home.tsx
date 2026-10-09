import { useEffect } from 'react'
import CountriesList from '../components/countries/CountriesList'
import { getAllCountries } from '../services/countriesApi';

export default function Home() {
  console.log("Home affiché");

  useEffect(() => {
    getAllCountries()
      .then((countries) => console.log("countries", countries))
      .catch((error) => console.error(error));
  }, []);
  
  return (
    <div>
      <CountriesList/>
    </div>
  )
}
