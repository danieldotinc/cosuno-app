import React from 'react';

import './CompaniesGrid.css';

type CompaniesGridProps = { companies: Company[] };

const COLORS: { [key: string]: string } = {
  Electricity: 'primary',
  Plumbing: 'secondary',
  Painting: 'danger',
  Parquet: 'success',
  Windows: 'warning text-black',
  Furnishing: 'warning text-black',
  Piping: 'info',
  Carpeting: 'secondary',
  Gardening: 'success',
  InteriorDesign: 'dark',
  Transportation: 'info',
  Logistics: 'primary',
};

const getCategoryCoverageInPercentage = (company: Company) => {
  const categoryCoverage = (company.specialties.length / Object.keys(COLORS).length) * 100;
  if (categoryCoverage < 26) return 25;
  if (categoryCoverage < 51) return 50;
  if (categoryCoverage < 76) return 75;
  if (categoryCoverage < 101) return 100;
};

const CompaniesGrid: React.FC<CompaniesGridProps> = ({ companies }) => (
  <div className="container mt-5 mb-3">
    <div className="row">
      {companies.map(company => (
        <div className="col-md-3" key={company._id}>
          <div className="card p-3 mb-2">
            <div className="d-flex justify-content-between">
              <div className="d-flex flex-row align-items-center">
                <div className="icon">
                  <img src="" />
                </div>
                <div className="ms-2 c-details">
                  <h6 className="mb-0">{company.name}</h6> <span>{company.city}</span>
                </div>
              </div>
              <div className="specialty d-flex flex-wrap">
                <span className="badge rounded-pill bg-dark p-2">Verified</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="specialty d-flex flex-wrap">
                {company.specialties.map(specialty => (
                  <span key={specialty._id + company._id} className={`badge rounded-pill bg-${COLORS[specialty.name]}`}>
                    {specialty.name}
                  </span>
                ))}
              </div>
              <div className="mt-4">
                <div className="progress">
                  <div
                    className={`progress-bar w-${getCategoryCoverageInPercentage(company)}`}
                    role="progressbar"
                  ></div>
                </div>
                <div className="mt-3">
                  <span className="text1">
                    {company.specialties.length} Specialties <span className="text2">in 12 categories</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default CompaniesGrid;
