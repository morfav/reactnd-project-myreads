import React, { Component } from 'react';

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
          <option value="none" disabled>Move to...</option>
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

export default BookshelfChanger;
