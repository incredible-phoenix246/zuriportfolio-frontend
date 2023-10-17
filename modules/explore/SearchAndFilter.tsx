import React, { Dispatch, useRef, useState } from 'react';
import {
  Airdrop,
  ArrowDown2,
  ArrowLeft2,
  ArrowRight2,
  Category,
  Cloud,
  Code,
  CommandSquare,
  Data,
  Filter,
  FilterSquare,
  MobileProgramming,
  PenTool2,
  Radar,
  SearchNormal,
  SearchNormal1,
} from 'iconsax-react';
import FilterComponent from './components/FilterComponent';
import CustomDropdown from './components/CustomDropdown';
import { Input, SelectInput } from '@ui/Input';
import { useExploreParams } from './hooks/exploreParam';
// import Breadcrumbs from '../../components/Breadcrumbs';

const SearchAndFilter = (prop: {
  setSearchQuery?: Dispatch<React.SetStateAction<string>>;
  filters: { SortBy?: number; Country?: string };
  handleFilters: (type: string, value: string | number) => void;
  setFilter: Dispatch<React.SetStateAction<{ SortBy?: number; Country?: string }>>;
  setPageNumber: () => void;
}) => {
  const { setPageNumber } = prop;
  const [activeSection, setActiveSection] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [selectedOption2, setSelectedOption2] = useState<string>('');
  const [showLeftButton, setShowLeftButton] = useState<boolean>(true);
  const [showRightButton, setShowRightButton] = useState<boolean>(true);
  const [showFilterComponent, setShowFilterComponent] = useState<boolean>(false);

  const { filters, handleFilters } = prop;
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const slider = sliderRef.current!; // Non-null assertion

    // setShowLeftButton(!isStart);
    // setShowRightButton(!isEnd);
  };

  const closeFilterComponent = (option?: 'close' | 'clear') => {
    if (option === 'clear') {
      prop.setFilter({});
    } else {
      setShowFilterComponent(false);
    }
  };
  const slideLeft = () => {
    const slider = sliderRef.current!; // Non-null assertion
    slider.scrollLeft -= 150; // Adjust the scroll distance as needed
  };

  const slideRight = () => {
    const slider = sliderRef.current!; // Non-null assertion
    slider.scrollLeft += 150; // Adjust the scroll distance as needed
  };

  const handleCustomDropdownChange = (option: string) => {
    setSelectedOption(option);

    if (option === 'Nigeria' || option === 'Ghana' || option === 'Cameroon') {
      return handleFilters('Country', option);
    }

    delete filters.Country;
  };
  const handleCustomDropdownChange2 = (option: string) => {
    setSelectedOption2(option);
    let sort = 0;
    if (option === 'Featured') {
      sort = 1;

      return handleFilters('SortBy', sort);
    }
    if (option === 'New Arrival') {
      sort = 2;

      return handleFilters('SortBy', sort);
    }

    delete filters.SortBy;
  };

  const sectionsData = [
    {
      icon: <Filter size={26} color="white" />,
      activeIcon: <Filter size={26} color="blac" />,
      text: 'All',
      filterType: 'none',
    },
    {
      icon: <PenTool2 size={26} color="white" />,
      activeIcon: <PenTool2 size={26} color="#737373" />,
      text: 'Design',
      filterType: 'Track',
    },
    {
      icon: <Code size="26" color="white" />,
      activeIcon: <Code size={26} color="#737373" />,
      text: 'Frontend',
      filterType: 'Track',
    },
    {
      icon: <CommandSquare size="26" color="white" />,
      activeIcon: <CommandSquare size={26} color="#737373" />,
      text: 'Backend',
      filterType: 'Track',
    },
    {
      icon: <MobileProgramming size="26" color="white" />,
      activeIcon: <MobileProgramming size={26} color="#737373" />,
      text: 'Mobile',
      filterType: 'Track',
    },
    {
      icon: <Cloud size="26" color="white" />,
      activeIcon: <Cloud size={26} color="#737373" />,
      text: 'Cloud Computing',
      filterType: 'Track',
    },
    {
      icon: <Data size="26" color="white" />,
      activeIcon: <Data size={26} color="#737373" />,
      text: 'Data Science',
      filterType: 'Track',
    },
    {
      icon: <Airdrop size="26" color="white" />,
      activeIcon: <Airdrop size={26} color="#737373" />,
      text: 'Cybersecurity',
      filterType: 'Track',
    },
    {
      icon: <Code size="26" color="white" />,
      activeIcon: <Code size={26} color="#737373" />,
      text: 'Devops',
      filterType: 'Track',
    },
  ];

  return (
    <section className="p-4 xl:px-0">
      <div className="relative -mt-[6.35rem] mx-auto mb-5 border border-white-110 py-8 px-6 rounded-lg bg-white-100 font-manropeL xl:max-w-[77.5rem] z-[1]">
        <div className="md:justify-between justify-center items-center md:items-start flex flex-col md:flex-row gap-8">
          <div className="w-full grid grid-cols-[1fr_auto] gap-4 xl:grid-cols-[1fr_auto_auto]">
            <div className="col-span-full grid gap-3">
              <label htmlFor="Search query title">Search by name or role</label>
              <Input
                onChange={(e) => {
                  prop.setSearchQuery && prop.setSearchQuery(e.target.value);
                  prop.setFilter({});
                  setPageNumber();
                }}
                type="text"
                name="search input"
                intent={'default'}
                placeHolder="Search by name or role"
                className="w-full text-grey-900 border-brand-disabled2 rounded-lg"
              />
            </div>

            <div className="grid gap-3">
              <label htmlFor="Badge">Badge</label>
              <CustomDropdown
                options={['Beginner', 'Intermediate', 'Expert']}
                selectedValue={selectedOption}
                placeholder="Location"
                onChange={handleCustomDropdownChange}
              />
            </div>

            <div className="grid gap-3">
              <label htmlFor="Location">Location</label>
              <CustomDropdown
                options={['Lagos, Nigeria', 'Accra, Ghana', 'Nairobi, Kenya']}
                selectedValue={selectedOption2}
                placeholder="Sort By"
                onChange={handleCustomDropdownChange2}
              />
            </div>

            <button className="hidden">
              <Filter
                size={48}
                color="#1a1c1b"
                className="border-2 border-brand-disabled2 text-black rounded-xl p-2 hover:bg-brand-green-primary"
              />
            </button>
          </div>
        </div>

        <div
          className="h-full overflow-x-scroll mt-4 mr-[6.5rem] scroll whitespace-nowrap scroll-smooth scrollbar-none"
          ref={sliderRef}
          onScroll={handleScroll}
        >
          <div className="justify-start items-center inline-flex mt-4 gap-6">
            {sectionsData.map((section, index) => (
              <div
                key={index}
                className={`px-4 py-[0.625rem] rounded-2xl justify-center items-center gap-4 flex cursor-pointer font-manropeB text-[0.875rem] ${
                  activeSection === index ? 'bg-brand-green-primary text-white-100' : 'bg-white text-[#737373]'
                } ${section.text === 'All' ? 'hidden sm:flex' : ''}`}
                onClick={() => {
                  setActiveSection(index);
                  handleFilters(section.filterType, section.text);
                  setShowFilterComponent(section.text === 'All Filter');
                }}
              >
                <div className="w-6 h-6 relative">{activeSection === index ? section.icon : section.activeIcon}</div>
                <div className="text-center">{section.text}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative -right-1 flex">
          {showLeftButton && (
            <div
              className="w-12 h-12 p-3 bg-white rounded-2xl border border-stone-300 justify-center items-center gap-2 inline-flex absolute -top-[3.05rem] right-[3.5rem] bg-white-100"
              onClick={slideLeft}
            >
              <div className="w-6 h-6 justify-center items-center flex cursor-pointer">
                <div className="w-6 h-6 relative">
                  <ArrowLeft2 color="#737373" />
                </div>
              </div>
            </div>
          )}

          {showRightButton && (
            <div
              className="w-12 h-12 p-3 bg-white rounded-2xl border border-stone-300 justify-center items-center gap-2 inline-flex absolute -top-[3.05rem] right-0 bg-white-100"
              onClick={slideRight}
            >
              <div className="w-6 h-6 justify-center items-center flex cursor-pointer">
                <div className="w-6 h-6 relative">
                  <ArrowRight2 color="#737373" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* {showFilterComponent && (
          <FilterComponent
            closeFilterComponent={closeFilterComponent}
            showFilterComponent={showFilterComponent}
            filters={filters}
            handleFilters={handleFilters}
          />
        )} */}
      </div>
    </section>
  );
};

export default SearchAndFilter;
