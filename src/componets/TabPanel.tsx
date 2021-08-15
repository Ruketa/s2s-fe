import React from 'react';
import Box from '@material-ui/core/Box'

interface ITabPanelProps {
  children: any;
  value: number;
  index: number;
}

class TabPanel extends React.Component<ITabPanelProps, []> {

  render() {
    return (
      <div 
        role="tabpanel"
        hidden = {this.props.value !== this.props.index}
      >
        {this.props.value === this.props.index &&(
          <Box p={3}>
            {this.props.children}
          </Box>
        )}
      </div>
    );
  }
}

export default TabPanel;