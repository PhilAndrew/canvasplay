import React from 'react';

import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as MyTypes from "MyTypes";
import { actionTypes } from "../../actions";

import './LojbanSentence.css';

import LojbanCharacter from "../LojbanCharacter/LojbanCharacter";

import { List, AutoSizer, CellMeasurer, CellMeasurerCache, Table, Column, Grid } from "react-virtualized";

interface LojbanSentenceProps {
  sentence: any;
  borderLength: number;
  changeList: any;
  sentenceIndex: any;

  lojbanDatas: any[];
  setLojbanDatas: (lobjanDatas: any) => object;
}

class LojbanSentence extends React.Component<LojbanSentenceProps> {

  private cache: CellMeasurerCache;

    constructor(props: LojbanSentenceProps) {
        super(props);
        this.state = {
            showChangeList: -1
        }

        this.cache = new CellMeasurerCache({
          fixedWidth: true,
          defaultWidth: 40
        })
    }

    selectCharacter = (wordIndex, from) => {
      const {showChangeList} = this.state;
      const {sentence, changeList, sentenceIndex, lojbanDatas} = this.props;
      
      const sentenceArray = sentence.split(' ');
      const demoChangeListArray = changeList.split(' ');

      if (showChangeList !== -1 && from === 'list') {
        let updatedSentenceArray = JSON.parse(JSON.stringify(sentenceArray));
        updatedSentenceArray[showChangeList] = demoChangeListArray[wordIndex];

        let updatedSentence = updatedSentenceArray.join(' ');

        let updatedLojbanData = JSON.parse(JSON.stringify(lojbanDatas));
        updatedLojbanData[sentenceIndex] = updatedSentence;

        this.props.setLojbanDatas(updatedLojbanData);
      }

      this.setState({ showChangeList: showChangeList === -1 ? wordIndex : -1 });
    }

    render = () => {
        const {sentence, borderLength, changeList} = this.props;
        const {showChangeList} = this.state;

        const sentenceArray = sentence.split(' ');
        const demoChangeListArray = changeList.split(' ');

        return (
            <div style={{height: (showChangeList !== -1 ? (demoChangeListArray.length + 1) * (borderLength + 9) + 3 * (demoChangeListArray.length + 1) : 80)}}>
              {
                sentenceArray.length > 0
                ? (<AutoSizer>
                    {
                      () => {
                      return ( <Grid
                                  width={500}
                                  height={(showChangeList !== -1 ? (demoChangeListArray.length + 1) * (borderLength + 9) + 3 * (demoChangeListArray.length + 1) : 80)}
                                  rowHeight={(showChangeList !== -1 ? (demoChangeListArray.length + 1) * (borderLength + 9) + 3 * (demoChangeListArray.length + 1) : 80)}
                                  rowCount={1}
                                  columnCount={sentenceArray.length}
                                  columnWidth={this.cache.defaultWidth}
                                  className="lojban-grid"
                                  cellRenderer={({key, parent, columnIndex, style}) => {
                                    return (
                                      <div
                                        key={'lojban-c-' + columnIndex}
                                        className="lojban-character"
                                        style={{'height': (showChangeList === columnIndex ? (demoChangeListArray.length + 1) * (borderLength + 9) + 3 * (demoChangeListArray.length + 1) : 30) + 'px'}}
                                      >
                                        <div onClick={() => this.selectCharacter(columnIndex, 'self')}>
                                          <LojbanCharacter
                                              key={'col' + columnIndex}
                                              word={sentenceArray[columnIndex]}
                                              borderLength={borderLength}
                                              borderColor={showChangeList === columnIndex ? 'red' : '#2EE59D'}
                                          />
                                        </div>
                                        {
                                            showChangeList === columnIndex
                                            ? demoChangeListArray.map((citem, cIdx) => {
                                                  return (
                                                      <div className="lojban-character-container" key={'changelist' + cIdx} onClick={() => this.selectCharacter(cIdx, 'list')}>
                                                          <LojbanCharacter
                                                              key={'change-col' + cIdx}
                                                              word={citem}
                                                              borderLength={borderLength}
                                                              borderColor={'#2EE59D'}
                                                          />
                                                      </div>
                                                  )
                                            })
                                            : null
                                        }
                                      </div>
                                    );
                                  }}
                                >
                                </Grid>
                      )}
                    }
                  </AutoSizer>)
                : null
              }
            </div>
        )
    }
}

const MapStateToProps = (store: MyTypes.ReducerState) => {
    return {
      lojbanDatas: store.canvasRs.lojbanDatas
    };
  };
  
const MapDispatchToProps = (dispatch: Dispatch<MyTypes.RootAction>) => ({
  setLojbanDatas: (lojbanDatas: any) => dispatch({ type: actionTypes.SET_LOJBAN_DATAS, payload: lojbanDatas })
});

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(LojbanSentence);
