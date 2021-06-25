import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useTranslation } from 'react-i18next'
import './style.css';

const COUNTRIES_URL = "https://restcountries.eu/rest/v2/all"
export const Search = (props) => {
  const { t } = useTranslation();
  const [display, setDisplay] = useState(false)
  const [options, setOptions] = useState([])
  const [search, setSearch] = useState('')
  const [err, setErr] = useState(false)

  useEffect(() => {

    axios
		.get(COUNTRIES_URL)
		.then(
			res => {
				setOptions(res.data);
			},
      error => {
				console.log(error.toString())
			})

  }, [])

  const onChange = (e) => {
    setErr(e.target.value ? false : true)
    setSearch(e.target.value)
  }

  const selectItem = item => {
    setSearch(item.name)
    props.value(item)
    setDisplay(false)
  };

  return (
    <div className="pos-rel">
      <div className="label"></div>
      <input
        id='search'
        name='search'
        type='text'
        data-testid="search"
        onClick={() => setDisplay(!display)}
        value={search}
        onChange={e => onChange(e)}
      />
      {err && (
        <span className="alert" role='alert'>{t('validations.required')}</span>
      )}
      {display && (
        <div className="search-container">
          {options
            .filter(({ name }) => name.toLowerCase().indexOf(search.toLowerCase()) > -1)
            .slice(0, 10)
            .map((c, i) => {
              return (
                <div
                  id="options"
                  onClick={() => selectItem(c)}
                  className="option"
                  key={i}
                  tabIndex="0"
                >
                  <span className="label">{c.name}</span>
                  <img src={c.flag} alt="country" className="flag"/>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
