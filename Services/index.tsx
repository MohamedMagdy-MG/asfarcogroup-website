import axios from "axios";

/***************Images  Api****************/
export const UploudImages = async (files: any) => {
  const formData = new FormData();
  formData.append(`MediaGate`, "AsfarcoMdeiaGate");
  files.forEach((fs: any, i: any) => {
    formData.append(`images[${i}]`, fs);
  });
  const req = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}uploads/images`,
    formData
  );
  return req.data.data;
};
/***************Images Api****************/

/***************Register Flow  Api's****************/
export const SignUpApi = async (data: any, lang: any) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}auth/register`,
    data,
    {
      headers: {
        language: lang,
      },
    }
  );
  return res.data;
};

export const ForgetPasswordApi = async (data: any, lang: any) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}auth/forgetPassword`,
    { ...data, PASSWORD_LICENCE: "AsfarcoPasswordGate" },
    {
      headers: {
        language: lang,
      },
    }
  );
  return res.data;
};

export const SendActiviationCode = async (email: string, lang: any) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}auth/sendVerificationCode`,
    { email, PASSWORD_LICENCE: "AsfarcoPasswordGate" },
    {
      headers: {
        language: lang,
      },
    }
  );
  return res.data;
};

export const ActiveAccount = async (email: string, otp: string, lang: any) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}auth/activeAccount`,
    { email, otp, PASSWORD_LICENCE: "AsfarcoPasswordGate" },
    {
      headers: {
        language: lang,
      },
    }
  );
  return res.data;
};

export const ActivePasswordAccount = async (
  email: string,
  otp: string,
  lang: any
) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}auth/resetPassword`,
    { email, otp, PASSWORD_LICENCE: "AsfarcoPasswordGate" },
    {
      headers: {
        language: lang,
      },
    }
  );
  return res.data;
};

export const LoginApi = async (data: any, lang: any) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}auth/login`,
    data,
    {
      headers: {
        language: lang,
      },
    }
  );
  return res.data;
};

export const ResetPasswordApi = async (data: any, token: any, lang: any) => {
  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}profile/resetPassword`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        language: lang,
      },
    }
  );
  return res.data;
};
/***************Register Flow  Api's****************/

/***************Profile Flow  Api's****************/
export const ProfileApi = async (user: any, lang: any) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}profile`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
      language: lang,
    },
  });
  return res.data.data;
};

export const ProfileUpdateApi = async (data: any, token: any, lang: any) => {
  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}profile`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        language: lang,
      },
    }
  );
  return res.data;
};

export const ProfileUpdateImageApi = async (
  data: any,
  token: any,
  lang: any
) => {
  const formData = new FormData();
  formData.append(`MediaGate`, "AsfarcoMdeiaGate");
  formData.append(`image`, data);
  const image = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}uploads/image`,
    formData
  );
  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}profile`,
    { image: image.data.data.image },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        language: lang,
      },
    }
  );
  return res.data;
};

export const AddressApi = async (data: any, token: any, lang: any) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}profile/address`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        language: lang,
      },
    }
  );
  return res.data.data.Address;
};

export const AddressDeleteApi = async (data: any, token: any, lang: any) => {
  const res = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}profile/address`,
    {
      data,
      headers: {
        Authorization: `Bearer ${token}`,
        language: lang,
      },
    }
  );
  return res.data.data.Address;
};

export const PaymentApi = async (data: any, token: any, lang: any) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}profile/payment`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        language: lang,
      },
    }
  );
  return res.data.data.SavedPayments;
};

export const PaymentDeleteApi = async (data: any, token: any, lang: any) => {
  const res = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}profile/payment`,
    {
      data,
      headers: {
        Authorization: `Bearer ${token}`,
        language: lang,
      },
    }
  );
  return res.data.data.SavedPayments;
};

export const PasswordApi = async (data: any, token: any, lang: any) => {
  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}profile/password`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        language: lang,
      },
    }
  );
  return res.data;
};

/***************Profile Flow  Api's****************/

/***************sign up page****************/
export const GetNationalityData = async (lang: any) => {
  const req = await axios.get(`${process.env.API_URL}auth/nationalities`, {
    headers: {
      language: lang,
    },
  });
  return req.data.data?.map((val: any) => ({
    label: val.nationality,
    value: val.nationality,
  }));
};

export const GetCitiesData = async (user: any, lang: any) => {
  const req = await axios.get(`${process.env.API_URL}profile/cities`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
      language: lang,
    },
  });

  return req.data.data?.map((val: any) => ({
    label: val.name,
    value: val.name,
  }));
};
/***************sign up page****************/
