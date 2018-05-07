import React, { Component } from 'react';

import {
  Link
} from 'react-router-dom'

import ContentExtraInfo from './contentExtraInfo.js';
import ShareButton from './ShareButton.js';
import TipButtons from './TipButtons.js';
import ReportButton from './ReportButton.js';

import ArtifactIcon from './ArtifactIcon.js';
import PublisherIcon from './PublisherIcon.js';

class ContentInfo extends Component {
	constructor(props){
		super(props);

		this.state = {

		}

		this.stateDidUpdate = this.stateDidUpdate.bind(this);

		let _this = this;

		this.unsubscribe = this.props.store.subscribe(() => {
			_this.stateDidUpdate();
		});
	}
	componentDidMount(){
		this.stateDidUpdate();
	}
	stateDidUpdate(){
		let newState = this.props.store.getState();

		let currentArtifact = newState.CurrentArtifact;

		if (currentArtifact && this.state !== currentArtifact){
			this.setState(currentArtifact);
		}
	}
	componentWillUnmount(){
		this.unsubscribe();
	}
	render() {

    let publisher, pubName, title, icon, paid;

    if (this.state.artifact) {
      publisher = this.state.artifact.getMainAddress();
  		pubName = this.state.artifact.getPublisherName();
  		title = this.state.artifact.getTitle();
  		paid = this.state.artifact ? this.state.artifact.isPaid() : false;
    }

		return (
			<div>
				<div className="row">
					<div className="col-10">
						<h3 style={{paddingLeft: "20px", wordWrap: "break-word"}}>{this.state.isFetching ? "" : <ArtifactIcon artifact={this.state.artifact} />}{this.state.isFetching ? "loading..." : title}</h3>
					</div>
					<div className="col-2">
						<div style={{float: "right", marginTop: "2px"}}>
							{/* 0.9 Feature */}
							{/*
							<button className="btn btn-outline-secondary">{this.state.views} Views</button>
							*/}
						</div>
					</div>
				</div>
				<div className="media">
					<Link to={"/pub/" + publisher}>
						{this.state.isFetching ? "" : <PublisherIcon id={publisher} Core={this.props.Core} style={{width: "50px", height: "50px"}} className="d-flex" /> }
					</Link>
					<div className="media-body">
						<h5 className="mt-0" style={{paddingTop: "13px", marginLeft: "10px"}}>{this.state.isFetching ? "loading..." : <Link to={"/pub/" + publisher} style={{color: "#000"}}>{pubName}</Link>}
							{/* 0.9 Feature */}
							{/*
							<div className="btn-group">
								<button className="btn btn-sm btn-outline-warning" style={{marginLeft: "10px"}}><span className="icon-pin icon"></span>Follow</button>
								<button className="btn btn-sm btn-outline-secondary" disabled>10 Followers</button>
							</div>
							*/}
							<div style={{float: "right"}}>
								<ShareButton />
								<TipButtons artifact={this.state.artifact} Core={this.props.Core} store={this.props.store} piwik={this.props.piwik} NotificationSystem={this.props.NotificationSystem} />
								<ReportButton />
							</div>
						</h5>
					</div>
				</div>
				<ContentExtraInfo Core={this.props.Core} store={this.props.store} piwik={this.props.piwik} NotificationSystem={this.props.NotificationSystem} />
			</div>
		);
	}
}

export default ContentInfo;
