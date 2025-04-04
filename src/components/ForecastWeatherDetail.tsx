/** @format */

import React from "react";
import Container from "./Container";
import WeatherIcon from "./WeatherIcon";
import WeatherDetails, { WeatherDetailProps } from "./WeatherDetails";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";

export interface ForecastWeatherDetailProps extends WeatherDetailProps {
  weatehrIcon: string;
  date: string;
  day: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  description: string;
}

const weatherDescriptions: { [key: string]: string } = {
  "clear sky": "Cielo despejado",
  "few clouds": "Pocas nubes",
  "scattered clouds": "Nubes dispersas",
  "broken clouds": "Nubes rotas",
  "shower rain": "Lluvia ligera",
  "ragged shower rain": "Lluvia ligera irregular",
  "light rain": "Lluvia ligera",
  "moderate rain": "Lluvia moderada",
  "heavy rain": "Lluvia fuerte",
  "very heavy rain": "Lluvia muy fuerte",
  "extreme rain": "Lluvia extrema",
  "freezing rain": "Lluvia helada",
  "light snow": "Nieve ligera",
  "snow": "Nieve",
  "heavy snow": "Nieve fuerte",
  "sleet": "Aguanieve",
  "shower sleet": "Lluvia de aguanieve",
  "thunderstorm": "Tormenta",
  "heavy thunderstorm": "Tormenta fuerte",
  "light thunderstorm": "Tormenta ligera",
  "ragged thunderstorm": "Tormenta irregular",
  "mist": "Neblina",
  "smoke": "Humo",
  "haze": "Bruma",
  "dust": "Polvo",
  "fog": "Niebla",
  "sand": "Arena",
  "volcanic ash": "Ceniza volcánica",
  "squalls": "Ráfagas",
  "tornado": "Tornado"
};

export default function ForecastWeatherDetail(
  props: ForecastWeatherDetailProps
) {
  const {
    weatehrIcon = "02d",
    date = "19.09",
    day = "Martes", // Traducido manualmente
    temp,
    feels_like,
    temp_min,
    temp_max,
    description
  } = props;

  return (
    <Container className="gap-4">
      {/* Sección izquierda */}
      <section className="flex gap-4 items-center px-4">
        <div className="flex flex-col gap-1 items-center">
          <WeatherIcon iconName={weatehrIcon} />
          <p>{date}</p>
          <p className="text-sm">{day}</p>
        </div>

        {/* Temperatura */}
        <div className="flex flex-col px-4">
          <span className="text-5xl">{convertKelvinToCelsius(temp ?? 0)}°</span>
          <p className="text-xs space-x-1 whitespace-nowrap">
            <span>Sensación térmica </span>
            <span>{convertKelvinToCelsius(feels_like ?? 0)}°</span>
          </p>
          <p className="capitalize">{weatherDescriptions[description.toLowerCase()] ?? description}</p>
        </div>
      </section>

      {/* Sección derecha */}
      <section className="overflow-x-auto flex justify-between gap-4 px-4 w-full pr-10">
        <WeatherDetails {...props} />
      </section>
    </Container>
  );
}
