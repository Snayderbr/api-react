import { useState } from 'react'
import Generos from './pages/Generos'
import Directores from './pages/Directores'
import Productoras from './pages/Productoras'
import Tipos from './pages/Tipos'
import Media from './pages/Media'

const pages = [
  ['media', 'Películas y Series'],
  ['generos', 'Géneros'],
  ['directores', 'Directores'],
  ['productoras', 'Productoras'],
  ['tipos', 'Tipos'],
]

export default function App() {
  const [page, setPage] = useState('media')

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon"><img width="40" height="40" src="https://img.icons8.com/cotton/64/cinema-.png" alt="cinema-"/></div>
          
          <div><strong>I.S Movies and shows</strong><span>IUDigital</span></div>
        </div>
        <nav>
          {pages.map(([id, label]) => (
            <button key={id} 
              className={page === id ? 'nav-item active' : 'nav-item'} 
              onClick={() => setPage(id)}
            >
              {label}
            </button>
          ))}
        </nav>
        <div className="api-status"><span></span>Conectado</div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <a href="http://localhost:3000/" target="_blank" rel="noreferrer">Ver API ↗</a>
        </header>

        {page === 'media' && <Media />}
        {page === 'generos' && <Generos />}
        {page === 'directores' && <Directores />}
        {page === 'productoras' && <Productoras />}
        {page === 'tipos' && <Tipos />}
      </main>
    </div>
  )
}
