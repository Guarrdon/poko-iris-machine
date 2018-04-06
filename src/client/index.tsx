import * as React from 'react';
import * as ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';


import NewGameOptionsView from './components/newGameOptions';

//// Needed for onTouchTap
//// http://stackoverflow.com/a/34015469/988941
//injectTapEventPlugin();


const theme = createMuiTheme();

const App = () => (
    <MuiThemeProvider theme={theme}>
        <div>
            <NewGameOptionsView defaultPlayers={3} defaultRounds={12} />
        </div>
    </MuiThemeProvider>
);

ReactDOM.render(
    <App />,
    document.getElementById('main')
);