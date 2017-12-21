import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookshelfChanger extends Component {
  constructor(props) {
    super(props);

    this.changeShelf = this.changeShelf.bind(this);
  }

  changeShelf(section) {
    this.props.changeShelf(section);
  }

  render() {
    return (
      <div className="book-shelf-changer">
        <select
          defaultValue={this.props.shelf}
          onChange={event => this.changeShelf(event.target.value)}
        >
          <option value="moveTo" disabled>Move to...</option>
          {this.props.sections.map(section => (
            <option key={section} value={section}>
              {this.props.sectionNames[section]}
            </option>
          ))}
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

BookshelfChanger.propTypes = {
  changeShelf: PropTypes.func.isRequired,
  sections: PropTypes.arrayOf(String).isRequired,
  sectionNames: PropTypes.instanceOf(Object).isRequired,
  shelf: PropTypes.string.isRequired,
};

export default BookshelfChanger;
