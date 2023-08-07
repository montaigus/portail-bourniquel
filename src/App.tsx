import React from "react";
import "./App.css";
import { Calendar, DateSelectArg } from "@fullcalendar/core";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import frLocale from "@fullcalendar/core/locales/fr";

let selectedDateInfo: DateSelectArg;

function App() {
  return (
    <div className="App">
      <div className="App-header">Portail familial de Bourniquel</div>
      <div className="calendar-container" id="calendarEl"></div>
    </div>
  );
}

document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendarEl");
  if (!calendarEl) return;
  var calendar: Calendar = new Calendar(calendarEl, {
    plugins: [multiMonthPlugin, interactionPlugin, listPlugin],
    timeZone: "UTC+2",
    initialView: "multiMonthYear",
    locale: frLocale,
    multiMonthMaxColumns: 2,
    editable: true,
    selectable: true,
    select: (info) => selectFunc(info),
    unselectAuto: false,
    contentHeight: "70vmin",
    headerToolbar: {
      left: "addEventButton",
      center: "title",
      right: "plusButton,minButton",
    },
    footerToolbar: {
      center: "prev,next",
    },
    customButtons: {
      addEventButton: {
        text: "Ajouter une réservation",
        click: () => addEventFunc(calendar),
      },
      plusButton: {
        text: "+",
        click: (ev, element) => zoomInFunc(calendar),
      },
      minButton: {
        text: "-",
        click: (ev, element) => zoomOutFunc(calendar),
      },
    },
    dateClick: (info) => dateClickFunc(info, calendar),
  });

  calendar.render();
});

function dateClickFunc(info: DateClickArg, calendar: Calendar) {
  // change the day's background color just for fun
  //info.dayEl.style.backgroundColor = "red";
}

function addEventFunc(calendar: Calendar) {
  if (selectedDateInfo) {
    // eslint-disable-next-line no-restricted-globals
    if (
      // eslint-disable-next-line no-restricted-globals
      confirm(
        `Créer une nouvelle réservation du ${selectedDateInfo.start.toLocaleDateString(
          "fr-FR"
        )} au ${selectedDateInfo.end.toLocaleDateString("fr-FR")}?`
      )
    ) {
      const eventName = prompt("Qui réserve ?", "Nouvelle réservation");
      calendar.addEvent({
        title: eventName ? eventName : "Nouvelle réservation",
        start: selectedDateInfo.start,
        end: selectedDateInfo.end,
        allDay: true,
      });
    }
  } else {
    alert("Sélectionne d'abord une ou plusieur dates");
  }
}

export default App;
function zoomInFunc(calendar: Calendar): void {
  const maxMonthOption = calendar.getOption("multiMonthMaxColumns");
  if (!maxMonthOption) return;
  calendar.setOption("multiMonthMaxColumns", maxMonthOption - 1);
}

function zoomOutFunc(calendar: Calendar): void {
  const maxMonthOption = calendar.getOption("multiMonthMaxColumns");
  if (!maxMonthOption) return;
  calendar.setOption("multiMonthMaxColumns", maxMonthOption + 1);
}
function selectFunc(info: DateSelectArg): void {
  selectedDateInfo = info;
}
