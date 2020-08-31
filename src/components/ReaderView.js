import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ReactLoading from 'react-loading';
import store from '../store';
import findTopics from "../utils/lda"
import ReaderViewContent from './ReaderViewContent.js';
// const localStorage = require('store');
const localStorage = window.localStorage;

class ReaderView extends Component {

  render() {
    localStorage.setItem('settings', JSON.stringify(store.getState().settings))
    const { contentLoading, current_article } = store.getState().news;
    const paragraphs = current_article.paragraphs || []
    const rawParagraphs = current_article.rawParagraphs || []
    document.title = current_article.title

    return (
      <div id='reader-view'>
        <img
          id='reader-view_image'
          src={current_article.urlToImage ? current_article.urlToImage : require('../doc/placeholder.jpg')}
          alt={current_article.description}
        />
        {
          contentLoading ?
          <div id='reader-view_loading'>
            <ReactLoading
              className='loading-view_spinner'
              width={'2.5em'}
              height={'2.5em'}
              type={"spokes"}
              color={"gray"}
              />
          </div>
          :
          <ReaderViewContent
            article={current_article}
            paragraphs={paragraphs}
            rawParagraphs={rawParagraphs}
          />
        }
      </div>

    );
  }
}

export default withRouter(ReaderView);