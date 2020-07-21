import React, { Component } from 'react'
import {
  Chart,
  Interval,
  Tooltip,
  Axis,
  Coordinate
} from 'bizcharts';

export default class index extends Component {
  render() {
    const data = [
      { year: '2001', population: 41.8 },
      { year: '2002', population: 38 },
      { year: '2003', population: 33.7 },
      { year: '2004', population: 30.7 },
      { year: '2005', population: 25.8 },
    ]
    return (
      <div>
        <Chart height={400} data={data} autoFit>
          <Coordinate type="polar" />
          <Axis visible={false} />
          <Tooltip showTitle={false} />
          <Interval
            position="year*population"
            adjust="stack"
            element-highlight
            color="year"
            style={{
              lineWidth: 1,
              stroke: '#fff',
            }}
            label={['year', {
              offset: -15,
            }]}
          />
        </Chart>
      </div>
    );
  }
}
