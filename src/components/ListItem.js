import React, { Component } from 'react';
import { 
	Text, 
	TouchableWithoutFeedback, 
	View,
	NativeModules,
	LayoutAnimation
} from 'react-native';
import { CardSection } from './common';
import { connect } from 'react-redux';
import * as actions from '../actions';

NativeModules.UIManager.setLayoutAnimationEnabledExperimental
    && NativeModules.UIManager.setLayoutAnimationEnabledExperimental(true)

class ListItem extends Component {

	componentWillUpdate(){
		LayoutAnimation.spring();
	}

	renderDescription() {
		if(this.props.expanded) {
			return (
				<CardSection>
					<Text>{this.props.library.description}</Text>
				</CardSection>
			);
		}
	}

	render() {
		return (
			<TouchableWithoutFeedback
				onPress={() => this.props.selectLibrary(this.props.library.id)}
			>
				<View>
					<CardSection>
						<Text style={styles.titleStyle}>{this.props.library.title}</Text>
					</CardSection>
					{this.renderDescription()}
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = {
	titleStyle: {
		fontSize: 18,
		paddingLeft: 15
	}
}

const mapStateToProps = (state, ownProps) => {
	const expanded = state.selectedLibraryId === ownProps.library.id;

	return { expanded: expanded };
}

export default connect(mapStateToProps, actions)(ListItem);