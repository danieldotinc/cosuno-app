import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import _ from 'lodash';

import CompaniesGrid from '../components/CompaniesGrid';
import SpecialtyFilter from '../components/SpecialtyFilters';
import SearchBox from '../components/SearchBox';

import specialtyService from '../services/specialtyService';
import companyService from '../services/companyService';

type SortColumn = { path: string; order: 'asc' | 'desc' | boolean };

type CompaniesProps = { user: User | null };

const Companies: React.FC<CompaniesProps> = ({ user }) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialties, setSelectedSpecialties] = useState<Specialty[]>([]);
  const [sortColumn, setSortColumn] = useState<SortColumn>({ path: 'name', order: 'asc' });

  if (!user) return <Navigate to="/login" />;

  const handleSpecialtySelect = (specialty: Specialty) => {
    if (selectedSpecialties.some(s => s._id === specialty._id)) {
      setSelectedSpecialties(selectedSpecialties.filter(s => s._id !== specialty._id));
    } else setSelectedSpecialties([...selectedSpecialties, specialty]);
  };

  const handleSearch = (query: string) => setSearchQuery(query);

  const getFilteredData = () => {
    let filtered = companies;
    if (searchQuery) filtered = companies.filter(c => c.name.toLowerCase().startsWith(searchQuery.toLowerCase()));

    if (selectedSpecialties && selectedSpecialties.length) {
      filtered = filtered.filter(c => c.specialties.some(s => selectedSpecialties.some(ss => ss._id === s._id)));
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    return { totalCount: filtered.length, data: sorted };
  };

  useEffect(() => {
    const getSpecialties = async () => {
      const fetchedSpecialties = await specialtyService.get();
      setSpecialties(fetchedSpecialties);
    };

    if (!specialties.length) getSpecialties();
  }, [specialties]);

  useEffect(() => {
    const getCompanies = async () => {
      const fetchedCompanies = await companyService.get();
      setCompanies(fetchedCompanies);
    };

    if (!companies.length) getCompanies();
  }, [companies]);

  const { length: count } = companies;
  if (count === 0) return <p>There are no companies in the database.</p>;

  const { totalCount, data: filteredCompanies } = getFilteredData();

  return (
    <div>
      <p>Showing {totalCount} companies in the database.</p>
      <SearchBox value={searchQuery} onChange={handleSearch} />
      <SpecialtyFilter specialties={specialties} onSelect={handleSpecialtySelect} />
      <CompaniesGrid companies={filteredCompanies} />
    </div>
  );
};

export default Companies;
