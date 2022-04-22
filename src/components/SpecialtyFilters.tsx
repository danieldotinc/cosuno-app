import React from 'react';

type SpecialtyFiltersProps = { specialties: Specialty[]; onSelect: Function };

const SpecialtyFilters: React.FC<SpecialtyFiltersProps> = ({ specialties, onSelect }) => {
  return (
    <div className="btn-group d-flex flex-wrap justify-content-center">
      {specialties.map(specialty => (
        <div className="input-text m-2" key={specialty._id}>
          <input className="form-check-input m-1" type="checkbox" onClick={() => onSelect(specialty)} />
          <small className="text-muted">{specialty.name}</small>
        </div>
      ))}
    </div>
  );
};

export default SpecialtyFilters;
