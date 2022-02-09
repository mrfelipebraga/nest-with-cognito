export interface AuthRegisterDto {
  username: string;
  email: string;
  password: string;
}

export interface AuthCredentialsDto {
  username: string;
  password: string;
}

export interface AuthCofirmationDto {
  username: string;
  token: string;
}
