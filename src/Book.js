import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ShelfPicker from './ShelfPicker.js'

class Book extends Component {
  render() {
    const book = {
      title: this.props.book.title,
      authors: this.props.book.authors,
      shelf: this.props.book.shelf,
      coverURL: (this.props.book.imageLinks &&
        this.props.book.imageLinks.thumbnail)
    };
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${book.coverURL})`
          }}></div>
          <ShelfPicker
            shelf={book.shelf}
            onChange={(shelf) => {
              this.props.onMoveShelf(this.props.book, shelf);
            }}
          />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors.join(', ') || 'Author unknown'}</div>
      </div>
    )
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onMoveShelf: PropTypes.func.isRequired
};

export default Book
