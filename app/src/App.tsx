import RX = require('reactxp');
import AppView = require('./views/AppView');

class App extends RX.Component<RX.CommonProps, RX.Stateless> {
    render() {
        return (
            <AppView />
        );
    }
}

export = App;
