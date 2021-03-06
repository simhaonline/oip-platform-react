import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Spinner from 'react-spinkit';

import FileViewer from './FileViewer.js';

import Paywall from './Paywall.js';

class ContentContainer extends Component {
	render() {
		let loading = false, haveLoadedState = false;

		if (this.props.activeFile) {
            if (this.props.activeFile.info){
                haveLoadedState = true;
            }
		}


		if (this.props.artifact && this.props.artifactState.isFetching) {
            loading = true;
		}

		return (
			<div className="content-container">
				<div id='content' ref={content => this.content = content}
					className={ (this.props.activeFile && this.props.activeFile.isPaid && !this.props.activeFile.hasPaid && !this.props.activeFile.owned) ? "content blur" : "content"}
					style=	  { (this.props.activeFile && this.props.activeFile.isPaid && !this.props.activeFile.hasPaid && !this.props.activeFile.owned) ? {overflow: "scroll"} : {}}
				>
					{ (!haveLoadedState || loading) ? <div style={{height: "100%", width: "100vw", maxWidth: "100vw"}} className="spinner-container"><Spinner name="wave" color="aqua" /></div> : ''}
					<FileViewer
						artifact={this.props.artifact}
						activeFile={this.props.activeFile}
						// For AudioContainer
                        volumeControls={this.props.volumeControls}
                        filePlaylist={this.props.filePlaylist}
                        active={this.props.active}
						// Dispatch function for AudioContainer
                        updateFileCurrentTime={this.props.updateFileCurrentTime}
                        isPlayableFile={this.props.isPlayableFile}
                        isSeekableFile={this.props.isSeekableFile}
                        updateFileDuration={this.props.updateFileDuration}
                        setVolume={this.props.setVolume}
                        setMute={this.props.setMute}
                        playlistNext={this.props.playlistNext}
						isPlayingFile={this.props.isPlayingFile}
                        setCurrentFile={this.props.setCurrentFile}
						// For Payment Buttons
                        buyInProgress={this.props.buyInProgress}
                        buyError={this.props.buyError}
                        paymentError={this.props.paymentError}
                        paymentInProgress={this.props.paymentInProgress}
                        payForFile={this.props.payForFile}
                        buyFile={this.props.buyFile}
					/>
				</div>

                {/*Paywall is causing react-warning-key error*/}
				<Paywall
                    activeFile={this.props.activeFile}
                    artifact={this.props.artifact}
                    artifactState={this.props.artifactState}
                    setCurrentFile={this.props.setCurrentFile}
                    isPlayingFile={this.props.isPlayingFile}
                    buyInProgress={this.props.buyInProgress}
                    buyError={this.props.buyError}
                    paymentError={this.props.paymentError}
                    paymentInProgress={this.props.paymentInProgress}
                    payForFile={this.props.payForFile}
                    buyFile={this.props.buyFile}
				/>
			</div>
		);
	}
}

ContentContainer.propTypes = {
    artifact: PropTypes.object,
    artifactState: PropTypes.object,
    activeFile: PropTypes.object,
    volumeControls: PropTypes.object,
    filePlaylist: PropTypes.object,
    active: PropTypes.string,
    updateFileCurrentTime: PropTypes.func,
    isPlayableFile: PropTypes.func,
    isSeekableFile: PropTypes.func,
    updateFileDuration: PropTypes.func,
    setVolume: PropTypes.func,
    setMute: PropTypes.func,
    playlistNext: PropTypes.func,
    isPlayingFile: PropTypes.func,
    setCurrentFile: PropTypes.func,
    buyInProgress: PropTypes.func,
    buyError: PropTypes.func,
    paymentError: PropTypes.func,
    paymentInProgress: PropTypes.func,
    payForFile: PropTypes.func,
    buyFile: PropTypes.func
}

export default ContentContainer;