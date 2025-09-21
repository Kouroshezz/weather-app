import { useState, useEffect, useContext } from "react";
import { Autocomplete, TextField } from "@mui/material";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useDebounce } from "use-debounce";
import { getCities } from "../utills/fetchFunc";
import type { FetchCities } from "../utills/types";
import { CityContext } from "../context/cityContext";
import { useTranslation } from "react-i18next";



function CitiesList() {
  const [text, setText] = useState("");
  const [cityList, setCityList] = useState<FetchCities[]>([]);
  const [value] = useDebounce(text, 200);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation()

  const { setSelectedCity } = useContext(CityContext);

  // useEffect(() => {
  //   const fetchCities = async () => {
  //     if (!value) return;
  //     try {
  //       const { data } = await getCities(value);
  //       setCityList(data);
  //     } catch (err) {
  //       console.error("Error fetching cities:", err);
  //     }
  //   };
  //   fetchCities();
  // }, [value]);

  useEffect(() => {
    const fetchCities = async () => {
      if (!value) {
        setCityList([]);
        return;
      }
      setIsLoading(true);
      try {
        const { data } = await getCities(value);
        setCityList(data);
      } catch (err) {
        console.error("Error fetching cities:", err);
        setCityList([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, [value]);

  // console.log(text.slice(0, text.indexOf(',')).trim())

  return (
    <Autocomplete
      loading={isLoading}
      loadingText="Loading cities..."
      disablePortal
      options={cityList}
      getOptionLabel={(option: FetchCities) =>
        ` ${option.LocalizedName}, ${option.Country.LocalizedName}`
      }
      sx={{ width: 300 }}
      onInputChange={(_, newValue) => setText(newValue)}
      onChange={(_, newValue) => setSelectedCity(newValue ? {
        cityName: `${newValue.LocalizedName}, ${newValue.Country.LocalizedName}`,
        key: newValue.Key,
      } : null)}
      renderInput={(params) =>
        <TextField value={text} {...params} label={t("cityname")} placeholder="enter your city" />}
      renderOption={(props, option, { index }) => (
        <li
          {...props}
          key={option.Key}
          style={{
            backgroundColor: index % 2 === 0 ? "#ffffff" : "#E1E9EE",
            padding: "6px 12px",
          }}
        >
          <LocationOnOutlinedIcon /> {option.LocalizedName}, {option.Country.LocalizedName}
        </li>
      )}
    />
  );
}

export default CitiesList;
