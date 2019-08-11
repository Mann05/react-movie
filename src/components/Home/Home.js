import React ,{Component} from 'react';
import './Home.css';
// components import
import HeroImage from '../elements/HeroImage/HeroImage';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import SearchBar from '../elements/SearchBar/SearchBar';
import MovieThumb from '../elements/MovieThumb/MovieThumb';
import LoadMoreBtn from '../elements/LoadMoreBtn/LoadMoreBtn';
import Spinner from '../elements/Spinner/Spinner';
import axios from 'axios'
// import config file
import {API_URL,API_KEY,IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE}  from '../../config';
class Home extends Component{
    state={
        movies:[],
        heroImage:null,
        loading:false,
        currentPage:0,
        totalPage:0,
        searchTerm:''
    }
    componentDidMount(){
        this.setState({
            loading:true
        });
        const endPoint = `${API_URL}trending/all/day?api_key=${API_KEY}&Lanuage=en-us&page=1`;
        this.fetchItem(endPoint);
    }
    searchTerm = (searchTerm)=>{
        let endPoint='';
        this.setState({
            movies:[],
            loading:true,
            searchTerm
        });
        if(searchTerm === ''){
            endPoint=`${API_URL}trending/all/day?api_key=${API_KEY}&Lanuage=en-us&page=1`;
        }else{
            endPoint = `${API_URL}search/movie?api_key=${API_KEY}&Lanuage=en-us&query=${this.state.searchTerm}`;
        }
        this.fetchItem(endPoint);
    }
    loadMoreItems = ()=>{
        let endPoint = '';
        this.setState({loading:true});

        if(this.state.searchTerm === ''){
            endPoint = `${API_URL}trending/all/day?api_key=${API_KEY}&Lanuage=en-us&page=${this.state.currentPage + 1}`;
        }else{
            endPoint = `${API_URL}search/movie?api_key=${API_KEY}&Lanuage=en-us&query=${this.state.searchTerm}&page=${this.state.currentPage + 1}`;
        }
        this.fetchItem(endPoint);
    }
    fetchItem=(endPoint)=>{
        axios(endPoint)
        .then(result=>{
            this.setState({
                movies:[...this.state.movies,...result.data.results],
                heroImage: this.state.heroImage || result.data.results[0],
                loading :false,
                currentPage : result.data.page,
                totalPage : result.data.total_pages
            })
        })
        .catch()
    }

    render(){
        return (
            <div className="emdb-wrapper">
                {this.state.heroImage ?
                <div>
                <HeroImage 
                image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}/${this.state.heroImage.backdrop_path}`}
                title={this.state.heroImage.original_title}
                text={this.state.heroImage.overview}
                />
                <SearchBar callback={this.searchTerm}/>
                </div>
                : null }
                <div className="rmdb-home-grid">
                <FourColGrid header={this.state.searchTerm?'Search Items' : 'Trending Movies'}
                loading={this.state.loading}
                >
                    {this.state.movies.map((element,i)=>{
                        return <MovieThumb key={i} clickable={true} 
                        image={element.poster_path?`${IMAGE_BASE_URL}${POSTER_SIZE}/${element.poster_path}`:'./images/no_image.jpg' }
                        movieId={element.id}
                        movieName={element.original_title }
                        />
                    })}
                    </FourColGrid>
                    {this.state.loading ? <Spinner/>:null}
                    {(this.state.currentPage <= this.state.totalPage && !this.state.loading) ?
                    <LoadMoreBtn text="Load More" onClick={this.loadMoreItems} /> : null}
                </div>
            </div>
        )
    }
}
export default Home;