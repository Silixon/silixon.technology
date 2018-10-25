import RX = require('reactxp');

const _appviewViewStyle = {
    base: RX.Styles.createViewStyle({
        flex: 1,
        alignSelf: 'stretch'
    })
}

class AppView extends RX.Component<RX.CommonProps, RX.Stateless> {
    render() { 
        return (
            <RX.View style={_appviewViewStyle.base}>
                <TopBar />
                <MainContent />
            </RX.View>
        );
    }
}

const _topbarViewStyle = {
    base: RX.Styles.createViewStyle({
        flexGrow: 0,
    }),
    topBar: RX.Styles.createViewStyle({
        height: 40,
        backgroundColor: "#04042A"
    }),
    underLine: RX.Styles.createViewStyle({
        height: 2,
        backgroundColor: "#FF00FF" 
    }),
    logoImage: RX.Styles.createViewStyle({
        position: 'absolute',
        height: 40,
        width: 160 
    })
};

class TopBar extends RX.Component<RX.CommonProps, RX.Stateless> {
            //<RX.View id='test' style={{ flexGrow: 0}}>
    render() {
        return (
            <RX.View id='test' style={_topbarViewStyle.base}>
                <RX.View style={_topbarViewStyle.topBar} />
                <RX.Image style={_topbarViewStyle.logoImage} source='http://172.27.0.2:8080/src/resources/logo.png' />
                <RX.View style={_topbarViewStyle.underLine} />
            </RX.View>
        );
    }
}

const _mainContentViewStyle = {
    base: RX.Styles.createViewStyle({
        flex: 1,
        flexGrow: 0,
    }),
    background: RX.Styles.createViewStyle({
        flex:  1,
        alignSelf: 'stretch',
        backgroundColor: "#303030"
    })
}

class MainContent extends RX.Component<RX.CommonProps, RX.Stateless> {
    render() {
        return (
            <RX.View style={_mainContentViewStyle.base} >
                <RX.View style={_mainContentViewStyle.background} />
            </RX.View>
        );
    }
}

export = AppView;
