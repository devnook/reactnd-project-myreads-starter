import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookshelfPicker extends Component {
  render() {
    return (
      <div className="book-shelf-changer">
        <select
          defaultValue={this.props.shelf}
          onChange={(e) => {this.props.onChange(e.target.value)}}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

BookshelfPicker.propTypes = {
  shelf: PropTypes.string,
  onChange: PropTypes.func
};

export default BookshelfPicker
