import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Nav } from '../components'
import { HomePage, PokemonPage, SearchPage } from '../pages'

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Nav/>}>
        <Route index element={<HomePage/>} />
        <Route path='pokemon/:id' element={<PokemonPage/>} />
        <Route path='search' element={<SearchPage/>} />

        <Route path='*' element={<Navigate to='/' />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes