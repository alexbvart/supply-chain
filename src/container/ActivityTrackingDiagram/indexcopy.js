import React from 'react'
import {wrapper, table, top} from './styles.module.css'

const ActivityTrackingDiagram2 = () => {
  return (
		<div >
			<table className={table}>
				<colgroup span="4"></colgroup>
				<tr className={top}>
					<th>No.</th>
					<th>Activity</th>
					<th>
						<img src="../assets/images/triangle.png" alt="geometric shape" />
					</th>
					<th>
						<img src="../assets/images/circle.png" alt="geometric shape" />
					</th>
					<th>
						<img src="../assets/images/arrow.png" alt="geometric shape" />
					</th>
					<th>
						<img src="../assets/images/diamond.png" alt="geometric shape" />
					</th>
					<th>
						<img src="../assets/images/rectangle.png" alt="geometric shape" />
					</th>
				</tr>
				<tr>
					<td>1</td>
					<td>
						<input
							type="text"
							placeholder="Enter activity name"
							required
							maxLength="50"
							onBlur={(event) =>
								event.target.value !== '' ? replaceInput(event.target) : null
							}
						/>
					</td>
					<td>
						<input type="checkbox"></input>
					</td>
					<td>
						<input type="checkbox"></input>
					</td>
					<td>
						<input type="checkbox"></input>
					</td>
					<td>
						<input type="checkbox"></input>
					</td>
					<td>
						<input type="checkbox"></input>
					</td>
				</tr>
				<tr>
					<td>2</td>
					<td>
						<input
							type="text"
							placeholder="Enter activity name"
							required
							maxLength="50"
							onBlur={(event) =>
								event.target.value !== '' ? replaceInput(event.target) : null
							}
						/>
					</td>
					<td>
						<input type="checkbox"></input>
					</td>
					<td>
						<input type="checkbox"></input>
					</td>
					<td>
						<input type="checkbox"></input>
					</td>
					<td>
						<input type="checkbox"></input>
					</td>
					<td>
						<input type="checkbox"></input>
					</td>
				</tr>
				<tr>
					<td>3</td>
					<td>
						<input
							type="text"
							placeholder="Enter activity name"
							required
							maxLength="50"
							onBlur={(event) =>
								event.target.value !== '' ? replaceInput(event.target) : null
							}
						/>
					</td>
					<td>
						<input type="checkbox"></input>
					</td>
					<td>
						<input type="checkbox"></input>
					</td>
					<td>
						<input type="checkbox"></input>
					</td>
					<td>
						<input type="checkbox"></input>
					</td>
					<td>
						<input type="checkbox"></input>
					</td>
				</tr>
			</table>
		</div>
	);
};

export default ActivityTrackingDiagram2