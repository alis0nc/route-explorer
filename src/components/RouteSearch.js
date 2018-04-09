import React, { Component } from 'react';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';

import RouteInput from './RouteInput';
import RoutesList from './RoutesList';
import Schedules from '../data/schedules';

import Helpers from '../helpers.js';

class RouteSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allLines: (Object.values(Schedules)),
      filteredLines: (Object.values(Schedules)),
      realTime: '',
      input: ''
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentDidMount() {
    fetch(`${Helpers.endpoint}/routes-for-agency/DDOT.json?key=BETA`)
      .then(response => response.json())
      .then(d => {
        let sorted = d.data.list.sort((a,b) => {
          return parseInt(a.id, 10) > parseInt(b.id, 10);
        })
        this.setState({
          realTime: sorted
        })
      })
  }

  handleSearchChange(event) {
    const val = event.target.value
    const matched = []

    this.state.allLines.forEach(ln => {
      if ((ln.id.indexOf(val) > -1) || (ln.rt_name.toUpperCase().indexOf(val.toUpperCase()) > -1)) {
        matched.push(ln);
      }
    })

    this.setState({ 
      input: event.target.value, 
      filteredLines: matched 
    });
  }

  render() {
    return (
      <Card>
        <CardHeader title="Choose your bus" subheader="DDOT operates 43 fixed bus routes" />
        <CardContent>
          <RouteInput input={this.state.input} onSearchChange={this.handleSearchChange} />
          { this.state.filteredLines.length > 0 ? <RoutesList lines={this.state.filteredLines} /> : '' }
          <Divider style={{ marginTop: '1em' }} />
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '.5em' }}>
            <Chip style={{ margin: 6, backgroundColor: 'rgb(68, 170, 66)', color: '#fff' }} labelStyle={{ fontSize: '.8em' }} label="Downtown" />
            <Chip style={{ margin: 6, backgroundColor: 'rgb(155, 91, 165)', color: '#fff' }} labelStyle={{ fontSize: '.8em' }} label="NB/SB" />
            <Chip style={{ margin: 6, backgroundColor: 'rgb(0, 121, 194)', color: '#fff' }} labelStyle={{ fontSize: '.8em' }} label="EB/WB" />
            <Chip style={{ margin: 6, backgroundColor: 'rgb(208, 124, 50)', color: '#fff' }} labelStyle={{ fontSize: '.8em' }} label="Special" />
          </div>
        </CardContent>
      </Card>
    )
  }
}

export default RouteSearch;
