import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllCountries,
  filterByContinent,
  filterByActivity,
  filterByActivityName,
  sort,
} from '../actions'
import { Link } from 'react-router-dom'
import { Country } from './Country'
import Pages from './Pages'
import styles from './Home.module.css'
import Navbar from './Navbar'
import Error from './Error'

export default function Home() {
  const dispatch = useDispatch()
  const countries = useSelector((state) => state.countries)

  useEffect(() => {
    dispatch(getAllCountries())
  }, [dispatch])

  const [order, setOrder] = useState('')
  //uso estados locales para el paginado
  const [currentPage, setCurrentPage] = useState(1) // empiezo en la pag 1
  const pages = (pageNum) => {
    setCurrentPage(pageNum)
  }
  const countriesPerPage = 10

  //filtro por continente
  function handleContinentFilter(e) {
    dispatch(filterByContinent(e.target.value))
  }

  //filtro por actividad
  function handleActivityFilter(e) {
    dispatch(filterByActivity(e.target.value))
  }

  function handleActivityFilterByName(e) {
    dispatch(filterByActivityName(e.target.value))
  }

  //ordenar por nombre o poblacion
  function handleSort(e) {
    e.preventDefault()
    dispatch(sort(e.target.value))
    setCurrentPage(1)
    setOrder(e.target.value)
  }

  /*
  Lógica: en cada pag, voy tomando del array de países (importado del estado global en la constante countries)
  una slice que vaya desde firstIdx hasta lastIdx, sin incluir este último.
  */
  var lastIdx = currentPage * countriesPerPage // en la primera página, lastIdx = 1 * 10 = 10
  var firstIdx = lastIdx - countriesPerPage // en la primera página, firstIdx = 10 - 10 = 0
  var currentCountries = countries.slice(firstIdx, lastIdx) // en la primera página, currentCharacters = countries.slice(0,10)

  function handleClick(e) {
    e.preventDefault()
    dispatch(getAllCountries())
  }

  return (
    <div className={styles.container}>
      <Navbar
        sort={handleSort}
        contFilter={handleContinentFilter}
        actFilter={handleActivityFilter}
        actNameFilter={handleActivityFilterByName}
      />

      <div className={styles.btnContainer}>
        <button className={styles.btn} onClick={(e) => handleClick(e)}>
          Reload countries
        </button>

        <button className={styles.btn}>
          <Link className={styles.link} to='/activity'>
            Add Activity
          </Link>
        </button>
      </div>

      {/* <div className={styles.countryContainer}>
        {currentCountries &&
          currentCountries.map((c) => (
            <Country
              name={c.name}
              flag={c.flag}
              id={c.id}
              key={c.id}
              continent={c.continent}
            />
          ))}
      </div> */}

      <div className={styles.countryContainer}>
        {currentCountries.length ? (
          currentCountries.map((c) => (
            <Country
              name={c.name}
              flag={c.flag}
              id={c.id}
              key={c.id}
              continent={c.continent}
            />
          ))
        ) : (
          <Error text={'No countries found. Please try again'} />
        )}
      </div>

      <Pages
        amountPerPage={countriesPerPage}
        totalAmount={countries.length}
        pageNumber={pages}
      />
    </div>
  )
}
