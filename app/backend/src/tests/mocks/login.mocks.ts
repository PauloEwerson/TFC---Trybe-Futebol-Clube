const userBody = {
  email: 'user@user.com',
  password: 'user123',
};

const userMock = {
  id: 2,
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
}

const responseUser = {
  id: 2,
  username: 'User',
  role: 'user',
  email: 'user@user.com',
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
  password: 'admin123',
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
};
