
import "./dashboard.css";
import "./materialize.css";

function Dashboard() {
	return(
	
<div class="container">
	<div class="row dash">
		
		<div id="leftColumn" class="col s4">
			<h5>KENT STATE PARKING</h5>
			<h6>Spaces Available</h6>
			
			<p id="count">335</p>
		
			<p id="lotName">Lot: MSB (R-1)</p>
		
		</div>
	
		<div class="col s8 rightColumn">
			
			<p id="lotMenu">MSB</p>
			<p id="spacesAvailable">SPACES AVAILABLE</p>
			<div class="analytics">
				<p id="time">12:00pm</p>	
				<p>The lot is typically busy at this time.</p>	
			</div>
		</div>
		
	</div>
	<div class="row adminControls">
		<div class="col s12 admin">
			<p>Put admin controls here</p>
		</div>
	</div>
</div>
	
	);
		
  };

export default Dashboard;