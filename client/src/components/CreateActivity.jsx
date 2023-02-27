import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { getAllCountries, createActivity } from '../actions'
import styles from './CreateActivity.module.css'

export default function CreateActivity() {
  const dispatch = useDispatch()
  const history = useHistory()
  const countries = useSelector((state) => state.allCountries)

  const [details, setDetails] = useState({
    name: '',
    difficulty: '',
    duration: '',
    season: '',
    countries: [],
  })

  useEffect(() => {
    dispatch(getAllCountries())
  }, [dispatch])

  function handleChange(e) {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    })
  }

  function handleSelect(e) {
    setDetails({
      ...details,
      countries: [...details.countries, e.target.value],
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(createActivity(details))
    setDetails({
      name: '',
      difficulty: '',
      duration: '',
      season: '',
      countries: [],
    })
    history.push('./countries')
    alert('Activity created!')
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1 className={styles.title}>Add Touristic Activity</h1>

          <div className={styles.formSection}>
          <label htmlFor='name'>Name:</label>
            <select
              className={styles.input}
              id='name'
              name='name'
              onChange={(e) => handleChange(e)}
            >
              <option value=''>Activity...</option>
              <option value='Skiing'>Skiing</option>
              <option value='Cycling'>Cycling</option>
              <option value='Surfing'>Surfing</option>
              <option value='Running'>Running</option>
              <option value='Hiking'>Hiking</option>
              <option value='Climbing'>Climbing</option>
            </select>
          </div>

          {/* <div className={styles.formSection}>
            <label htmlFor='name'>Name:</label>
            <input
              type='text'
              id='name'
              name='name'
              className={styles.input}
              onChange={(e) => handleChange(e)}
              required
            />
          </div> */}

          <div className={styles.formSection}>
            <label className={styles.label} htmlFor='duration'>
              Duration:
            </label>
            <select
              id='duration'
              name='duration'
              className={styles.input}
              onChange={(e) => handleChange(e)} 
            >
              <option value=''>Duration...</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
              <option value={11}>11</option>
              <option value={12}>12</option>
              <option value={13}>13</option>
              <option value={14}>14</option>
              <option value={15}>15</option>
              <option value={16}>16</option>
              <option value={17}>17</option>
              <option value={18}>18</option>
              <option value={19}>19</option>
              <option value={20}>20</option>
              <option value={21}>21</option>
              <option value={22}>22</option>
              <option value={23}>23</option>
              <option value={24}>24</option>
            </select>
          </div>

          <div className={styles.formSection}>
            <label className={styles.label} htmlFor='difficulty'>
              Difficulty:
            </label>
            <select
              id='difficulty'
              name='difficulty'
              className={styles.input}
              onChange={(e) => handleChange(e)}
            >
              <option value=''>Difficulty...</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </div>

          <div className={styles.formSection}>
            <label className={styles.label} htmlFor='season'>
              Season:
            </label>
            <select
              className={styles.input}
              id='season'
              name='season'
              onChange={(e) => handleChange(e)}
            >
              <option value=''>Season...</option>
              <option value='Summer'>Summer</option>
              <option value='Fall'>Fall</option>
              <option value='Winter'>Winter</option>
              <option value='Spring'>Spring</option>
            </select>
          </div>

          <div className={styles.formSection}>
            <label className={styles.label} htmlFor='season'>
              Country:
            </label>
            <select
              className={styles.input}
              name='countries'
              onChange={(e) => handleSelect(e)}
              required
            >
              <option value=''>Countries...</option>
              {countries.map((c) => (
                <option value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <ul>
            <li>{details.countries.map((c) => `${c} | `)}</li>
          </ul>

          <Link to='/countries'>
            <button className={styles.btnBack}>Go back</button>
          </Link>
          <button className={styles.btn} type='submit'>
            Add Activity
          </button>
        </form>
      </div>
    </div>
  )
}
