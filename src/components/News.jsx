import React, { Component } from 'react';
import NewsItems from './NewsItems';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';


export default class News extends Component {

    static defaultProps = {
        country: 'us',
        pageSize: 20,
        category: "business"
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    constructor(props) {
        super(props)
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }

        document.title = 'News App ' + this.capitalizeFirstLetter(this.props.category);
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        this.props.setProgress(30);
        let pasrseData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: pasrseData.articles,
            totalResults: pasrseData.totalResults
        });
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.updateNews();
    }

    fetchMoreData = async () => {
        this.setState({
            page: this.state.page + 1
        })

        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c3bfd6779ee040558d8979ae018ba646&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let pasrseData = await data.json();
        this.setState({
            articles: this.state.articles.concat(pasrseData.articles),
            totalResults: pasrseData.totalResults
        })

    };

    render() {
        return (
            <>
                <h2 className='mx-5 mt-5'>News App - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<h4>Loading...</h4>}
                >
                    <div className="container my-5">
                        <div className='row'>
                            {this.state.articles.map((element) => {
                                return <div className="col-md-3" >
                                    <NewsItems source={element.source.name} key={element.url} author={element.author} date={element.publishedAt} title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage ? element.urlToImage : 'data:image/jpeg;base64,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'} newsUrl={element.url} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>

        )
    }
}
