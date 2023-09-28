import { DateSelectArg, EventInput } from "@fullcalendar/core/index.js";
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import React, { useState } from "react";
import ReactModal from "react-modal";
import "./AddItemModal.css";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/fr";

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (newEvent: EventInput) => void;
  selectedDateInfo: DateSelectArg | null;
}

enum eventLabels {
  reservation = "Réservation",
  evenement = "Evénement",
}

enum eventTypes {
  reservation = "auto",
  evenement = "background",
}

export function AddItemModal({
  isOpen,
  onClose,
  onAddEvent,
  selectedDateInfo,
}: AddItemModalProps) {
  const [eventDate, setEventDate] = useState({
    start: selectedDateInfo ? selectedDateInfo.start : new Date(),
    end: selectedDateInfo ? selectedDateInfo.end : new Date(),
  });
  const [eventType, setEventType] = useState("auto");
  const [eventName, setEventName] = useState("Nouvel ajout");
  const [disableConfirm, setDisableConfirm] = useState(false);
  const [eventLabel, setEventLabel] = useState(getLabel());
  const [eventColor, setEventColor] = useState("#f6b73c");

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newEvent: EventInput = {
      title: eventName,
      start: eventDate.start,
      end: eventDate.end,
      display: eventType,
      color: eventColor,
    };

    onAddEvent(newEvent);
    onClose();
    setEventDate({ start: new Date(), end: new Date() });
  };

  return (
    <ReactModal
      style={{
        overlay: {
          zIndex: 2,
        },
        content: {
          padding: "0px",
          backgroundColor: "whitesmoke",
          inset: "15%",
        },
      }}
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <div className="modal-header">
        <span>{eventLabel}</span>
      </div>
      <form className="modal-form" onSubmit={handleFormSubmit}>
        <div className="titleInput">
          <TextField
            id="title-field"
            label="Titre"
            variant="outlined"
            value={eventName}
            onChange={(e) => {
              setEventName(e.target.value);
              setEventLabel(getLabel());
            }}
          ></TextField>
          <RadioGroup
            name="itemType"
            value={eventType}
            row={true}
            style={{ marginLeft: "30px" }}
            onChange={(e) => {
              setEventType(e.target.value);
              setEventLabel(getLabel());
            }}
          >
            <FormControlLabel
              value="auto"
              control={<Radio />}
              label={eventLabels.reservation}
            />
            <FormControlLabel
              value="background"
              control={<Radio />}
              label={eventLabels.evenement}
            />
          </RadioGroup>
        </div>
        <div className="dateInputs">
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
            <DatePicker
              label="Début"
              value={dayjs(eventDate.start)}
              onChange={(newValue) => {
                setEventDate({
                  //@ts-ignore
                  start: new Date(newValue),
                  end: eventDate.end,
                });
                setDisableConfirm(eventDate.start > eventDate.end);
              }}
            />
            <DatePicker
              label="Fin"
              value={dayjs(eventDate.end)}
              onChange={(newValue) => {
                setEventDate({
                  start: eventDate.start,
                  //@ts-ignore
                  end: new Date(newValue),
                });
                setDisableConfirm(eventDate.start > eventDate.end);
              }}
            />
          </LocalizationProvider>
        </div>
        <div className="modal-colorPicker">
          <label htmlFor="colorPicker">Couleur de l'ajout : </label>
          <input
            type="color"
            id="colorPicker"
            value={eventColor}
            onChange={(e) => setEventColor(e.target.value)}
          ></input>
        </div>
        <div className="modal-buttons">
          <Button
            variant="contained"
            color="success"
            type="submit"
            //?le disabled est décalé d'une action
            //disabled={disableConfirm}
          >
            Confirmer
          </Button>
          <Button
            variant="outlined"
            color="error"
            type="button"
            onClick={onClose}
          >
            Abandonner
          </Button>
        </div>
      </form>
    </ReactModal>
  );

  function getLabel(): string {
    let resultString: string;
    if (eventType === eventTypes.reservation.toString())
      resultString = `Nouvelle réservation`;
    else if (eventType === eventTypes.evenement)
      resultString = `Nouvel évenement`;
    else resultString = "Nouveau";
    return `${resultString} : ${eventName}`;
  }
}
