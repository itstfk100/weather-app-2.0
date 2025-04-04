/** @format */

import { cn } from "@/utils/cn";
import React from "react";
import { IoSearch } from "react-icons/io5";

type Props = {
  className?: string;  // Clase opcional que puede pasarse para personalizar el estilo del contenedor
  value: string;        // Valor del campo de búsqueda (ciudad)
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;  // Evento para manejar el cambio en el input
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;  // Evento para manejar la presentación del formulario
};

export default function SearchBox(props: Props) {
  return (
    <form
      onSubmit={props.onSubmit}  // Al enviar el formulario se ejecuta el evento onSubmit
      className={cn(
        "flex relative items-center justify-center h-10",  // Estilos básicos del formulario
        props.className  // Se añaden estilos adicionales pasados como props
      )}
    >
      <input
        type="text"  // Campo de texto para escribir la ciudad
        value={props.value}  // El valor que aparece en el input
        onChange={props.onChange}  // Evento que se dispara cuando el valor cambia
        placeholder="Buscar Ciudad.."  // Texto que aparece cuando el campo está vacío
        className="px-4 py-2 w-[230px] border border-gray-300 rounded-l-md focus:outline-none  focus:border-blue-500 h-full"  // Estilos del input
      />
      <button
        className="px-4 py-[9px] bg-blue-500 text-white rounded-r-md focus:outline-none hover:bg-blue-600  h-full"  // Estilos del botón
      >
        <IoSearch /> 
      </button>
    </form>
  );
}
