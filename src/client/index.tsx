import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/styles';


import NewGameOptionsView from './components/newGameOptions';

//// Needed for onTouchTap
//// http://stackoverflow.com/a/34015469/988941
//injectTapEventPlugin();


const theme = {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
};

const App = () => (
    <div>
        <ThemeProvider theme={theme}>
            <NewGameOptionsView defaultPlayers={3} defaultRounds={12} />
        </ThemeProvider>
    </div>
);

ReactDOM.render(
    <App />,
    document.getElementById('main')
);