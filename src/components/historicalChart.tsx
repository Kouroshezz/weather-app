import { Typography } from "@mui/material"
import { useState } from "react";
import { useTranslation } from "react-i18next";


function HistoricalChart() {

  const { t } = useTranslation();


  return (
    <>
      <Typography variant='h5' component='span' sx={{ fontWeight: 700 }}>
        {t('past24')}
      </Typography>

    </>
  )
}

export default HistoricalChart