import React, { Component } from 'react'

export default class NewsItems extends Component {

  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className='my-3'>
        <div className="card">
          <div>
          <span className=" position-absolute d-flex badge rounded-pill bg-danger" style={{right: 0}}>
              {source}
              <span className="visually-hidden">unread messages</span>
            </span> 
          </div>
          <img src={imageUrl} width='100%' height='auto' loading='lazy' className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {author != null ? author : 'Unknown'} on {new Date(date).toGMTString()}</small></p>
            <a target="_blank" rel="noreferrer" href={newsUrl} className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}
