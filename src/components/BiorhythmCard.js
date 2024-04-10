import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from "@ionic/react";
import dayjs from 'dayjs'
import { calculateBiorhythms } from "../lib/biorhythms";
import BiorhythmChart from "./BiorhythmChart";
import './BiorhythmCard.css' 

function formatDate(isoString) {
  const day = dayjs(isoString);
  return day.format('D MMMM YYYY')
}

function BiorhythmCard({targetDate, birthDate}) {
  const biorhythms = calculateBiorhythms(birthDate, targetDate)
  return (
    <IonCard className="BiorhythmCard ion-text-center">
      <IonCardHeader>
        <IonCardTitle>{formatDate(targetDate)}</IonCardTitle>
          <IonCardContent>
          <BiorhythmChart targetDate={targetDate} birthDate={birthDate} />
            <p class="physical">Physical: {biorhythms.physical.toFixed(4)}</p>
            <p class="emotional">Emotional: {biorhythms.emotional.toFixed(4)}</p>
            <p class="intellectual">Intellectual: {biorhythms.intellectual.toFixed(4)}</p>
          </IonCardContent>
      </IonCardHeader>
    </IonCard>
  );
}

export default BiorhythmCard;