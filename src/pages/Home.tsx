import React from 'react';

import TabPanel from '../componets/TabPanel'
import GradeEvalGraphPanel from '../componets/GradeEvalGraphPanel';
import TopicsPanel from '../componets/TopicsPanel';
import FreeCommentPanel from '../componets/FreeCommentPanel';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

interface IState {
  tabs: {value: number}
}

class Home extends React.Component<{}, IState> {

  /**
   * コンストラクタ
   * 
   * @param props
   */
  constructor(props: any) {
    super(props);

    this.state = {
      tabs: {value: 0}
    };

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event: any, newValue: number) {
    this.setState({ tabs: {value: newValue} })
  }

  render() {
    return (
      <div>
        <div>
          <h1>S2Sアンケート集計結果</h1>
        </div>
        <div>
          <Paper>
            <Tabs
              value={this.state.tabs.value}
              indicatorColor="primary"
              textColor="primary"
              centered
              onChange={this.handleChange}
            >
              <Tab label="5段階評価" value={0} />
              <Tab label="取り上げてほしいトピック" value={1} />
              <Tab label="自由回答コメント" value={2} />
            </Tabs>
            <TabPanel value={this.state.tabs.value} index={0} >
              <GradeEvalGraphPanel />
            </TabPanel>
            <TabPanel value={this.state.tabs.value} index={1} >
              <TopicsPanel /> 
            </TabPanel>
            <TabPanel value={this.state.tabs.value} index={2} >
              <FreeCommentPanel />
            </TabPanel>
          </Paper>
        </div>
      </div>
    );
 }
}

export default Home;