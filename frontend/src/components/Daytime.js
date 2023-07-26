import React, { useState } from "react";
import { NumberInput } from "@mantine/core";
import "./Daytime.css"
const times = [
	{ name: "0:00 AM", value: 0 },
	{ name: "1:00 AM", value: 1 },
	{ name: "2:00 AM", value: 2 },
	{ name: "3:00 AM", value: 3 },
	{ name: "4:00 AM", value: 4 },
	{ name: "5:00 AM", value: 5 },
	{ name: "6:00 AM", value: 6 },
	{ name: "7:00 AM", value: 7 },
	{ name: "8:00 AM", value: 8 },
	{ name: "9:00 AM", value: 9 },
	{ name: "10:00 AM", value: 10 },
	{ name: "11:00 AM", value: 11 },
	{ name: "12:00 PM", value: 12 },
	{ name: "13:00 PM", value: 13 },
	{ name: "14:00 PM", value: 14 },
	{ name: "15:00 PM", value: 15 },
	{ name: "16:00 PM", value: 16 },
	{ name: "17:00 PM", value: 17 },
	{ name: "18:00 PM", value: 18 },
	{ name: "19:00 PM", value: 19 },
	{ name: "20:00 PM", value: 20 },
	{ name: "21:00 PM", value: 21 },
	{ name: "22:00 PM", value: 22 },
	{ name: "23:00 PM", value: 23 },
];

const TimeDropdown = (props) => {
	const handleTimeChange = (event) => {
		props.setSelectedTime(event.target.value);
	};

	return (
		<select value={props.selectedTime} onChange={handleTimeChange} id="options">
			{times.map((e) => {
				return (
					<option key={e.value} value={e.value}>
						{e.name}
					</option>
				);
			})}
		</select>
	);
};

export default function App(props) {
	return (
		<>
			<div className="container">
				<h2>Select Time:</h2>
				<TimeDropdown
					selectedTime={props.selectedTime}
					setSelectedTime={props.setSelectedTime}
				/>
				<h2>Select Day:</h2>
				<NumberInput
					defaultValue={1}
					hideControls
					min={1}
					max={30}
					value={props.selectedDay}
					onChange={props.setSelectedDay}
				/>
				<h2>Select Month:</h2>
				<NumberInput
					defaultValue={1}
					hideControls
					min={1}
					max={12}
					value={props.selectedMonth}
					onChange={props.setSelectedMonth}
				/>
			</div>
			<div className="submit container">
				<button id="btns" onClick={props.handler}>
					Predict
				</button>
			</div>
		</>
	);
}
