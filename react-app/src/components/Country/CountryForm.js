import MultiSelect from "../Common/MultiSelect/MultiSelect";
import {useState} from 'react';
const CountryForm = () => {
    const [countries, setCountries] = useState(['India, Australia, Beljium']);
    return (
        <MultiSelect value={countries} onChange={setCountries} />
    );
}
export default CountryForm;