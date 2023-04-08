import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API;
  pageSize = 20;

  state = {
    progress:0
  }

  setProgress = (progress) => {
    this.setState({progress: progress})
  }

  render() {
    return (
      <>
        <BrowserRouter>
          <Navbar />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
            height={3}
          />
          <Routes>
            <Route path='/' element={<News  setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country='in' key='general' category='general' />} />
            <Route path='/business' element={<News  setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country='in' category='business' key='business' />} />
            <Route path='/entertainment' element={<News  setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country='in' category='entertainment' key='entertainment' />} />
            <Route path='/science' element={<News  setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country='in' category='science' key='science' />} />
            <Route path='/health' element={<News  setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country='in' category='health' key='health' />} />
            <Route path='/sports' element={<News  setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country='in' category='sports' key='sports' />} />
            <Route path='/technology' element={<News  setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country='in' category='technology' key='technology' />} />
            <Route path='/general' element={<News  setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country='in' category='general' key='general' />} />

          </Routes>
        </BrowserRouter>
      </>
    )
  }
}

