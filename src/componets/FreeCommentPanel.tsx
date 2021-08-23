import React from 'react';

import { Controller } from '../data/Controller';

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import Paper from '@material-ui/core/Paper'


interface IFreeCommentPanelState{
  freeComments : {[key:string]: Array<string>},
}

class FreeCommentPanel extends React.Component<{}, IFreeCommentPanelState> {

  private controller_ !: Controller;

  /**
   * コンストラクタ
   * 
   * @param props プロパティ
   */
  constructor(props: IFreeCommentPanelState) {
    super(props);

    this.controller_ = new Controller();

    this.state = {
      freeComments: {},
    };
  }

  /**
   * マウント完了後のコールバック
   */
  componentDidMount() {

    this.controller_.fetchFreeCommentInfo()
      .then((topics: {[key: string]: Array<string>}) => {
        this.setState({ freeComments : topics });
      });

  }

  render() {
    return (
      <>
        <TableContainer component={Paper}>
          <Table area-label="free comment table">
            <TableHead>
              <TableRow>
                <TableCell>開催回</TableCell>
                <TableCell>自由回答コメント</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                Object.keys(this.state.freeComments).map((key: string) => {
                  let row_num = 0
                  return this.state.freeComments[key].map((topic: string) => {
                    return (
                      <TableRow key={row_num++}>
                        <TableCell>{key}</TableCell>
                        <TableCell>{topic}</TableCell>
                      </TableRow>
                    );
                  });
                })
              }
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
}

export default FreeCommentPanel;