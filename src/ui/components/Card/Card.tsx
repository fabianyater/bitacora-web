import React from "react";
import { Link } from "react-router-dom";
import placeholderImage from "../../../assets/placeholder.webp";
import styles from "./styles.module.css";

interface BotanicCardProps {
  title: string;
  date: string;
  weatherType: string;
  temperature: number;
  humidity: number;
  commonName: string;
  scientificName: string;
  sampleImage?: string;
  path: string;
}

const BotanicCard: React.FC<BotanicCardProps> = ({
  title,
  date,
  weatherType,
  temperature,
  humidity,
  commonName,
  scientificName,
  sampleImage,
  path,
}) => {
  return (
    <Link to={path}>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <img
            src={sampleImage || placeholderImage}
            alt={`${title} - ${commonName}`}
            className={styles.image}
          />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.date}>{new Date(date).toLocaleDateString()}</p>
          <p className={styles.species}>
            <strong>{commonName}</strong> <em>({scientificName})</em>
          </p>
          <div className={styles.weather}>
            <span className={styles.weatherType}>{weatherType}</span>
            <span className={styles.weatherDetails}>
              {temperature}°C - {humidity}% Humedad
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BotanicCard;
