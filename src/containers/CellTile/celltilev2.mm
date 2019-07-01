const {cell} = this.state;
    const listHeight = 600;
    let cellTilesData = this.getCellTileDatas();
    const element = cellTilesData.length > 0
    ? (
        <AutoSizer>
            {() => (
              <Listw
                className="List"
                height={listHeight}
                itemCount={cellTilesData.length}
                itemSize={50}
                width={300}
              >
                {this.Row}
              </Listw>
            )}
          </AutoSizer>
      )
    : null

    ReactDOM.render(element, document.getElementById('basic-canvas-section'));