import axios from "axios";

/***************Fleet page****************/

export const GetCarsBrandsData = async (lang: any) => {
  const req = await axios.get(`${process.env.API_URL}cars/filter/brands`, {
    headers: {
      language: lang,
    },
  });
  return req.data.data;
};
export const GetCarsYearData = async (lang: any) => {
  const req = await axios.get(`${process.env.API_URL}cars/filter/modelyears`, {
    headers: {
      language: lang,
    },
  });
  return req.data.data;
};
export const GetCarsCategoryData = async (lang: any) => {
  const req = await axios.get(`${process.env.API_URL}cars/filter/categories`, {
    headers: {
      language: lang,
    },
  });
  return req.data.data;
};
export const GetCarsColorData = async (lang: any) => {
  const req = await axios.get(`${process.env.API_URL}cars/filter/colors`, {
    headers: {
      language: lang,
    },
  });
  return req.data.data;
};
export const GetCarsFuelData = async (lang: any) => {
  const req = await axios.get(`${process.env.API_URL}cars/filter/fueltypes`, {
    headers: {
      language: lang,
    },
  });
  return req.data.data;
};
export const GetCarsFeatureData = async (lang: any) => {
  const req = await axios.get(`${process.env.API_URL}cars/filter/features`, {
    headers: {
      language: lang,
    },
  });
  return req.data.data;
};

export const GetFleetCarsData = async (
  filter: string,
  page: number,
  lang: any
) => {
  const req = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}cars?page=${page}&${filter}`,
    {
      headers: {
        language: lang,
      },
    }
  );
  return req.data.data;
};
/***************Fleet page****************/
