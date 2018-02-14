import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import TopNav from './TopNav';
import RouteSearch from './RouteSearch';
import StopSearch from './StopSearch';
import Legend from './Legend';

class Homepage extends Component {
  render() {
    return (
      <div>
        <TopNav />
        <div className="ma2" style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            <h1>Detroit Department of Transportation</h1>
            <p>This app helps transit riders find bus schedules and real-time arrival information for DDOT routes and bus stops.</p>
            <p>Find your route or stop, or see which buses are running near your current location.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
            <div className="w-50 mr3" style={{ border: '.25em solid #eee' }}>
              <RouteSearch />
              <Legend />
            </div>
            <div className="w-30 mr3" style={{ border: '.25em solid #eee' }}>
              <StopSearch />
            </div>
            <div className="w-10 pa2" style={{ border: '.25em solid #eee' }}>
              <Link to="/nearby" className="link dim black fw8 f3">Search Nearby</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Homepage;
