import axios from "axios";

export class Url {
  public static readonly BASE_URL: string = "http://localhost:5000";
  public static readonly LOGIN: string =
    "http://localhost:5000/users/auth/login";
  public static readonly LOGOUT: string =
    "http://localhost:5000/users/auth/logout";
  public static readonly BOOKS: string = "http://localhost:5000/books";
  public static readonly CART: string = "http://localhost:5000/cart";
  public static readonly ME: string = "http://localhost:5000/users/me";
  public static readonly RESERVATIONS: string =
    "http://localhost:5000/reservations";
  public static readonly PENDING_RESERVATIONS: string = `${Url.RESERVATIONS}/pending`;

  public static async get(url: string) {
    try {
      const { data } = await axios.get(url, { withCredentials: true });
      return data;
    } catch (error) {
      return undefined;
    }
  }

  public static async post(url: string, payload: {}) {
    const { data } = await axios.post(url, payload, { withCredentials: true });
    return data;
  }

  public static async put(url: string) {
    try {
      console.log("calling put request to ", url);
      const { data } = await axios.put(url, {}, { withCredentials: true });
      console.log("put request response ", data);
      return data;
    } catch (error) {
      console.log("something threw ");
    }
  }

  public static async delete(url: string) {
    const { data } = await axios.delete(url, { withCredentials: true });
    return data;
  }
}
