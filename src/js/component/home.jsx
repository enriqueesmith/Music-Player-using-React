import React from "react";

//create your first component
export class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			songs: [
				{
					title: "Mario Castle",
					id: "mario",
					author: "Bowser",
					url:
						"https://assets.breatheco.de/apis/sound/files/mario/songs/castle.mp3"
				},
				{
					title: "Zelda",
					id: "zelda",
					author: "Ganondorf",
					url:
						"https://assets.breatheco.de/apis/sound/files/videogame/fx_zelda_recorder.wav"
				},
				{
					title: "X-Men",
					id: "x-men",
					author: "Magneto",
					url:
						"https://assets.breatheco.de/apis/sound/files/cartoons/songs/x-men.mp3"
				}
			]
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
		this.playBtn.style.display = "none";
		this.pauseBtn.style.display = "inline-block";
	};

	pauseSong = () => {
		this.url.pause();
		this.playBtn.style.display = "inline-block";
		this.pauseBtn.style.display = "none";
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
							onClick={() => this.playSong(elem.url)}>
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
							ref={t => (this.playBtn = t)}
							onClick={() => this.playSong()}
						/>
					</span>
					<span className="controlIcons">
						<i
							className="pauseIcon fas fa-pause circle"
							ref={t => (this.pauseBtn = t)}
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
