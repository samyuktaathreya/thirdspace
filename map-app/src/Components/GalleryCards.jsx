import "../App.css";
import {focusFeature} from '../helpers/mapFocus.js';
import { useState } from "react";
import GalleryCard from '../Components/GalleryCard';

export default function GalleryCards({ pins = [], onSelectPin }) {
  if (!pins.length) {
    return (
      <div className="GalleryCards">
        <div className="GalleryCard">No places yet.</div>
      </div>
    );
  }

  return (
    <div className="GalleryCards">
      {pins.map((pin) => (
        <GalleryCard pin={pin} onSelectPin={onSelectPin}/>
      ))}
    </div>
  );
}

