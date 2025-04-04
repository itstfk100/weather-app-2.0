/** @format */
"use client";

import React from "react";
import { MdOutlineLocationOn, MdWbSunny, MdMyLocation } from "react-icons/md";
import SearchBox from "./SearchBox";
import { useState } from "react";
import axios from "axios";
import { loadingCityAtom, placeAtom } from "@/app/atom";
import { useAtom } from "jotai";

type Props = { location?: string };

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;

export default function Navbar({ location }: Props) {
  const [ciudad, setCiudad] = useState("");
  const [error, setError] = useState("");
  const [sugerencias, setSugerencias] = useState<string[]>([]);
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
  const [lugar, setLugar] = useAtom(placeAtom);
  const [_, setCargandoCiudad] = useAtom(loadingCityAtom);

  async function manejarCambioInput(valor: string) {
    setCiudad(valor);
    if (valor.length >= 3) {
      try {
        const respuesta = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?q=${valor}&appid=${API_KEY}`
        );

        const sugerencias = respuesta.data.list.map((item: any) => item.name);
        setSugerencias(sugerencias);
        setError("");
        setMostrarSugerencias(true);
      } catch (error) {
        setSugerencias([]);
        setMostrarSugerencias(false);
      }
    } else {
      setSugerencias([]);
      setMostrarSugerencias(false);
    }
  }

  function manejarClickSugerencia(valor: string) {
    setCiudad(valor);
    setMostrarSugerencias(false);
  }

  function manejarEnvioBusqueda(e: React.FormEvent<HTMLFormElement>) {
    setCargandoCiudad(true);
    e.preventDefault();
    if (sugerencias.length == 0) {
      setError("Ubicación no encontrada");
      setCargandoCiudad(false);
    } else {
      setError("");
      setTimeout(() => {
        setCargandoCiudad(false);
        setLugar(ciudad);
        setMostrarSugerencias(false);
      }, 500);
    }
  }

  function manejarUbicacionActual() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          setCargandoCiudad(true);
          const respuesta = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
          );
          setTimeout(() => {
            setCargandoCiudad(false);
            setLugar(respuesta.data.name);
          }, 500);
        } catch (error) {
          setCargandoCiudad(false);
        }
      });
    }
  }

  return (
    <>
      <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
        <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
          <p className="flex items-center justify-center gap-2">
            <h2 className="text-gray-500 text-3xl">Clima</h2>
            <MdWbSunny className="text-3xl mt-1 text-yellow-300" />
          </p>

          {/* Buscador y ubicación */}
          <section className="flex gap-2 items-center">
            <MdMyLocation
              title="Tu ubicación actual"
              onClick={manejarUbicacionActual}
              className="text-2xl text-gray-400 hover:opacity-80 cursor-pointer"
            />
            <MdOutlineLocationOn className="text-3xl" />
            <p className="text-slate-900/80 text-sm">{location}</p>
            <div className="relative hidden md:flex">
              <SearchBox
                value={ciudad}
                onSubmit={manejarEnvioBusqueda}
                onChange={(e) => manejarCambioInput(e.target.value)}
              />
              <SuggetionBox
                {...{
                  mostrarSugerencias,
                  sugerencias,
                  manejarClickSugerencia,
                  error
                }}
              />
            </div>
          </section>
        </div>
      </nav>

      {/* Móvil */}
      <section className="flex max-w-7xl px-3 md:hidden">
        <div className="relative">
          <SearchBox
            value={ciudad}
            onSubmit={manejarEnvioBusqueda}
            onChange={(e) => manejarCambioInput(e.target.value)}
          />
          <SuggetionBox
            {...{
              mostrarSugerencias,
              sugerencias,
              manejarClickSugerencia,
              error
            }}
          />
        </div>
      </section>
    </>
  );
}

function SuggetionBox({
  mostrarSugerencias,
  sugerencias,
  manejarClickSugerencia,
  error
}: {
  mostrarSugerencias: boolean;
  sugerencias: string[];
  manejarClickSugerencia: (item: string) => void;
  error: string;
}) {
  return (
    <>
      {((mostrarSugerencias && sugerencias.length > 1) || error) && (
        <ul className="mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 py-2 px-2">
          {error && sugerencias.length < 1 && (
            <li className="text-red-500 p-1">{error}</li>
          )}
          {sugerencias.map((item, i) => (
            <li
              key={i}
              onClick={() => manejarClickSugerencia(item)}
              className="cursor-pointer p-1 rounded hover:bg-gray-200"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
