import React from 'react';

interface CatProps {
  CatComponent: React.FC<React.SVGProps<SVGSVGElement>>;
}

const Cat: React.FC<CatProps> = ({ CatComponent }) => {
  return (
    <div className="w-32 h-32 sm:w-40 sm:h-40">
      <CatComponent className="w-full h-full" />
    </div>
  );
};

export default Cat;
