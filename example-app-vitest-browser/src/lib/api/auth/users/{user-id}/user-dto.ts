export interface IAddress {
  city: string;
  street: string;
  number: number;
  zipcode: string;
  geolocation: {
    lat: string;
    long: string;
  };
}

export type UserRole = "director" | "sales-operator" | "user";

export interface UserDto {
  id: number;
  email: string;
  username: string;
  name: {
    firstname: string;
    lastname: string;
  };
  phone: string;
  address: IAddress;
  cartId: number;
  password: string;
  role: UserRole;
}
