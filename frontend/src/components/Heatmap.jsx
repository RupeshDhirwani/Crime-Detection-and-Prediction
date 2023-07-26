import React from "react";
import "./Daytime.css";
import { MapContainer, Marker, Polygon, Popup, TileLayer } from "react-leaflet";

const coordinates = [
	//Start with left top corner and go clockwise
	//Odd Values are x and Even are y
	{
		Name: "District 1",
		coordinates: [
			[39.79159, -105.062692],
			[39.788942, -104.9854],
			[39.757915, -105.006569],
			[39.726495, -104.987369],
			[39.72556, -105.052052],
		],
	},
	{
		Name: "District 2",
		coordinates: [
			[39.788942, -104.9854],
			[39.788564, -104.904661],
			[39.726117, -104.876599],
			[39.727253, -104.953892],
		],
	},
	{
		Name: "District 3",
		coordinates: [
			[39.72556, -105.013276],
			[39.726117, -104.876599],
			[39.624946, -104.88103],
			[39.661479, -105.007108],
		],
	},
	{
		Name: "District 4",
		coordinates: [
			[39.72556, -105.052052],
			[39.72556, -105.013276],
			[39.661479, -105.007108],
			[39.612811, -105.070077],
		],
	},
	{
		Name: "District 5",
		coordinates: [
			[39.788564, -104.904661],
			[39.798777, -104.79143],
			[39.842261, -104.79143],
			[39.843395, -104.762384],
			[39.82298, -104.761399],
			[39.798777, -104.762384],
			[39.798777, -104.735307],
			[39.771538, -104.734814],
			[39.726117, -104.876599],
		],
	},
	{
		Name: "District 6",
		coordinates: [
			[39.757915, -105.006569],
			[39.788942, -104.9854],
			[39.727253, -104.953892],
			[39.726495, -104.987369],
		],
	},
	{
		Name: "District 7",
		coordinates: [
			[39.912911, -104.731614],
			[39.913477, -104.602137],
			[39.823925, -104.610506],
			[39.798777, -104.762384],
			[39.843395, -104.762384],
		],
	},
];

const center = [39.759, -104.92]; // Denver's latitude and longitude
const zoom = 11; // Zoom level

const labels = ["Normal", "Very Low", "High", "Low", "Very High"];

const colors = ["#D6EAF8", "#1D8348", "#F1948A", "#76D7C4", "#CB4335"];
const fillOptions = [
	{ color: colors[0], fillOpacity: 0.7 }, //Normal
	{ color: colors[1], fillColor: "#006400", fillOpacity: 0.7 }, //Very Low
	{ color: colors[2], fillColor: "rgba(255, 0, 0, 0.7)" }, //High
	{ color: colors[3], fillOpacity: 0.7 }, //Low
	{ color: colors[4], fillColor: "#8B0000", fillOpacity: 0.7 }, //Very High
];

export default function Heatmap({ res }) {
	return (
		<MapContainer
			center={center}
			zoom={zoom}
			scrollWheelZoom={false}
			style={{ height: 800, width: "73vw" }}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{/* District 1 */}
			<Polygon
				pathOptions={fillOptions[res[0]]}
				positions={coordinates[0].coordinates}
			/>
			{/* District 2 */}
			<Polygon
				pathOptions={fillOptions[res[1]]}
				positions={coordinates[1].coordinates}
			/>
			{/* District 3 */}
			<Polygon
				pathOptions={fillOptions[res[2]]}
				positions={coordinates[2].coordinates}
			/>
			{/* District 4 */}
			<Polygon
				pathOptions={fillOptions[res[3]]}
				positions={coordinates[3].coordinates}
			/>
			{/* District 5 */}
			<Polygon
				pathOptions={fillOptions[res[4]]}
				positions={coordinates[4].coordinates}
			/>
			{/* District 6 */}
			<Polygon
				pathOptions={fillOptions[res[5]]}
				positions={coordinates[5].coordinates}
			/>
			{/* District 7 */}
			<Polygon
				pathOptions={fillOptions[res[6]]}
				positions={coordinates[6].coordinates}
			/>
		</MapContainer>
	);
}
