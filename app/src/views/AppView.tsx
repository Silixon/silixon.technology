import RX = require('reactxp');
import { VirtualListView, VirtualListViewItemInfo }
    from 'reactxp-virtuallistview';

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
    render() {
        return (
            <RX.View id='test' style={_topbarViewStyle.base}>
                <RX.View style={_topbarViewStyle.topBar} />
                <RX.Image style={_topbarViewStyle.logoImage} source='src/resources/logo.png' />
                <RX.View style={_topbarViewStyle.underLine} />
            </RX.View>
        );
    }
}

const _mainContentViewStyle = {
    base: RX.Styles.createViewStyle({
        flex: 1,
    }),
    background: RX.Styles.createViewStyle({
        flex:  1,
        alignSelf: 'stretch',
        backgroundColor: "#303030"
    })
}

const _itemHeight = 25;
const _itemTemplate = "item";

const menublockItems : MenuBlockItemInfo[] = [{
		key: "a",
		height: _itemHeight,
		text: "Business Intelligence",
		template: _itemTemplate, 
		content: "Intelligence",
},
{
		key: "b",
		height: _itemHeight,
		text: "Data Science / Machine Learning",
		template: _itemTemplate, 
		content: "",
},
{
		key: "c",
		height: _itemHeight,
		text: "IoT Deployment / Computerized Sensors",
		template: _itemTemplate, 
		content: "",
}
];

class MainContent extends RX.Component<RX.CommonProps, RX.Stateless> {
    render() {
        return (
            <RX.View style={_mainContentViewStyle.base}>
                <RX.View style={_mainContentViewStyle.background}>
                    <MenuBlock
						headerText="Let's do this"
						items={menublockItems}
					/>
                </RX.View>
            </RX.View>
        );
    }
}

interface MenuBlockItemInfo extends VirtualListViewItemInfo { 
	text: string;
	content: string;	
}

interface MenuBlockProps {
    headerText: string;
	items: MenuBlockItemInfo[];
}

const _menublockViewStyle = {
    layout :  RX.Styles.createViewStyle({
		margin: 120
    }),
    base: RX.Styles.createViewStyle({
		flex: 1,
    })
}

const _menublockTextStyle = {
    base: RX.Styles.createTextStyle({
        fontFamily: "Hack",
        color: "#FFD29D",
        fontSize: 20
    })
}

const _arrowViewStyle = RX.Styles.createViewStyle({
	height:16,
	maxWidth: 12,
	marginTop: 3,
	marginRight: 8,
	flex: 1
})

class MenuBlock extends RX.Component<MenuBlockProps, RX.Stateless> {
	private _animation: RX.Types.Animated.CompositeAnimation;
	private _animationStyle: RX.Types.AnimatedViewStyleRuleSet;
	private _rotateValue: RX.Animated.Value;
    private _active = false;

    constructor(props: MenuBlockProps) {
        super(props);
		this._rotateValue = new RX.Animated.Value(0);
		this._animationStyle = RX.Styles.createAnimatedViewStyle({
			transform: [
				{
					rotateX: this._rotateValue
				}
			]
		})
		this._animation = this._makeAnimation()
	}

    private _makeAnimation() {
        return RX.Animated.timing(
			this._rotateValue,
			{
                toValue: this._active ? 0 : 90 ,
				duration: 250,
				easing: RX.Animated.Easing.InOut()
			}
		)

    }

	private _onPressItem(e: RX.Types.SyntheticEvent, key: string) {
		e.stopPropagation();
		this._animation = this._makeAnimation()
		this._animation.start();
        this._active = !this._active;
	}

	private _renderItem = (item: MenuBlockItemInfo, hasFocus?: boolean) => {
		const viewStyle = RX.Styles.createViewStyle({
			height: item.height
		});
        console.log(this);

		return (
			<RX.Button style={[_menublockViewStyle.base, _menublockTextStyle.base]} onPress={ (e) => {this._onPressItem(e, item.key)}}>
				<RX.View style={{flexDirection: "row", flex: 1}}>
					<RX.Animated.Image style={[_arrowViewStyle,
						this._animationStyle]} source="src/resources/droparrow.png" />
					<RX.Text style={{flex: 1}}>{item.text}</RX.Text>
				</RX.View>
			</RX.Button>
		);
	}

    render() {
		console.log(this.props);
        return (
            <RX.View style={[_menublockViewStyle.layout, _menublockViewStyle.base,
				_menublockTextStyle.base]}>
                <RX.Text style={{paddingBottom:20}}>{this.props.headerText}</RX.Text>
				<VirtualListView
					itemList={this.props.items}
					renderItem={this._renderItem}
					animateChanges={ true }
			        skipRenderIfItemUnchanged={ false }
				/>
            </RX.View>
        );
    }
}

export = AppView;
