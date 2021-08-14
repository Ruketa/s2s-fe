import { Bar } from "react-chartjs-2"
import React from 'react';

interface IGraphProps {
  graphData: {
    labels: Array<Array<string>>,
    datasets: Array<{}>,
  }
}

class BarGraph extends React.Component<IGraphProps, {}>{

  render(){

    return (
      <div>
        <div>
          <Bar data={this.props.graphData} />
        </div>
      </div>
   );

  }
}

export default BarGraph