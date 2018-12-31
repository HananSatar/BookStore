import React, { Component } from 'react'
// import React, { Component } from 'react';
// import './App.css'
import Register from '.component/register';
import ReactDOM from 'react-dom';

class App extends Component {
  state = {books:[]}

  componentDidMount() {
    fetch('/api/book')

      .then(res => res.json())
      .then(books => this.setState({ books }));
  }

  render() {
    return (
      <div className="App">
        <h1>Books</h1>
        {this.state.books.map(book =>
          <div key={book.id}></div>
        )}
      </div>
    );
  }
}
<Register/>
ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<App />, div);
// export default App;

