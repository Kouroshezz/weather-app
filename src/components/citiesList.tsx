import { useState, useEffect, useContext } from "react";
import { Autocomplete, TextField } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useDebounce } from "use-debounce";
import { getCities } from "../utills/fetchFunc";
import type { FetchCities } from "../utills/types";
import { CityContext } from "../context/cityContext";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../context";

function CitiesList() {
  const [text, setText] = useState("");
  const [cityList, setCityList] = useState<FetchCities[]>([]);
  const [value] = useDebounce(text, 200);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();
  const { setSelectedCity } = useContext(CityContext);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchCitiesFx = async () => {
      if (!value) {
        setCityList([]);
        return;
      }
      setIsLoading(true);
      try {
        const { data } = await getCities(value); // WeatherAPI /search.json (array)
        setCityList(data);
      } catch (err) {
        console.error("Error fetching cities:", err);
        setCityList([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCitiesFx();
  }, [value]);

  function zebraRow(index: number) {
    if (theme === "light") return index % 2 ? "#ffffff" : "#E1E9EE";
    return index % 2 ? "#292F45" : "#292F4520";
  }

  return (
    <>
      <Autocomplete
        loading={isLoading}
        loadingText={t("load_cities")}
        disablePortal
        options={cityList}
        getOptionLabel={(option: FetchCities) => `${option.name}, ${option.country}`}
        isOptionEqualToValue={(a, b) => a.id === b.id}
        sx={{ width: { xs: "70%", md: "300px" } }}
        onInputChange={(_, newValue) => setText(newValue)}
        onChange={async (_, newValue) => {
          if (!newValue) {
            setSelectedCity(null);
            return;
          }
          const cityName = `${newValue.name}, ${newValue.country}`;
          setSelectedCity({ cityName });
        }}
        renderInput={(params) => (
          <TextField
            value={text}
            {...params}
            label={t("cityname")}
            placeholder="Enter your city"
          />
        )}
        renderOption={(props, option, { index }) => (
          <li
            {...props}
            key={option.id}
            style={{ backgroundColor: zebraRow(index), padding: "6px 12px" }}
          >
            <LocationOnOutlinedIcon />
            &nbsp;{option.name}
            {option.region ? `, ${option.region}` : ""}, {option.country}
          </li>
        )}
      />

    </>
  );
}

export default CitiesList;
