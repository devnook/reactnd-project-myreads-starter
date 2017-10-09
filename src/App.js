import React from 'react'
import { Link, Route } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './Bookshelf.js'
import * as BooksAPI from './BooksAPI.js'


class BooksApp extends React.Component {
  state = {
    books: {},
    searchResults: [],
    query: ''
  }

  componentDidMount() {
    BooksAPI.getAll().then((bookList) => {
      const books = bookList.reduce((result, book) => {
        result[book.id] = book;
        return result;
      }, {})
      this.setState({books})
    });
  }

  moveShelf(book, shelf) {
    BooksAPI.update(book, shelf);
    const books = this.state.books;
    if (!books[book.id]) {
      books[book.id] = book;
    }
    books[book.id].shelf = shelf;
    this.setState({books});
  }

  search(value) {
    const books = this.state.books;
    let searchResults = [];
    this.setState({
      query: value
    });
    if (value) {
      BooksAPI.search(value).then((results) => {
        if (!results.error) {
          searchResults = results.map((book) => {
            if (books[book.id]) {
              book.shelf = books[book.id].shelf;
            }
            return book;
          });
        }
        this.setState({searchResults});
      });
    } else {
      this.setState({searchResults});
    }
  }

  render() {
    const moveShelf = this.moveShelf.bind(this);
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input
                  type="text"
                  placeholder="Search by title or author"
                  value={this.state.query}
                  onChange={(e) => {
                    this.search(e.target.value);
                  }}/>
              </div>
            </div>
            <div className="search-books-results">
              <BookShelf
                title=""
                books={this.state.searchResults}
                onMoveShelf={moveShelf}
              />
            </div>
          </div>
        )}/>
        <Route exact path="/" render={()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf
                  title="Currently reading"
                  books={Object.values(this.state.books).filter((book) => (
                    book.shelf === 'currentlyReading'
                  ))}
                  onMoveShelf={moveShelf}
                />
                <BookShelf
                  title="Want to Read"
                  books={Object.values(this.state.books).filter((book) => (
                    book.shelf === 'wantToRead'
                  ))}
                  onMoveShelf={moveShelf}
                />
                <BookShelf
                  title="Read"
                  books={Object.values(this.state.books).filter((book) => (
                    book.shelf === 'read'
                  ))}
                  onMoveShelf={moveShelf}
                />
              </div>
            </div>
            <div className="open-search">
              <Link to="search">Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
