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
    useSortable({ id: order });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  //* useState hooks
  const [hoverCurrentElement, setHoverCurrentElement] = useState<number>(0);

  const handleMouseEnter = (order: number) => {
    const currentElementOrder = order;
    setHoverCurrentElement(currentElementOrder);
    setActiveHover(true);
  };

  const handleMouseLeave = () => {
    setActiveHover(false);
    setHoverCurrentElement(0);
  };

  return (
    <>
      <div
        className={`relative ${index === 0 && "md:col-span-2 md:row-span-2"}`}
      >
        <div
          style={style}
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          className={`bg-white border-2 border-white rounded-lg overflow-hidden cursor-grab relative`}
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
        <input
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
