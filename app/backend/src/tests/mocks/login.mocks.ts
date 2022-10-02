const userBody = {
  email: 'admin@admin.com',
  password: 'secret_admin',
};

const userMock = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
}

const responseUser = {
  id: 1,
  username: "Admin",
  role: "admin",
  email: "admin@admin.com"
}

const invalidEmail = {
  email: 'user.com',
  password: 'user123',
};

const errorMessage = 'Incorrect email or password';

const invalidPassword = {
  email: 'user@user.com',
  password: 'test'
};

const emptyEmail = {
  password: 'user123',
};

const emptyPassword = {
  email: 'user@user.com',
};

const fildMessageError = 'All fields must be filled';

export {
  userBody,
  userMock,
  responseUser,
  invalidEmail,
  errorMessage,
  invalidPassword,
  emptyEmail,
  fildMessageError,
  emptyPassword,
};
