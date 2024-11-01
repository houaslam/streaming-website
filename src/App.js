import { useEffect, useState} from 'react';
import './App.css'
import SearchIcon from './search.svg'
import MovieCard from './movieCard';


const API_URL = 'http://www.omdbapi.com/?apikey=c392d7cc'


function App(){
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');

    const searchMovies = async (title) =>{
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json()
        setMovies(data.Search)
    }
    useEffect(()=>{
        searchMovies()
    }, [])
    return (
        <div className='app'>
            <h1>Tvino</h1>

            <div className='search'>
                <input 
                    placeholder='search for movie'
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)} 
                />

                <img 
                    src={SearchIcon}
                    alt='search'
                    onClick={()=>searchMovies(search)}
                />

            </div>
            {
                movies.length > 0 ? (
                    <div className='container'>
                        {
                        movies.map((movie) => (
                            <MovieCard movie={movie}/>
                        ))
                        }
                    </div>
                ) : (
                    <div className='empty'>
                        <h2>No movies found</h2>
                    </div>
                )
            }
            
        </div>
    )
}

export default App
