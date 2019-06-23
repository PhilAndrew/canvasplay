import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as MyTypes from "MyTypes";
import { actionTypes } from "../../actions";

import LojbanSentence from "../../components/LojbanSentence/LojbanSentence";

import './Lojban.css';

interface LojbanState {
  lojbanDatas: any[];
  demoChangeList: string;
}

interface LojbanProps {
  lojbanDatas: any[];
  setLojbanDatas: (lobjanDatas: any) => object;
}

class Lojban extends React.Component<LojbanProps> {
  constructor(props: LojbanProps) {
    super(props);
    this.state = {
      lojbanDatas: "",
      demoChangeList: "laldo nanmu poi pu dunda ci"
    };
  }

  drawLobjan = () => {
    let lojbanDatas = [
      "mi ze'a stali ba zu le nu co'a di'i cliva",
      "mi pritu lo dasni be lo mapku",
      "le sonci cu rorci da le ralju",
      "lo prenu poi na'o dunda gi'e laldo",
      "ko'a du lo laldo nanmu poi pu dunda ci ko'e lo ze vi bajra",
      "la pat. melbi",
      "mi tavla do"
    ];

    this.props.setLojbanDatas(lojbanDatas);
  }

  render() {
    const {lojbanDatas} = this.props;
    const {demoChangeList} = this.state;

    return (
      <div className="page-body">
        <h4 className="page-title">
          Lojban Characters
        </h4>
        <div className="action-section">
          <button className="draw-lobjan-characters" onClick={this.drawLobjan}>
            Draw Lobjan Characters
          </button>
        </div>
        <div className="change-list-preview">
          <h4>Change List</h4>
          {demoChangeList}
        </div>
        <div>
          {
            lojbanDatas.map((rowDatas, rowIdx) => {
              return (
                <div key={'row' + rowIdx} >
                  <div className="lojban-row">
                    <div style={{marginBottom: '5px'}}>
                      <span key={'wordspan' + rowIdx} className="word-span">{rowDatas}</span>
                    </div>
                    <LojbanSentence
                      key={'lojbansentenc' + rowIdx}
                      sentence={rowDatas}
                      borderLength={30}
                      changeList={demoChangeList}
                      sentenceIndex={rowIdx}
                    />
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    );
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
)(Lojban);
