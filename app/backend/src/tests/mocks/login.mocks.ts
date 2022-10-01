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
  email: 'admin.com',
  password: 'admin123',
};

const errorMessage = 'Incorrect email or password';

const invalidPassword = {
  email: 'admin@admin.com',
  password: 'test'
};

export {
  userBody,
  userMock,
  responseUser,
  invalidEmail,
  errorMessage,
  invalidPassword,
};
