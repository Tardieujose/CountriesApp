import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAllCountries } from '../actions'
import styles from './Navbar.module.css'
import Searchbar from './Searchbar'

export default function Navbar({ sort, contFilter, actFilter, actNameFilter }) {
  const dispatch = useDispatch()

  function handleClick(e) {
    e.preventDefault()
    dispatch(getAllCountries())
  }

  useEffect(() => {
    dispatch(getAllCountries())
  }, [dispatch])

  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <h1 className={styles.earth} onClick={(e) => handleClick(e)}>
          Countries | <span className={styles.byjj}>PI</span>
        </h1>

        <Searchbar />
        <div className={styles.filterContainer}>
          {/* filtro por continente */}
          <select className={styles.filter} onChange={(e) => contFilter(e)}>
            <option value='All'>Filter by region...</option>
            <option value='Africa'>Africa</option>
            <option value='North America'>North America</option>
            <option value='South America'>South America</option>
            <option value='Asia'>Asia</option>
            <option value='Europe'>Europe</option>
            <option value='Oceania'>Oceania</option>
          </select>

          {/* filtro por estacion */}
          <select className={styles.filter} onChange={(e) => actFilter(e)}>
            <option value='All'>Filter activities by season...</option>
            <option value='Summer'>Summer</option>
            <option value='Fall'>Fall</option>
            <option value='Winter'>Winter</option>
            <option value='Spring'>Spring</option>
          </select>

          {/* filtro por actividad */}
          <select className={styles.filter} onChange={(e) => actNameFilter(e)}>
            <option value='All'>Filter by activity...</option>
            <option value='Skiing'>Skiing</option>
            <option value='Cycling'>Cycling</option>
            <option value='Surfing'>Surfing</option>
            <option value='Running'>Running</option>
            <option value='Hiking'>Hiking</option>
            <option value='Climbing'>Climbing</option>
          </select>

          {/* orden por nombre o poblacion */}
          <select className={styles.filter} onChange={(e) => sort(e)}>
            <option value='AZ'>Sort by...</option>
            <option value='AZ'>Name (A-Z)</option>
            <option value='ZA'>Name (Z-A)</option>
            <option value='populationAsc'>Population (asc)</option>
            <option value='populationDesc'>Population (desc)</option>
          </select>
        </div>
      </div>
    </div>
  )
}
