import React from "react";

const Card = ({ name, icon }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl p-6 cursor-pointer card-shake">
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="mb-2">
          {icon ? (
            <img
              src={icon}
              alt={`${name} logo`}
              className="w-16 h-16 object-contain filter drop-shadow-lg"
            />
          ) : (
            <div className="w-16 h-16 bg-transparent rounded-lg flex items-center justify-center">
              <span className="text-gray-300 text-xl font-bold">
                {name.charAt(0)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
