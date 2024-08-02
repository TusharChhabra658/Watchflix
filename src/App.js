import React from 'react';
import { useEffect,useState } from 'react';
import './App.css';
import searchIcon from './search.svg';
import MovieCard from "./MovieCard";

const API_URL="https://www.omdbapi.com?apikey=ccfbfdce"
const App = () =>{
    const [movies,setMovies]=useState([]);
    const [searchTerm,setSearchTerm]=useState('');

    const searchMovies=async(title)=>{
        const response=await fetch(`${API_URL}&s=${title}`);
        const data= await response.json();
        setMovies(data.Search);
    }

    useEffect(()=>{
        searchMovies('spider man');
        document.title="WatchFlix";
    },[])

    return(
        <>
        <div className='app'>
            <h1>WatchFlix</h1>
            <div className='search'>
                <input
                placeholder='Search for movies'
                value={searchTerm}
                onChange={(e)=>setSearchTerm(e.target.value)}
                />
                <img 
                src={searchIcon}
                alt="mysvg" 
                onClick={()=>searchMovies(searchTerm)}
                />
            </div>
            {
                movies.length>0
                ?(
                    <div className='container'>
                    { movies.map((movie)=>(
                        <MovieCard movie={movie}/>
                    ))}
                    </div>
                )
                :(
                    <div className='empty'>
                        <h2>No Movies Found</h2>
                    </div>
                )
            }
        </div>        
        </>
    );
}

export default App;