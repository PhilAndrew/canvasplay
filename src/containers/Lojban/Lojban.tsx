import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as MyTypes from "MyTypes";
import { actionTypes } from "../../actions";
import Canvas from 'react-canvas-wrapper';

import LojbanCharacter from "../../components/LojbanCharacter/LojbanCharacter";

import './Lojban.css';

interface LojbanState {
  lojbanDatas: any[];
}

interface LojbanProps {
  lojbanDatas: any[];
  setLojbanDatas: (lobjanDatas: any) => object;
}

class Lojban extends React.Component<LojbanProps> {
  constructor(props: LojbanProps) {
    super(props);
    this.state = {
      lojbanDatas: ""
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

    let lojbanDataArray = lojbanDatas.map(o => {
      return o.split(' ');
    })
    this.props.setLojbanDatas(lojbanDataArray);
  }

  render() {
    const {lojbanDatas} = this.props;

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
        <div>
          {
            lojbanDatas.map((rowDatas, rowIdx) => {
              return (
                <div key={'row' + rowIdx} >
                  <div className="lojban-row">
                    {
                      rowDatas.map((word, colIdx) => {
                        return (
                          <span key={'wordspan' + colIdx} className="word-span">{word}</span>
                        )
                      })
                    }
                  </div>
                  <div className="lojban-row">
                    {
                      rowDatas.map((word, colIdx) => {
                        return (
                          <LojbanCharacter
                            key={'col' + colIdx}
                            word={word}
                            borderLength={30}
                          />
                        )
                      })
                    }
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
