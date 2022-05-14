import React from "react";

const RenderPhrase = (number, users, searchText) => {
    if (users) {
        if (number > 0) {
            return (
                <span className="text-light bg-primary p-2">
                    {number} человек сегодня тусанут с табой
                </span>
            );
        } else {
            if (searchText) {
                return null;
            } else {
                return (
                    <span className="text-light bg-danger p-2">
                        Никто с табой не тусанёт
                    </span>
                );
            }
        }
    } else {
        return (
            <span className="text-light bg-warning p-2">
                Ждите, идет загрузка данных.
            </span>
        );
    }
};

export default RenderPhrase;
