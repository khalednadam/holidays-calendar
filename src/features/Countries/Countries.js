import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadCountries, selectCountries, selectIsFailed, selectIsLoading } from './countriesSlice';
import Select from 'react-select';
import './countries.css';
import { selectCountry } from './selectedCountrySlice';


export const Countries = () =>{
    const dispatch = useDispatch();
    const [selectedCountryState, setSelectedCountryState] = useState(null);
    const countries = useSelector(selectCountries);
    useEffect(() =>{
        dispatch(loadCountries());
        dispatch(selectCountry(selectedCountryState?.value))
    }, [dispatch, selectedCountryState]);
    let options = [];
    const selectStyles = {
        control: (styles) => ({ ...styles, backgroundColor: "white", width: "90%", marginTop: 20, margin: '20px auto', zIndex: 5000}),
        option: (styles, { isDisabled }) => {
          return {
            ...styles,
            zIndex: 10000,
            color: "black",
            
            backgroundColor: isDisabled ? "gray" : "#FFF",
            cursor: isDisabled ? "not-allowed" : "default"
          };
        }
      };
    countries.map(country => options.push({value: country.code, label: country.name}))
    return(
        <div className='select'>
            
                <Select
                    defaultValue={selectedCountryState}
                    onChange={setSelectedCountryState}
                    options={options}
                    styles={selectStyles}
                />
            <h1>{selectedCountryState?.label} </h1>
        </div>
    );
}