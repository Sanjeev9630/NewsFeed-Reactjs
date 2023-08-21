import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps = {
    pageSize: 8,
    country: 'in',
    category: 'general',
  }
  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
  }

  capitalizeFirstletter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    console.log('Hello Constructor from News Component');
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
    document.title = `${this.capitalizeFirstletter(this.props.category)} - NewsFeed`;
  }

  // Refactoring NewsMonkey app by using single function (But its not working)

  //   async updateNews(){
  //     const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=dbe57b028aeb41e285a226a94865f7a7&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  //     this.setState({ loading: true });
  //     let data = await fetch(url);
  //     let parsedData = await data.json()
  //     this.setState({
  //         articles: parsedData.articles,
  //         totalResults: parsedData.totalResults,
  //         loading: false
  //     })
  // }

  async componentDidMount() {
    console.log('cdn');
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b7c36ddea5d749e4ad403969dbd40e5e&pagesize=${this.props.pageSize}`
    this.setState({ loading: true })
    let data = await fetch(url);
    let parseData = await data.json()
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false
    })

    // this.updateNews();
  }

  handlePrevClick = async () => {
    console.log('Previous');
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b7c36ddea5d749e4ad403969dbd40e5e&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`
    this.setState({ loading: true })
    let data = await fetch(url);
    let parseData = await data.json()
    console.log(parseData);
    this.setState({
      page: this.state.page - 1,
      articles: parseData.articles,
      loading: false
    })

    // this.setState({ page: this.state.page - 1 });
    // this.updateNews();
  }

  handleNextClick = async () => {
    console.log('Next');
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b7c36ddea5d749e4ad403969dbd40e5e&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`
      this.setState({ loading: true })
      let data = await fetch(url);
      let parseData = await data.json()
      this.setState({
        page: this.state.page + 1,
        articles: parseData.articles,
        loading: false
      })
    }

    // this.setState({ page: this.state.page + 1 });
    // this.updateNews();
  }

  render() {
    return (
      <div className='container my-3'>
        <h1 className="text-center" style={{ margin: "35px 0px" }}>NewsFeed-Top {this.capitalizeFirstletter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} />
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News





// Adding infinite scroll , Adding a top loading bar , Hiding Api key by adding Custom Environment Variables (.env file) 