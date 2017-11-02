import React, { Component } from 'react';

import ContentContainer from './contentContainer.js'
import ContentInfo from './contentInfo.js'
import IssoCommentBox from './isso/IssoCommentBox.js'
import IssoComments from './isso/IssoComments.js'
import ContentCard from './contentCard.js'

import ArtifactManager from '../modules/ArtifactManager.js';
//import PlaylistManager from '../modules/PlaylistManager.js';

import {
  selectCurrentArtifact
} from '../actions'

class ContentPage extends Component {
	constructor(props){
		super(props);

		this.state = {
			isFetching: false,
			isInvalidated: false,
			error: false,
			artifact: {}
		}

		this.stateDidUpdate = this.stateDidUpdate.bind(this);

		let _this = this;

		this.unsubscribe = this.props.store.subscribe(() => {
			_this.stateDidUpdate();
		});

		this.setArtifact = this.setArtifact.bind(this);
	}
	componentWillReceiveProps(nextProps){
		if (nextProps.match.params.id !== this.props.match.params.id){
			this.setArtifact(nextProps);
		}
	}
	componentDidMount(){
		this.setArtifact(this.props);
	}
	stateDidUpdate(){
		let newState = this.props.store.getState();

		let myNewState = newState.CurrentArtifact;

		if (myNewState && this.state !== myNewState){
			this.setState(myNewState);
		}
	}
	componentWillUnmount(){
		this.unsubscribe;
	}
	setArtifact(props){
		props.store.dispatch(selectCurrentArtifact(props.Core, props.match.params.id));
	}
	render() {
		let _this = this;

		return (
			<div>
				<ContentContainer Core={this.props.Core} store={this.props.store} />
				<div className="container">
					<div className="row">
						<div id="media-info" className="col-12 col-md-9" style={{marginTop: "30px"}}>
							<ContentInfo Core={this.props.Core} store={this.props.store} />
							<br />
							{this.props.DisplayedArtifact ? 
								<div>
									<IssoCommentBox Core={this.props.Core} url={this.props.DisplayedArtifact.txid} />
									<IssoComments Core={this.props.Core} url={this.props.DisplayedArtifact.txid} />
								</div>
								: ""}
						</div>
						<div id='suggested' className="col-12 col-md-3" style={{marginTop: "30px"}}>
							{[].map(function(content, i){
								return <ContentCard 
									key={i}
									artifact={content}
									Core={_this.props.Core}
								/>
							})}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ContentPage;