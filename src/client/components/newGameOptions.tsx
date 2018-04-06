import * as React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { Theme, withStyles, WithStyles } from "material-ui/styles";

interface INewGameOptionProps {
  defaultPlayers: number;
  defaultRounds: number;
}

interface INewGameOptionState {
  selectedPlayers: number;
  totalRounds: number;
};

const style = {
  margin: '20px',
  backgroundColor: 'DarkGreen'
};

//export default class NewGameOptions extends React.Component<WithStyles<'root'>> {
export default class NewGameOptions extends React.Component<INewGameOptionProps, INewGameOptionState> {

  constructor(props: INewGameOptionProps) {
    super(props)
    // initial state
    this.state = {
      selectedPlayers: props.defaultPlayers,
      totalRounds: props.defaultRounds
    }
  }


  
  public render() {
    return (
      <div>
        <Button size="large" variant="raised" color="primary" style={style}>
            3
        </Button>
        <Button size="large" variant="raised" color="primary" style={style}>
            4
        </Button>
        <Button size="large" variant="raised" color="primary" style={style}>
            5
        </Button>
          <Button size="large" variant="raised" color="primary" style={style}>
            6
        </Button>

      </div>
    );
  }
}


