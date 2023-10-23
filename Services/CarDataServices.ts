import axios from "axios";

/***************Home page****************/
export const GetCategoriesData = async (lang: string) => {
  const req = await axios.get(`${process.env.API_URL}home/categories`, {
    headers: {
      language: lang,
    },
  });
  return req.data.data;
};

export const GetCarsData = async (category: string, lang: string) => {
  const req = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}home/cars?category=${category}`,
    {
      headers: {
        language: lang,
      },
    }
  );
  return req.data.data;
};
/***************Home page****************/

/***************Home page****************/

export const GetCarsAboutData = async (lang: any) => {
  const req = await axios.get(`${process.env.API_URL}aboutus/cars`, {
    headers: {
      language: lang,
    },
  });
  return req.data.data;
};
/***************Home page****************/

/***************Favourite page****************/

export const GetCarsFavouriteData = async (lang: any) => {
  const req = await axios.get(`${process.env.API_URL}savedcars/cars`, {
    headers: {
      language: lang,
    },
  });
  return req.data.data;
};
export const GetFavouriteData = async (token: any) => {
  const req = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}savedcars`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return req.data.data;
};
/***************Favourite page****************/

/***************DEatails page****************/
export const GetCarsDetailsData = async (id: string) => {
  const req = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}cars?id=${id}`
  );
  return req.data.data;
};
/***************DEatails page****************/

/***************DEatails page****************/
export const SaveToFavourite = async (id: string, token: any) => {
  const req = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}savedcars`,
    { id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return req.data;
};
/***************DEatails page****************/
