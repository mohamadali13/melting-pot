import React, { Component } from 'react';
import store from '../store.js';
import { setSections, setLoadingState, setContentComponent, setPagingData } from '../actions/newsActions';
import api from '../utils/API';

class Pagination extends Component {
    state = {
        totalResults: store.getState().news.pagingData.totalResults,
        currentPage: store.getState().news.pagingData.currentPage,
        currentResults: store.getState().news.pagingData.currentResults,
        country: store.getState().settings.search.country
    }

    componentDidMount(){
        this.setState({
            totalResults: this.props.totalResults,
            currentResults: this.props.currentResults
        })
    }

    handleClick(event) {
        let current = this.state.currentPage;
        current = (event.target.className === "pagination_next") ? current + 1 : current - 1;

        store.dispatch(setPagingData({
            currentPage: current,
            totalResults: this.state.totalResults,
            currentResults: this.state.currentResults
        }));

        this.changePage({component: this.props.sectionName, page: current, country:this.state.country});
    }

    changePage(urlParams) {
        let componentName = urlParams.component;
        store.dispatch(setSections([]));
        store.dispatch(setLoadingState(true));
        switch(this.props.sectionName){
            case "Results":
                componentName = "SEARCH_" + componentName.toUpperCase();
                api.getSearchResults((res) => {
                        store.dispatch(setLoadingState(false));
                        store.dispatch(setSections([res]))
                    },
                    {
                        ...store.getState().news.searchParams,
                        page: urlParams.page
                    }
                )
                break;

            // Category
            default:
                api.getCategory(urlParams, (res) => {
                    store.dispatch(setLoadingState(false));
                    store.dispatch(setSections([res]));
                })
                break;
        }

        store.dispatch( setContentComponent(componentName.toUpperCase()) );
    }

    isDisabled(type) {
        if(type === "Next") {
            // if current results smaller than set in search bar
            return (this.state.currentResults < store.getState().news.searchParams.pageSize || this.state.currentResults * this.state.currentPage === 100 ) ? true : false;
        }
        else {
            return (this.state.currentPage === 1) ? true : false;
        }
    }

    render() {
        return (this.props.sectionName !== "Hot" && this.props.sectionName !== "Latest") ?
            <div className='pagination'>
                <button
                  className='pagination_previous'
                  type="button"
                  onClick={(event) => this.handleClick(event)} disabled={this.isDisabled("Prev")}
                >{'< Previos Page'}</button>
                <button
                  className='pagination_next'
                  type="button"
                  onClick={(event) => this.handleClick(event)} disabled={this.isDisabled("Next")}
                >{'Next Page >'}</button>
            </div>
            : null
    }
}

export default Pagination;