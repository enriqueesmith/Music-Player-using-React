import React from "react";

//create your first component
export class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			songs: [],
			fx: []
		};
	}

	componentDidMount = () => {
		fetch("http://assets.breatheco.de/apis/sound/data/songs.json")
			.then(res => res.json())
			.then(yoyo => this.setState({ songs: yoyo }));
		fetch("http://assets.breatheco.de/apis/sound/data/fx.json")
			.then(res => res.json())
			.then(yaya => {
				let y = this.state.songs;
				y.concat(yaya);
				this.setState({ songs: y });
			});
	};

	playSong = url => {
		this.url.src =
			"http://assets.breatheco.de/apis/sound/" +
			url.replace("data", "files");
		this.url.play();
	};

	pauseSong = () => {
		this.url.pause();
	};
	/*
	
	playNextSong =()=>
	
	
	playPreviousSong =()=>
	*/

	render() {
		return (
			<div className="container text-center">
				{this.state.songs.map((elem, index) => {
					return (
						<div
							className="MusicList"
							key={index}
							onClick={e => this.playSong(elem.url)}>
							<div className="tracksToPlay">
								<span className="trackNumber">{index + 1}</span>
								<span className="title">{elem.name} </span>
							</div>
							<hr />
						</div>
					);
				})}
				<audio ref={t => (this.url = t)} />
				<div className="MusicPlayerControls">
					<span className="controlIcons">
						<i className="fas fa-caret-square-left" />
					</span>
					<span className="controlIcons">
						<i
							className="playIcon fas fa-play"
							onClick={() => this.playSong()}
						/>
					</span>
					<span className="controlIcons">
						<i
							className="pauseIcon fas fa-pause circle"
							onClick={() => this.pauseSong()}
						/>
					</span>
					<span className="controlIcons">
						<i className="fas fa-caret-square-right" />
					</span>
				</div>
			</div>
		);
	}
}
