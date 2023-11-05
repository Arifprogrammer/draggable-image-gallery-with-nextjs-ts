"use client";
import image_1 from "@/assets/images/image-1.webp";
import image_2 from "@/assets/images/image-2.webp";
import image_3 from "@/assets/images/image-3.webp";
import image_4 from "@/assets/images/image-4.webp";
import image_5 from "@/assets/images/image-5.webp";
import image_6 from "@/assets/images/image-6.webp";
import image_7 from "@/assets/images/image-7.webp";
import image_8 from "@/assets/images/image-8.webp";
import image_9 from "@/assets/images/image-9.webp";
import image_10 from "@/assets/images/image-10.webp";
import image_11 from "@/assets/images/image-11.webp";
import image_icon from "@/assets/images/image-icon.png";

import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { useMemo, useState } from "react";
import { DraggbleImage } from "@/components/DraggbleImage";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

//* TS
interface ImageItem {
  image: string | StaticImport;
  order: number;
}

const imagesArray: ImageItem[] = [
  // All images with their order/id
  {
    image: image_1,
    order: 1,
  },
  {
    image: image_2,
    order: 2,
  },
  {
    image: image_3,
    order: 3,
  },
  {
    image: image_4,
    order: 4,
  },
  {
    image: image_5,
    order: 5,
  },
  {
    image: image_6,
    order: 6,
  },
  {
    image: image_7,
    order: 7,
  },
  {
    image: image_8,
    order: 8,
  },
  {
    image: image_9,
    order: 9,
  },
  {
    image: image_10,
    order: 10,
  },
  {
    image: image_11,
    order: 11,
  },
];

export default function ImageGallery() {
  //* useState hooks
  const [images, setImages] = useState<ImageItem[]>(imagesArray);
  const [activeHover, setActiveHover] = useState<boolean>(false); // hover div will be active when a user hovers on an image and deactivates when dragging or hovering out.
  const [selectedId, setSelectedId] = useState<number[]>([]); // Orders/IDs of selected images are collected in this array.

  const imagesId: number[] = useMemo(
    // Creates an array of all image order IDs for SortableContext.
    () => images.map((img) => img.order),
    [images]
  );

  const onDragMove = () => {
    // Deactivate the hover div while dragging.
    setActiveHover(false);
  };

  const onDragEnd = (e: DragEndEvent) => {
    // Sorting images when dragging ends.
    const { active, over } = e;
    if (active.id === over?.id) {
      return;
    }

    setImages((image) => {
      const oldIndex = image.findIndex((img) => img.order === active.id);
      const newIndex = image.findIndex((img) => img.order === over?.id);
      return arrayMove(image, oldIndex, newIndex);
    });
  };

  const handleDeleteImage = () => {
    // Delete selected images.
    const deleteImages = images.filter(
      ({ order }) => order !== selectedId.find((id) => id === order)
    );
    setImages(deleteImages);
    setSelectedId([]);
  };

  const handleChecked = (order: number) => {
    // Determine which images are checked or not.
    if (selectedId.includes(order)) {
      const deleteId = selectedId.filter((id) => id !== order);
      setSelectedId(deleteId);
    } else setSelectedId([...selectedId, order]);
  };

  return (
    <main className="py-16 px-5 md:px-0 md:py-8 min-h-screen flex justify-center items-center container mx-auto">
      <DndContext
        collisionDetection={closestCenter}
        onDragMove={onDragMove}
        onDragEnd={onDragEnd}
      >
        <div className="rounded-lg shadow-xl shadow-black bg-slate-600 overflow-hidden">
          <div className="py-5 px-6 lg:px-10 flex justify-between items-center border-b-2 border-white">
            {selectedId.length > 0 ? (
              <div className="flex items-center gap-3 md:gap-5">
                <input type="checkbox" checked />
                <p className="md:text-2xl font-semibold">
                  {selectedId.length} Files Selected
                </p>
              </div>
            ) : (
              <p className="text-3xl font-bold font-serif">Gallery</p>
            )}
            {selectedId.length > 0 && (
              <button
                className="md:text-xl text-red-400 font-semibold hover:underline"
                onClick={handleDeleteImage}
              >
                {selectedId.length > 1 ? "Delete Files" : "Delete File"}
              </button>
            )}
          </div>
          <div className="gallery-container p-6 lg:p-10">
            <SortableContext items={imagesId}>
              {images.map(({ image, order }, index) => (
                <DraggbleImage
                  key={order}
                  image={image}
                  order={order}
                  index={index}
                  handleChecked={handleChecked}
                  activeHover={activeHover}
                  setActiveHover={setActiveHover}
                  selectedId={selectedId}
                />
              ))}
            </SortableContext>
            <div className="max-[519px]:py-32 max-[639px]:py-12 sm:py-16 border-2 border-dashed rounded-lg flex flex-col justify-center items-center gap-y-3 cursor-pointer h-full">
              <Image src={image_icon} alt="image_icon" height={40} width={40} />
              <p>Add Images</p>
            </div>
          </div>
        </div>
      </DndContext>
    </main>
  );
}
