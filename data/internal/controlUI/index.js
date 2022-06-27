"use strict";
/* eslint-disable default-case */
/* eslint-disable no-undef */
document.addEventListener("DOMContentLoaded", () => {
	//-----------------------
	// IMPORTS
	//-----------------------
	// eslint-disable-next-line global-require
	const smoothie = require("./smoothie");
	// eslint-disable-next-line global-require
	const { Renderer } = require("tera-mod-ui");
	// eslint-disable-next-line global-require
	const { showItemInFolder } = require("electron").shell;
	let mod = new Renderer;

	//-----------------------
	// VARIABLES
	//-----------------------
	let visibleStructure = {};
	let settings = {};
	let modPathVar = "";
	let runtimeInfoVar = {};
	let softInfoVar = {};
	let ngspInfoVar = {};
	let graph = undefined;
	let graphData = new smoothie.TimeSeries();
	//-----------------------
	// GENERATE EMPTY DIVS EXAMPLES
	//-----------------------
	let emptySettingTextDiv = document.createElement("div");
	emptySettingTextDiv.className = "setting-text";
	let emptyInputControl = document.createElement("input");
	emptyInputControl.className = "setting-control";

	//------------------------
	// UI ELEMENTS REFS
	//-------------------------
	const canvasRef = document.getElementById("chart");

	const settingsContainer = document.getElementsByClassName("settings-container")[0];

	const uiCloseButton = document.getElementById("control-close");

	const uiOpenNgspFolderButton = document.getElementById("btn-openNgspFolder");
	const uiOpenLogsFolderButton = document.getElementById("btn-openLogsFolder");
	const uiOpenSettingsFolderButton = document.getElementById("btn-openSettingsFolder");
	const uiOpenEmulationFolderButton = document.getElementById("btn-openEmulationFolder");

	const uiNgspVerLabel = document.getElementById("ngsp-ver");

	const uiRuntimeLabel = document.getElementById("soft-runtime");
	const uiModuleLabel = document.getElementById("soft-modulever");
	const uiPlatformLabel = document.getElementById("soft-platform");

	const uiAdminLabel = document.getElementById("game-admin");
	const uiPatchLabel = document.getElementById("game-patch");
	const uiProtoLabel = document.getElementById("game-proto");

	const uiPingMinLabel = document.getElementById("ping-min");
	const uiPingAvgLabel = document.getElementById("ping-avg");
	const uiPingMaxLabel = document.getElementById("ping-max");

	const uiPingEffLabel = document.getElementById("ping-eff");
	const uiPingSpreadLabel = document.getElementById("ping-spread");
	const uiPingMedianLabel = document.getElementById("ping-median");


	const uiJitterAvgLabel = document.getElementById("jitter-avg");
	const uiJitterMaxLabel = document.getElementById("jitter-max");

	const uiTemplateLabel = document.getElementById("templ");
	const uiClassLabel = document.getElementById("templ-class");
	const uiRaceLabel = document.getElementById("templ-race");

	//-----------------------
	// Configure canvas
	//-----------------------

	graph = new smoothie.SmoothieChart({ "responsive": true, "grid": { "sharpLines": true, "verticalSections": 5, "borderVisible": false } });
	graph.addTimeSeries(graphData, { "strokeStyle": "rgba(255, 0, 0, 1)", "fillStyle": "rgba(255, 0, 0, 0.2)", "lineWidth": 2 });
	graph.streamTo(canvasRef, 500);

	//-----------------------
	// MENU TABS HANDLERS
	//-----------------------
	function handleTabs() {
		// Setup event listeners for tab controls
		// Alternatively, you could add `onchange="onTabChange"` to the HTML
		const buttons = document.querySelectorAll("input[name=\"tabs\"]");
		for (const button of buttons) button.addEventListener("change", onTabChange);
	}

	function onTabChange($e) {
		// https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
		// Get `data-tab` parameter from HTML, we'll use it to determine which tab should become active
		const tab = $e.target.dataset.tab;

		// Deactivate previously activated tab
		const tabs = document.querySelectorAll(".tab--active");
		for (const tab of tabs) tab.classList.remove("tab--active");

		// Activate selected tab, found using `data-tab` parameter
		const contentElement = document.querySelector(`.tab[data-tab="${tab}"]`);
		contentElement.classList.add("tab--active");
	}

	handleTabs();

	//--------------------
	//CLOSE BUTTON HANDLER
	//--------------------
	uiCloseButton.addEventListener("click", () => {
		mod.send("close");
	});

	//--------------------
	//FS BUTTONS HANDLERS
	//--------------------
	uiOpenEmulationFolderButton.addEventListener("click", () => {
		showItemInFolder(modPathVar.presetPath);
	});
	uiOpenSettingsFolderButton.addEventListener("click", () => {
		showItemInFolder(modPathVar.configPath);
	});
	uiOpenLogsFolderButton.addEventListener("click", () => {
		showItemInFolder(modPathVar.logPath);
	});
	uiOpenNgspFolderButton.addEventListener("click", () => {
		showItemInFolder(modPathVar.configPath.replace("/settings.json", ""));
	});

	//--------------------
	// EXT SETTINGS UPDATE
	//--------------------
	function ipcSettingsChange(newSettings) {
		settings = newSettings;
		Object.keys(settings).forEach(key => {
			let vsObj = visibleStructure[key];
			if (vsObj) {
				let elemRef = document.getElementById(key);
				switch (vsObj.type) {
				case ("bool"):
					elemRef.checked = settings[key];
					break;
				case ("number"):
					elemRef.value = settings[key];
					break;
				case ("select"):
					elemRef.value = settings[key];
					break;
				}
			}
		});
	}

	//--------------------
	// INTERNAL SETTINGS UPDATE
	//--------------------
	function uiSettingsChange(event) {
		//if(!settings[event.target.id]) return;
		switch (visibleStructure[event.target.id].type) {
		case ("bool"):
			settings[event.target.id] = event.target.checked;
			break;
		case ("number"):
			settings[event.target.id] = Number(event.target.value);
			break;
		case ("select"):
			settings[event.target.id] = event.target.value;
			break;
		}
		//send update event
		mod.send("uisettings", { ...settings });
	}

	function compileView() {
		//generate grid root style
		let style = document.getElementsByTagName("style")[0];
		style.innerHTML += `.settings-container {
			display: grid;
			grid-template-columns: 1fr 70px;
			grid-template-rows: repeat(${Object.keys(visibleStructure).length}, 1fr);
			grid-column-gap: 0px;
			grid-row-gap: 3px;
		}`;
		document.head.appendChild(style);

		//generate static text style  (column 1)
		let counter = 1;
		for (let key of Object.keys(visibleStructure)) {
			//placement style
			style.innerHTML += `
				#${key}-text {
					grid-area: ${counter} / 1 / ${counter + 1} / 2;
				}
			`;
			document.head.appendChild(style);
			counter++;
			//add in DOM text element with created class
			let newText = emptySettingTextDiv.cloneNode(false);
			newText.id = `${key}-text`;
			newText.innerText = visibleStructure[key]["name"];
			settingsContainer.appendChild(newText);
		}

		//generate controls (column 2)
		counter = 1;
		for (let key of Object.keys(visibleStructure)) {
			//placement style
			style.innerHTML += `
				#${key}-div {
					grid-area: ${counter} / 2 / ${counter + 1} / 3;
				}
			`;
			document.head.appendChild(style);
			counter++;

			//add in DOM control with created class
			let data = visibleStructure[key];
			let type = data["type"];
			let newControl = null;

			let newControlDiv = emptySettingTextDiv.cloneNode(false);
			newControlDiv.id = `${key}-div`;
			newControlDiv.classList.add("setting-value");
			switch (type) {
			case ("bool"):
				newControl = emptyInputControl.cloneNode(false);
				newControl.id = key;
				newControl.type = "checkbox";
				newControl.classList.add("setting-control");

				settingsContainer.appendChild(newControlDiv);
				newControlDiv.appendChild(newControl);
				newControl.addEventListener("change", uiSettingsChange);
				break;
			case ("number"):
				newControl = emptyInputControl.cloneNode(false);
				newControl.id = key;
				newControl.min = data.min;
				newControl.max = data.max;
				newControl.step = data.step;
				newControl.type = "number";
				newControl.classList.add("setting-control");

				settingsContainer.appendChild(newControlDiv);
				newControlDiv.appendChild(newControl);
				newControl.addEventListener("change", uiSettingsChange);
				break;
			case ("select"):
				newControl = document.createElement("select");
				newControl.id = key;
				newControl.classList.add("setting-control");
				data.options.forEach(element => {
					let option = document.createElement("option");
					option.text = element.name;
					option.value = element.key;
					newControl.appendChild(option);
				});

				settingsContainer.appendChild(newControlDiv);
				newControlDiv.appendChild(newControl);
				newControl.addEventListener("change", uiSettingsChange);
				break;
			}
		}
	}

	//--------------------
	// PING ELEMENTS UPDATE EVENT
	//--------------------
	mod.on("ping", statsObj => {
		uiPingMinLabel.innerText = `Min: ${statsObj.ping.minValue}`;
		uiPingAvgLabel.innerText = `Avg: ${statsObj.ping.avgValue}`;
		uiPingMaxLabel.innerText = `Max: ${statsObj.ping.maxValue}`;
		uiPingEffLabel.innerText = `EffSpread: ${statsObj.ping.avgValue - statsObj.ping.minValue}`;
		uiPingSpreadLabel.innerText = `Spread: ${statsObj.ping.maxValue - statsObj.ping.minValue}`;
		uiPingMedianLabel.innerText = `Median: ${statsObj.ping.avgValue}`;

		uiJitterAvgLabel.innerText = `Avg: ${statsObj.jitter.avgValue}`;
		uiJitterMaxLabel.innerText = `Max: ${statsObj.jitter.maxValue}`;

		graphData.append(new Date().getTime(), statsObj.ping.raw);
	});

	//--------------------
	// INITIAL ELEMENTS UPDATE EVENT
	//--------------------
	mod.on("static", event => {

		//place variables to reduce future params usage
		visibleStructure = event.map;
		settings = event.config;
		//TODO usage
		modPathVar = event.modInfo;
		runtimeInfoVar = event.runtime;
		softInfoVar = event.soft;
		ngspInfoVar = event.ngsp;
		//place static data about runtime
		uiNgspVerLabel.innerHTML = `Version: ${ngspInfoVar.ver}`;

		uiAdminLabel.innerText = `Admin: ${runtimeInfoVar.isAdmin}`;
		uiPatchLabel.innerText = `Client: ${runtimeInfoVar.patch}`;
		uiProtoLabel.innerText = `Proto: ${runtimeInfoVar.proto}`;
		uiRuntimeLabel.innerText = `Runtime: ${runtimeInfoVar.proxyAuthor == "caali" && runtimeInfoVar.clientInterface ? "TB" : "Other"}`;

		uiModuleLabel.innerText = `ModVer: ${softInfoVar.modVer}`;
		uiPlatformLabel.innerText = `Platform: ${softInfoVar.platform}`;

		//player 
		uiClassLabel.innerText = `Class: ${event.player.job}`;
		uiRaceLabel.innerText = ` Race: ${event.player.race}`;
		uiTemplateLabel.innerText = `Template: ${event.player.template}`;

		//reconfigure settings UI
		compileView();
		ipcSettingsChange(settings);
	});

	//--------------------
	// SETTINGS UPDATE EVENT
	//--------------------
	mod.on("extsettings", settingsObj => {
		ipcSettingsChange(settingsObj);
	});

	mod.send("ready");
});
