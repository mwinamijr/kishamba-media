import type { RootState } from "../app/store"; // adjust path

export const getAuthConfig = (
  getState: () => RootState,
  rejectWithValue: (value: string) => unknown
):
  | { headers: { [key: string]: string } }
  | ReturnType<typeof rejectWithValue> => {
  const {
    auth: { userInfo },
  } = getState();

  if (!userInfo) {
    return rejectWithValue("User is not authenticated");
  }

  return {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
};
