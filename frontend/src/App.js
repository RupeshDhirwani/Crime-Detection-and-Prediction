import React, { useEffect, useState } from "react";
// import React, { useState } from 'react';
import "./components/dropdowns.css";
import "./components/Daytime.css";
import Navbar from "./components/Navbar";
import Dropdowns from "./components/Dropdowns";
import Daytime from "./components/Daytime";

import axios from "axios";
import Heatmap from "./components/Heatmap";

const axiosReqHandler = (year, month, day, hour, setRes) => {
	axios
		.get(
			`http://127.0.0.1:5000/date/${year.toString().padStart(2, "0")}-${month
				.toString()
				.padStart(2, "0")}-${day.toString().padStart(2, "0")} ${hour
				.toString()
				.padStart(2, "0")}:00:00`
		)
		.then(function (response) {
			console.log(response.data);
			setRes(response.data);
		})
		.catch(function (error) {
			console.error(error);
			alert(error);
		});
};

function Result(props) {
	return (
		<div>
			<h2>{`Predicted Crime Rate is : ${props.result}`}</h2>
		</div>
	);
}

function App() {
	const [selectedDay, setSelectedDay] = useState(0);
	const [selectedMonth, setSelectedMonth] = useState(0);
	const [selectedTime, setSelectedTime] = useState(0);
	const [selectedYear, setSelectedYear] = useState("2023");
	const [res, setRes] = useState(undefined);

	useEffect(() => {
		console.log({ selectedDay, selectedTime });
	}, [selectedDay, selectedTime]);

	useEffect(() => {}, [res]);
	return (
		<>
			<Navbar />
			<div style={{ display: "flex", width: "100%", flexDirection: "row" }}>
				<div style={{paddingLeft: 20}}>
					<Dropdowns
						selectedOption={selectedYear}
						setSelectedOption={setSelectedYear}
					/>{" "}
					{/*District Dropdowns*/}
					<Daytime
						selectedTime={selectedTime}
						setSelectedTime={setSelectedTime}
						selectedDay={selectedDay}
						setSelectedDay={setSelectedDay}
						selectedMonth={selectedMonth}
						setSelectedMonth={setSelectedMonth}
						handler={() =>
							axiosReqHandler(
								selectedYear,
								selectedMonth,
								selectedDay,
								selectedTime,
								setRes
							)
						}
					/>
				</div>
				{/* <Result result={res} /> */}
				<div style={{paddingLeft: 40}}>
					{res ? <Heatmap res={res} /> : null}
				</div>
			</div>
		</>
	);
}

export default App;
