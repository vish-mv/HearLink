
import React from 'react';
import { Typography, AppBar } from '@material-ui/core';

import Videoplayer from './components/Videoplayer';
import Notifications from './components/Notifiactions';
import Options from './components/Options';

const App = () => {
    return (
        <div>
            <AppBar position="static" color="inherit">
                <Typography variant="h2" align="center">Hear Link</Typography>
            </AppBar>
            <Videoplayer />
            <Options>
                <Notifications /> {/* Use Notifications component */}
            </Options>
        </div>
    );
}

export default App;
