import { useParams } from "react-router-dom"
import movieApi from "../api/modules/movie.api"
import { useEffect } from "react"

const MovieDetail = () => {

  const { movieTitle } = useParams()
  useEffect(() => {
    const fetchMovieDetail = async () => {
      const movieDetail = await movieApi.getMovieByTitle({title: movieTitle})
      // console.log(movieDetail)
    }
    fetchMovieDetail()
  }, [movieTitle])

  return (
    <div>MovieDetail</div>
  )
}

export default MovieDetail