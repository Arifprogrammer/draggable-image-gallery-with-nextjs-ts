"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

//* TS
interface DraggbleImageProps {
  image: string | StaticImport;
  order: number;
  index: number;
  handleChecked: (order: number) => void;
  activeHover: boolean;
  setActiveHover: Dispatch<SetStateAction<boolean>>;
  selectedId: number[];
}

export const DraggbleImage = ({
  image,
  order,
  index,
  handleChecked,
  activeHover,
  setActiveHover,
  selectedId,
}: DraggbleImageProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: order }); // Use the sortable hook to manage dragging behavior.

  const style = {
    // Convert transform to a string for styling.
    transform: CSS.Transform.toString(transform),
    transition,
  };

  //* useState hooks
  const [hoverCurrentElement, setHoverCurrentElement] = useState<number>(0); // checks which images are hovered becacuse sending the activeHover data from parent it shows all images are hoverred while hover on a single image and we have to initialize activeHover state on parent because we want to de-activate activeHover onDragMove event handler

  const handleMouseEnter = (order: number) => {
    // Function to handle mouse enter and activate the hover div.
    const currentElementOrder = order;
    setHoverCurrentElement(currentElementOrder);
    setActiveHover(true);
  };

  const handleMouseLeave = () => {
    // Function to handle mouse leave and deactivate the hover div.
    setActiveHover(false);
    setHoverCurrentElement(0);
  };

  return (
    <>
      <div
        className={`relative ${
          index === 0 && "md:col-span-2 md:row-span-2"
        } border-2 border-white rounded-lg h-max`}
      >
        <div
          style={style}
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          className={`bg-white rounded-lg overflow-hidden cursor-grab relative`}
          onMouseEnter={() => handleMouseEnter(order)}
          onMouseLeave={handleMouseLeave}
        >
          <Image
            src={image}
            alt={`image ${order}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div
            id="image"
            className={`absolute inset-0 bg-black transition duration-300 ${
              hoverCurrentElement === order && activeHover
                ? "opacity-50 z-10"
                : "opacity-0 -z-10"
            } ${selectedId.includes(order) ? "opacity-30 z-10" : ""} `}
          ></div>
        </div>
        <input // This input element is placed outside - Refer to Readme.md for details.
          type="checkbox"
          name="select"
          onChange={() => handleChecked(order)}
          onMouseEnter={() => handleMouseEnter(order)}
          className={`absolute top-3 left-3 transition duration-100 ${
            hoverCurrentElement === order && activeHover
              ? "opacity-100 z-20"
              : "opacity-0 -z-10"
          } ${selectedId.includes(order) ? "opacity-100 z-20" : ""}`}
        />
      </div>
    </>
  );
};
