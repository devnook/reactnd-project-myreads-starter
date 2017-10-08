import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book.js'

class BookShelf extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          {!this.props.books.length && (
            <p>No books on this bookshelf yet. <Link to="/search">Add books</Link></p>
          )}
          <ol className="books-grid">
            {this.props.books.map((book, i) => {
              return (
                <li key={i}>
                  <Book
                    book={book}
                    onMoveShelf={this.props.onMoveShelf}/>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    )
  }
}

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onMoveShelf: PropTypes.func.isRequired
};

export default BookShelf
