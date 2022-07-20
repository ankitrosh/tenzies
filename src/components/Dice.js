export default function Dice(props) {
	return(
			<div className = { props.isHeld ? "dice--held" : "dice" } onClick= {props.changeHeld}>
			<h2 className="dice--num" > {props.value} </h2>

			</div>
		)
}