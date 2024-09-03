import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

interface Option {
  value: string;
  label: string;
}
interface InputSelectProps {
  value: string;
  onchange: (input_val:String)=>void;
  
}
const InputSelect: React.FC<InputSelectProps> = ({ value,onchange }) => {
  const [searchQuery, setSearchQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<Option[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiKey = 'zhwhptCfsEfScmLc6pMuwXrJ8swgdcaWmkqiZICy'; // Replace with your API key

  const fetchSuggestions = useCallback(
    async (query: string) => {
      if (query.length < 3) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          'https://api.olamaps.io/places/v1/autocomplete',
          {
            params: {
              input: query,
              api_key: apiKey,
            },
          },
        );

        // Debugging: Log the response to see its structure
        console.log('API Response:', response.data);

        const predictions = response.data.predictions || [];
        const mappedSuggestions = predictions.map((item: any) => ({
          value: item.reference, // Use `reference` or `place_id` as value
          label: item.description, // Use `description` as label
        }));

        setSuggestions(mappedSuggestions);
      } catch (err) {
        console.error('Error fetching search results:', err);
        setError(
          'Failed to fetch search results. Please check your API key and try again.',
        );
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    },
    [apiKey],
  );
  useEffect(() => {
    setSearchQuery(value);
  }, [value])
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchSuggestions(query);
    onchange(query)

  };

  const handleSelect = (value: string, label: string) => {
    setSelectedValue(label);
    setSearchQuery(label);
    setSuggestions([]);
    onchange(label)
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Type a location..."
        value={searchQuery}
        onChange={handleInputChange}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
      {loading && <div className="text-gray-500">Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          {suggestions.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option.value, option.label)}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputSelect;
