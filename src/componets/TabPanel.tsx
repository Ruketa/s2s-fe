import React from "react";
import Box from "@material-ui/core/Box";

interface ITabPanelProps {
  children: any;
  value: number;
  index: number;
}

const TabPanel = (props: ITabPanelProps) => {
  return (
    <div role="tabpanel" hidden={props.value !== props.index}>
      {props.value === props.index && <Box p={3}>{props.children}</Box>}
    </div>
  );
};

export default TabPanel;
