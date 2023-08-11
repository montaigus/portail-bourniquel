import React, { useState } from "react";
import "./App.css";
import {
  Calendar,
  CalendarOptions,
  DateSelectArg,
  EventInput,
} from "@fullcalendar/core";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import frLocale from "@fullcalendar/core/locales/fr";
import { Dialog } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import { RefObject } from "@fullcalendar/core/preact";
import { AddItemModal } from "./AddItemModal";

function App() {
  let selectedDateInfo: DateSelectArg | null = null;
  const calendarRef: RefObject<FullCalendar> = React.createRef();
  const [isOpen, setIsOpen] = useState(false);

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleModalSubmit = (newEvent: EventInput) => {
    //@ts-ignore
    const calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent(newEvent);
  };

  return (
    <div className="App">
      <div className="App-header">
        <span className="header-title">Portail familial de Bourniquel</span>{" "}
      </div>
      <div className="calendar-container" id="calendarEl">
        <FullCalendar
          ref={calendarRef}
          plugins={[multiMonthPlugin, interactionPlugin, listPlugin]}
          initialView="multiMonthYear"
          timeZone="UTC+2"
          locale={frLocale}
          multiMonthMaxColumns={2}
          editable={true}
          selectable={true}
          select={(info) => selectFunc(info)}
          unselectAuto={false}
          contentHeight="70vmin"
          displayEventTime={false}
          headerToolbar={{
            left: "addItemButton",
            center: "prev title next",
            right: "plusButton,minButton",
          }}
          customButtons={{
            addItemButton: {
              text: "Ajouter",
              click: () => addItemFunc(),
            },
            plusButton: {
              text: "+",
              click: () => zoomInFunc(),
            },
            minButton: {
              text: "-",
              click: () => zoomOutFunc(),
            },
          }}
        ></FullCalendar>
        {isOpen && (
          <AddItemModal
            isOpen={isOpen}
            onClose={handleModalClose}
            onAddEvent={handleModalSubmit}
            selectedDateInfo={selectedDateInfo}
          />
        )}
      </div>
    </div>
  );

  function zoomInFunc(): void {
    //@ts-ignore
    const calendarApi = calendarRef.current.getApi();
    const maxMonthOption = calendarApi.getOption("multiMonthMaxColumns");
    if (!maxMonthOption) return;
    calendarApi.setOption("multiMonthMaxColumns", maxMonthOption - 1);
  }

  function zoomOutFunc(): void {
    //@ts-ignore
    const calendarApi = calendarRef.current.getApi();
    const maxMonthOption = calendarApi.getOption("multiMonthMaxColumns");
    if (!maxMonthOption) return;
    calendarApi.setOption("multiMonthMaxColumns", maxMonthOption + 1);
  }
  function selectFunc(info: DateSelectArg): void {
    selectedDateInfo = info;
  }

  function addItemFunc(): void {
    setIsOpen(true);
  }
}

export default App;
