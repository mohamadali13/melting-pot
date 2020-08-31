// import Axios from 'axios';
import store from '../store.js';
const localStore = require('store')

const NewsAPI = require('newsapi');
// const apiKey = '295bee57362b4034b8dd25c79e381c15';
// const apiKey = '1a1523a02e3d4a65a047b106d46acaaa';
// const apiKey = 'e0da45e697234dbf8e89825c62e5dfbb';
// const apiKey = '7e5b135cb7fd4c46847f0f6b3d6dc671';
const apiKey = '04cc2e205e294f27b2072a47d8ce57bd';
const newsapi = new NewsAPI(apiKey);

export default {
    getHot(callback) {
        const country = localStore.get('settings') ? localStore.get('settings').search.country : store.getState().settings.search.country
        newsapi.v2.topHeadlines({
            country,
            pageSize: 10
        })
        .then(
            (res) => {
                callback({
                    name: "Hot",
                    type: "horizontal",
                    articles: res.articles,
                    totalResults: res.totalResults
                })
            }
        ).catch(
            err => {
                // console.log(err)
                callback( {error: err} )
            }
        )
    },

    getLatest(callback) {
        newsapi.v2.everything({
            language: store.getState().settings.search.language,
            q: "*",
            sortBy: "publishedAt",
        })
        .then(
            (res) => {
                callback({
                    name: "Latest",
                    type: "grid",
                    articles: res.articles,
                    totalResults: res.totalResults
                })
            }
        ).catch(
            err => {
                // console.log(err)
                callback( {error: err} )
            }
        )
    },

    getSearchResults(callback, params) {
        newsapi.v2.everything({
            ...params
        })
        .then(
            (res) => {
                callback({
                    name: "Results",
                    type: "grid",
                    articles: res.articles,
                    totalResults: res.totalResults

                })
            }
        ).catch(
            err => {
                console.log(err)
                callback( {error: err} )
            }
        )
    },

    getSources(urlParams, callback) {
        newsapi.v2.sources({
            ...urlParams
        })
        .then( res => {
            callback({
                status: res.status,
                sources: res.sources
            })
        })
        .catch(
            err => {
                // console.log(err)
                callback( {error: err} )
            }
        )
    },

    getCategory(urlParams, callback) {
        let category = urlParams.component.toLowerCase();
        // console.log(urlParams)
        newsapi.v2.topHeadlines({
            pageSize: 20,
            country: urlParams.country,
            category,
            page: urlParams.page
        })
            .then(res => {
                callback({
                    name: category[0].toUpperCase() + category.slice(1),
                    type: "grid",
                    articles: res.articles,
                    totalResults: res.totalResults
                })
            })
            .catch(
                err => {
                    // console.log(err)
                    callback( {error: err} )
                }
            )
    }

}

// export default {
//     getHot(callback){
//         Axios.get(src + "top-headlines?country=" + store.getState().settings.search.country + "&pageSize=5")
//         .then(
//             (res) => {
//                 callback({
//                     name: "Hot",
//                     type: "horizontal",
//                     articles: res.data.articles,
//                     totalResults: res.data.totalResults
//                 })
//             }
//         ).catch(
//             err => callback({
//                 error: err
//             })
//         )
//     },
//     getLatest(callback){
//         Axios.get(src + "newsapi/latest?language=" + store.getState().settings.search.language)
//         .then(
//             (res) => {
//                 callback({
//                     name: "Latest",
//                     type: "grid",
//                     articles: res.data.articles,
//                     totalResults: res.data.totalResults
//                 })
//             }
//         ).catch(
//             err => callback({
//                 error: err
//             })
//         )
//     },
//     getSearchResults(callback, params){
//         Axios.get(src + "newsapi/everything", { params })
//         .then(
//             (res) => {
//                 callback({
//                     name: "Results",
//                     type: "grid",
//                     articles: res.data.articles,
//                     totalResults: res.data.totalResults

//                 })
//             }
//         ).catch(
//             err => callback({
//                 error: err
//             })
//         )
//     },
//     updateUserData(callback, params){
//         Axios.patch(src + 'api/users/1234', params)
//         .then(
//             (res) => {
//                 callback({
//                     newUserData: res.data.updatedUserData
//                 })
//             }
//         )
//         .catch(
//             err => callback({
//                 error: err
//             })
//         )
//     },
//     getCategory(urlParams, callback){
//         // console.log(urlParams);
//         let category = urlParams.component.toLowerCase();
//         Axios.get("http://localhost:5000/newsapi/top-headlines?&pageSize=20&country=de&category=" + category + "&page=" + urlParams.page)
//         .then(res => {
//                 callback({
//                     name: category[0].toUpperCase() + category.slice(1),
//                     type: "grid",
//                     articles: res.data.articles,
//                     totalResults: res.data.totalResults
//                 })
//         })
//         .catch(
//             err => callback({
//                 error: err
//             })
//         )
//     },
//     getSources(urlParams, callback){
//         Axios.get(src + "newsapi/source", urlParams)
//             .then( res => {
//                 callback({
//                     status: res.status,
//                     sources: res.data.sources
//                 })
//             })
//             .catch( err => callback({
//                 error: err
//             }))
//     }
// }