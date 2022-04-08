import React from "react";

const RenderPhrase = (number) => {
    if (number > 0) {
        return (
            <span className="text-light bg-primary p-2">
                {number} человек сегодня тусанут с табой
            </span>
        );
    } else {
        return (
            <span className="text-light bg-danger p-2">
                Никто с табой не тусанёт
            </span>
        );
    }
};

export default RenderPhrase;
