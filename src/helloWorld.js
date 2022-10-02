import React from 'react';
import axios from 'axios';

export default class helloWorld extends React.Component {
  state = {
    persons: []
  }

  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(response => {
        const persons = response.data;
        this.setState({ persons });
      })
  }

  render() {
    return (
      <ul>
        {
          this.state.persons
            .map(person =>
              <li key={person.id}>{person.username}</li>
            )
        }
      </ul>
    )
  }
}