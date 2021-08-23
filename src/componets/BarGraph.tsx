import { Bar } from "react-chartjs-2";
import React from "react";

interface IGraphProps {
  graphData: {
    labels: Array<Array<string>>;
    datasets: Array<{}>;
  };
}

const BarGraph = (props: IGraphProps) => {
  return (
    <>
      <div>
        <Bar data={props.graphData} />
      </div>
    </>
  );
};

export default BarGraph;
